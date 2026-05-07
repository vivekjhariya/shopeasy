variable "name_prefix" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "jenkins_allowed_cidr" {
  type = string
}

variable "nodeport_allowed_cidr" {
  type    = string
  default = null
}

variable "environment" {
  type = string
}

variable "enable_jenkins_to_eks" {
  type    = bool
  default = true
}

variable "tags" {
  type = map(string)
}
