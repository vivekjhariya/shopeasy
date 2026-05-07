variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project_name" {
  type    = string
  default = "nextjs-infra"
}

variable "environment" {
  type    = string
  default = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of dev, staging, or prod."
  }
}

variable "owner" {
  type    = string
  default = "engineering"
}

variable "cost_center" {
  type    = string
  default = "engineering"
}

variable "additional_tags" {
  type    = map(string)
  default = {}
}

variable "enable_ec2" {
  type    = bool
  default = true
}

variable "enable_eks" {
  type    = bool
  default = true
}

variable "enable_rds" {
  type    = bool
  default = false
}

variable "enable_monitoring" {
  type    = bool
  default = false
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "enable_nat_gateway" {
  type    = bool
  default = true
}

variable "single_nat_gateway" {
  type    = bool
  default = true
}

variable "jenkins_instance_type" {
  type    = string
  default = "t3.medium"
}

variable "jenkins_root_volume_size" {
  type    = number
  default = 20
}

variable "jenkins_public_key_path" {
  type    = string
  default = "terra-key.pub"
}

variable "jenkins_allowed_cidr" {
  type    = string
  default = "0.0.0.0/0"
}

variable "cluster_version" {
  type    = string
  default = "1.35"
}

variable "node_instance_types" {
  type    = list(string)
  default = ["t3.large"]
}

variable "node_min_size" {
  type    = number
  default = 2
}

variable "node_max_size" {
  type    = number
  default = 5
}

variable "node_desired_size" {
  type    = number
  default = 2
}

variable "enable_spot_instances" {
  type    = bool
  default = true
}
