output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "private_subnets" {
  description = "Private subnet IDs"
  value       = module.vpc.private_subnets
}

output "public_subnets" {
  description = "Public subnet IDs"
  value       = module.vpc.public_subnets
}

output "jenkins_public_ip" {
  description = "Jenkins server public IP"
  value       = var.enable_ec2 ? module.ec2[0].public_ip : null
}

output "jenkins_ssh_command" {
  description = "SSH command to connect to Jenkins"
  value       = var.enable_ec2 ? "ssh -i terra-key ubuntu@${module.ec2[0].public_ip}" : null
}

output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = var.enable_eks ? module.eks[0].cluster_name : null
}

output "eks_cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = var.enable_eks ? module.eks[0].cluster_endpoint : null
  sensitive   = true
}

output "eks_kubeconfig_command" {
  description = "Command to configure kubectl"
  value       = var.enable_eks ? "aws eks update-kubeconfig --region ${var.aws_region} --name ${module.eks[0].cluster_name}" : null
}
