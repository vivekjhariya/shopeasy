output "jenkins_sg_id" {
  value = aws_security_group.jenkins.id
}

output "eks_nodes_sg_id" {
  value = aws_security_group.eks_nodes.id
}