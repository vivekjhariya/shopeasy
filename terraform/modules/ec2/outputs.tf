output "instance_id" {
  value = aws_instance.jenkins.id
}

output "instance_public_ip" {
  value = aws_eip.jenkins.public_ip
}

output "instance_private_ip" {
  value = aws_instance.jenkins.private_ip
}

output "jenkins_url" {
  value = "http://${aws_eip.jenkins.public_ip}:8080"
}

output "ssh_command" {
  value = "ssh -i terra-key ubuntu@${aws_eip.jenkins.public_ip}"
}

output "iam_role_arn" {
  value = aws_iam_role.ec2_role.arn
}