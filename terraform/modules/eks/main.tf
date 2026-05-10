module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.15"

  cluster_name    = "${var.name_prefix}-eks"
  cluster_version = var.cluster_version

  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true

  # Encryption
  cluster_encryption_config = {
    provider_key_arn = aws_kms_key.eks.arn
    resources        = ["secrets"]
  }

  vpc_id     = var.vpc_id
  subnet_ids = concat(var.private_subnets, var.intra_subnets)

  # Cluster addons
  cluster_addons = {
    coredns = {
      most_recent       = true
      resolve_conflicts = "OVERWRITE"
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent       = true
      resolve_conflicts = "OVERWRITE"
    }
  }

  node_security_group_additional_rules = length(var.nodeport_allowed_cidrs) > 0 ? {
    nodeport_ingress = {
      description = "Allow NodePort range"
      protocol    = "tcp"
      from_port   = 30000
      to_port     = 32767
      type        = "ingress"
      cidr_blocks = var.nodeport_allowed_cidrs
    }
  } : {}

  eks_managed_node_group_defaults = {
    disk_size       = 20
    instance_types  = var.node_instance_types
    ebs_optimized   = true
    iam_role_additional_policies = [
      "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
      "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
    ]
  }

  eks_managed_node_groups = {
    general = {
      name           = "${var.name_prefix}-ng"
      instance_types = var.node_instance_types
      capacity_type  = "SPOT"
      min_size       = var.node_min_size
      max_size       = var.node_max_size
      desired_size   = var.node_desired_size

      labels = {
        Environment = var.environment
        NodeGroup   = "general"
      }
    }

    spot = var.enable_spot_instances ? {
      name           = "${var.name_prefix}-ng"
      instance_types = ["t3.medium", "t3.small", "t3.micro"]
      capacity_type  = "SPOT"
      min_size       = 1
      max_size       = 3
      desired_size   = 2

      labels = {
        Environment  = var.environment
        NodeGroup    = "spot"
        CapacityType = "spot"
      }

      taints = [
        {
          key    = "workload-type"
          value  = "batch"
          effect = "NoSchedule"
        }
      ]
    } : null
  }

  tags = var.tags
}

data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_name
}

# ============================================================================
# KMS Keys
# ============================================================================
resource "aws_kms_key" "eks" {
  description             = "KMS key for EKS"
  deletion_window_in_days = 10
  enable_key_rotation     = true

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-eks-key"
  })
}

resource "aws_kms_alias" "eks" {
  name          = "alias/${var.name_prefix}-eks"
  target_key_id = aws_kms_key.eks.key_id
}

# ============================================================================
# OIDC Provider for IRSA
# ============================================================================
data "tls_certificate" "cluster" {
  url = module.eks.cluster_oidc_issuer_url
}

resource "aws_iam_openid_connect_provider" "cluster" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.cluster.certificates[0].sha1_fingerprint]
  url             = module.eks.cluster_oidc_issuer_url

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-oidc"
  })
}
