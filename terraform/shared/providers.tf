provider "aws" {
    region = var.aws_region

    default_tags {
        tags = {
            Project     = var.project_name
            Environment = var.environment
            Owner       = var.owner
            CostCenter  = var.cost_center
            ManagedBy   = "Terraform"
        }
    }

}

provider "kubernetes" {
    host  = try(module.eks.cluster_endpoint, "")
    cluster_ca_certificate = try(base64decode(module.eks.cluster_certificate_authority_data), "")
    token = try(data.aws_eks_cluster_auth.cluster.auth, "")
}

provider "helm" {
    kubernetes =  {
        host  = try(module.eks.cluster_endpoint, "")
        cluster_ca_certificate = try(base64decode(module.eks.cluster_certificate_authority_data), "")
        token = try(data.aws_eks_cluster_auth.cluster.auth, "")
    }
}
