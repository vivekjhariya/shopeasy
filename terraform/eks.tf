module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"  # upgraded from 19.15.1 to latest stable

  cluster_name                   = local.name
  cluster_version                = "1.31"
  cluster_endpoint_public_access = true

  cluster_addons = {
    coredns    = { most_recent = true }
    kube-proxy = { most_recent = true }
    vpc-cni    = { most_recent = true }
  }

  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.private_subnets   # nodes in private subnets (best practice)
  control_plane_subnet_ids = module.vpc.intra_subnets

  eks_managed_node_group_defaults = {
    instance_types = [var.eks_node_instance_type]
    attach_cluster_primary_security_group = true
  }

  eks_managed_node_groups = {
    "ng" = {
      min_size     = var.eks_node_min_size
      max_size     = var.eks_node_max_size
      desired_size = var.eks_node_desired_size

      instance_types = [var.eks_node_instance_type]  # t3.large (not t2.large)
      capacity_type  = var.enable_spot_instances ? "SPOT" : "ON_DEMAND"

      disk_size                  = 35
      use_custom_launch_template = false

      tags = merge(local.tags, { Name = "${local.name}-ng" })
    }
  }

  tags = local.tags
}

data "aws_instances" "eks_nodes" {
  instance_tags = {
    "eks:cluster-name" = module.eks.cluster_name
  }

  filter {
    name   = "instance-state-name"
    values = ["running"]
  }

  depends_on = [module.eks]
}
