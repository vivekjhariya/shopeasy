# ============================================================================
# General Variables
# ============================================================================
variable "aws_region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "The name of the project for tagging resources"
  type        = string
  default     = "my-nextjs-infra"
}

variable "environment" {
    description = "The environment to deploy resources in (e.g., dev, staging, prod)"
    type        = string
    default     = "dev"

    validation {
        condition     = contains(["dev", "staging", "prod"], var.environment)
        error_message = "Environment must be one of 'dev', 'staging', or 'prod'."
    }
  
}

variable "owner" {
    description = "The owner of the resources"
    type        = string
    default     = "VJstylose"
}

variable "cost_center" {
    description = "The cost center for billing purposes"
    type        = string
    default     = "engineering"
}

# ============================================================================
# Infrastructure Selection
# ============================================================================

variable "enable_ec2" {
    description = "Whether to enable EC2 resources (Jenkins, CI/CD runners)"
    type        = bool
    default     = false
}

variable "enable_eks" {
    description = "Whether to enable EKS resources (Kubernetes cluster)"
    type        = bool
    default     = true
}

variable "enable_rds" {
    description = "Whether to enable RDS resources "
    type        = bool
    default     = false
}

variable "enable_monitoring" {
    description = "Whether to enable monitoring resources (CloudWatch, Prometheus, Grafana)"
    type        = bool
    default     = true
}


# ============================================================================
# VPC Variables
# ============================================================================

variable "vpc_cidr" {
    description = "CIDR block for the VPC"
    type        = string
    default     = "10.0.0.0/16"
}

variable "enable_nat_gateway" {
    description = "Whether to enable NAT Gateway for private subnets"
    type        = bool
    default     = true
}

variable "single_nat_gateway" {
    description = "Whether to use a single NAT Gateway for all private subnets (if false, a NAT Gateway will be created in each public subnet)"
    type        = bool
    default     = false
}


# ============================================================================
# EC2 Variables
# ============================================================================

variable "jenkins_instance_type" {
    description = "EC2 instance type for Jenkins server"
    type        = string
    default     = "t3.medium"
}

variable "jenkins_root_volume_size" {
    description = "Root volume size for Jenkins EC2 instance (in GB)"
    type        = number
    default     = 20
}

variable "jenkins_public_key_path" {
    description = "Path to the public key for SSH access to Jenkins EC2 instance"
    type        = string
    default     = "terra-key.pub"
}

variable "jenkins_allowed_cidr" {
    description = "CIDR block allowed to access Jenkins server (e.g., your IP address with /32)"
    type        = string
    default     = "0.0.0.0/0"
}

# ============================================================================
# EKS Variables
# ============================================================================

variable "eks_cluster_version" {
    description = "Kubernetes version for the EKS cluster"
    type        = string
    default     = "1.28"
}

variable "eks_node_instance_type" {
    description = "EC2 instance type for EKS worker nodes"
    type        = list(string)
    default     = ["t3.medium"]
}

variable "eks_desired_capacity" {
    description = "Desired number of worker nodes in the EKS cluster"
    type        = number
    default     = 2
}
variable "eks_max_size" {
    description = "Maximum number of worker nodes in the EKS cluster"
    type        = number
    default     = 4
}
variable "eks_min_size" {
    description = "Minimum number of worker nodes in the EKS cluster"
    type        = number
    default     = 2
}

variable "eks_node_volume_size" {
    description = "Volume size for EKS worker nodes (in GB)"
    type        = number
    default     = 20
}

variable "enable_spot_instances" {
    description = "Whether to enable spot instances for EKS worker nodes"
    type        = bool
    default     = true
}


# ============================================================================
# RDS Variables
# ============================================================================

variable "db_engine" {
    description = "Database engine for RDS instance (e.g., mysql, postgres)"
    type        = string
    default     = "postgres"
}

variable "db_instance_class" {
    description = "Instance class for RDS instance"
    type        = string
    default     = "db.t3.micro"
}

variable "db_name" {
    description = "Name of the database to create in RDS instance"
    type        = string
    default     = "mydatabase"
}

variable "db_username" {
    description = "Username for RDS database"
    type        = string
    default     = "admin"
    sensitive   = true
}

# ============================================================================
# Tags
# ============================================================================

variable "additional_tags" {
    description = "Common tags to apply to all resources"
    type        = map(string)
    default     = {}
}
