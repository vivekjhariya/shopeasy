variable "name_prefix" {
  type = string
}

variable "vpc_cidr" {
  type = string
}

variable "enable_nat_gateway" {
  type = bool
}

variable "single_nat_gateway" {
  type = bool
}

variable "environment" {
  type = string
}

variable "project_name" {
  type = string
}

variable "tags" {
  type = map(string)
}