variable "aws_region" {
  description = "AWS region where resources will be provisioned"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used as prefix for all resources"
  type        = string
  default     = "shopeasy"
}

variable "environment" {
  description = "Deployment environment (dev/staging/prod)"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance (leave empty to use latest Ubuntu 24.04)"
  type        = string
  default     = ""
}

variable "instance_type" {
  description = "Instance type for Jenkins EC2"
  type        = string
  default     = "t3.medium"
}

variable "jenkins_allowed_cidr" {
  description = "CIDR allowed to access Jenkins (SSH port 22 and UI port 8080). Use YOUR_IP/32"
  type        = string
  default     = "0.0.0.0/0" # Override this with your IP in terraform.tfvars
}

variable "public_key_path" {
  description = "Path to the SSH public key file"
  type        = string
  default     = "terra-key.pub"
}

variable "eks_node_instance_type" {
  description = "Instance type for EKS managed node group"
  type        = string
  default     = "t3.large"
}

variable "eks_node_min_size" {
  description = "Minimum number of EKS nodes"
  type        = number
  default     = 2
}

variable "eks_node_max_size" {
  description = "Maximum number of EKS nodes"
  type        = number
  default     = 3
}

variable "eks_node_desired_size" {
  description = "Desired number of EKS nodes"
  type        = number
  default     = 2
}

variable "enable_spot_instances" {
  description = "Use SPOT instances for EKS nodes (cost saving)"
  type        = bool
  default     = true
}
