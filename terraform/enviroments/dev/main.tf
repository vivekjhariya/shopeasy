terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.41.0"
    }
    kubernetes = {

         source  = "hashicorp/kubernetes"
         version = "3.0.1"
      
    }
    helm = {
          source  = "hashicorp/helm"
          version = "3.1.1"
    }
  }

}

# Shared naming and tags
locals {
  name_prefix = "${var.project_name}-${var.environment}"

  common_tags = merge(
    {
      Project     = var.project_name
      Environment = var.environment
      Owner       = var.owner
      CostCenter  = var.cost_center
      ManagedBy   = "Terraform"
    },
    var.additional_tags
  )
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.common_tags
  }
}

# ============================================================================
# VPC Module
# ============================================================================
module "vpc" {
  source = "../../modules/vpc"

  name_prefix            = local.name_prefix
  vpc_cidr               = var.vpc_cidr
  enable_nat_gateway     = var.enable_nat_gateway
  single_nat_gateway     = var.single_nat_gateway
  environment            = var.environment
  project_name           = var.project_name

  tags = local.common_tags
}

# ============================================================================
# Security Module
# ============================================================================
module "security" {
  source = "../../modules/security"

  name_prefix          = local.name_prefix
  vpc_id               = module.vpc.vpc_id
  jenkins_allowed_cidr = var.jenkins_allowed_cidr
  environment          = var.environment

  tags = local.common_tags
}

# ============================================================================
# EC2 Module (Jenkins)
# ============================================================================
module "ec2" {
  count = var.enable_ec2 ? 1 : 0

  source = "../../modules/ec2"

  name_prefix              = local.name_prefix
  instance_type            = var.jenkins_instance_type
  root_volume_size         = var.jenkins_root_volume_size
  public_key_path          = var.jenkins_public_key_path
  security_group_id        = module.security.jenkins_sg_id
  subnet_id                = module.vpc.public_subnets[0]
  environment              = var.environment
  project_name             = var.project_name

  tags = local.common_tags
}

# ============================================================================
# EKS Module
# ============================================================================
module "eks" {
  count = var.enable_eks ? 1 : 0

  source = "../../modules/eks"

  name_prefix             = local.name_prefix
  cluster_version         = var.cluster_version
  vpc_id                  = module.vpc.vpc_id
  private_subnets         = module.vpc.private_subnets
  intra_subnets           = module.vpc.intra_subnets
  node_instance_types     = var.node_instance_types
  node_min_size           = var.node_min_size
  node_max_size           = var.node_max_size
  node_desired_size       = var.node_desired_size
  enable_spot_instances   = var.enable_spot_instances
  nodeport_allowed_cidrs  = []
  environment             = var.environment
  project_name            = var.project_name
  aws_region              = var.aws_region

  tags = local.common_tags
}

# ============================================================================
# Monitoring Module (Optional)
# ============================================================================
module "monitoring" {
  count = var.enable_monitoring && var.enable_eks ? 1 : 0

  source = "../../modules/monitoring"

  cluster_name   = module.eks[0].cluster_name
  cluster_endpoint = module.eks[0].cluster_endpoint
  cluster_ca_certificate = module.eks[0].cluster_certificate_authority_data
  aws_region     = var.aws_region
  name_prefix    = local.name_prefix
  environment    = var.environment

  tags = local.common_tags
}

# ============================================================================
# Data Source for EKS Auth
# ============================================================================
data "aws_eks_cluster_auth" "cluster" {
  count = var.enable_eks ? 1 : 0
  name  = module.eks[0].cluster_name
}
