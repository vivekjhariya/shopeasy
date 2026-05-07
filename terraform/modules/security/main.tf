# ============================================================================
# Security Group for Jenkins
# ============================================================================
resource "aws_security_group" "jenkins" {
  name        = "${var.name_prefix}-jenkins-sg"
  description = "Security group for Jenkins"
  vpc_id      = var.vpc_id

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-jenkins-sg"
  })
}

# SSH
resource "aws_vpc_security_group_ingress_rule" "jenkins_ssh" {
  security_group_id = aws_security_group.jenkins.id

  description = "SSH access"
  from_port   = 22
  to_port     = 22
  ip_protocol = "tcp"
  cidr_ipv4   = var.jenkins_allowed_cidr

  tags = {
    Name = "jenkins-ssh"
  }
}

# Jenkins UI (8080)
resource "aws_vpc_security_group_ingress_rule" "jenkins_ui" {
  security_group_id = aws_security_group.jenkins.id

  description = "Jenkins UI"
  from_port   = 8080
  to_port     = 8080
  ip_protocol = "tcp"
  cidr_ipv4   = var.jenkins_allowed_cidr

  tags = {
    Name = "jenkins-ui"
  }
}

# HTTP
resource "aws_vpc_security_group_ingress_rule" "jenkins_http" {
  security_group_id = aws_security_group.jenkins.id

  description = "HTTP"
  from_port   = 80
  to_port     = 80
  ip_protocol = "tcp"
  cidr_ipv4   = "0.0.0.0/0"

  tags = {
    Name = "jenkins-http"
  }
}

# HTTPS
resource "aws_vpc_security_group_ingress_rule" "jenkins_https" {
  security_group_id = aws_security_group.jenkins.id

  description = "HTTPS"
  from_port   = 443
  to_port     = 443
  ip_protocol = "tcp"
  cidr_ipv4   = "0.0.0.0/0"

  tags = {
    Name = "jenkins-https"
  }
}

# Egress (all traffic)
resource "aws_vpc_security_group_egress_rule" "jenkins_egress" {
  security_group_id = aws_security_group.jenkins.id

  description = "Allow all outbound traffic"
  ip_protocol = "-1"
  cidr_ipv4   = "0.0.0.0/0"

  tags = {
    Name = "jenkins-egress"
  }
}

# ============================================================================
# Security Group for EKS Nodes
# ============================================================================
resource "aws_security_group" "eks_nodes" {
  name        = "${var.name_prefix}-eks-nodes-sg"
  description = "Security group for EKS nodes"
  vpc_id      = var.vpc_id

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-eks-nodes-sg"
  })
}

# Allow Jenkins to communicate with EKS
resource "aws_vpc_security_group_ingress_rule" "eks_from_jenkins" {
  count = var.enable_jenkins_to_eks ? 1 : 0

  security_group_id = aws_security_group.eks_nodes.id

  description              = "Allow Jenkins to communicate with EKS"
  from_port                = 443
  to_port                  = 443
  ip_protocol              = "tcp"
  referenced_security_group_id = aws_security_group.jenkins.id

  tags = {
    Name = "from-jenkins"
  }
}

resource "aws_vpc_security_group_ingress_rule" "eks_nodeport_range" {
  security_group_id = aws_security_group.eks_nodes.id

  description = "Allow NodePort range for EKS"
  from_port   = 30000
  to_port     = 32767
  ip_protocol = "tcp"
  cidr_ipv4   = coalesce(var.nodeport_allowed_cidr, var.jenkins_allowed_cidr)

  tags = {
    Name = "eks-nodeport-range"
  }
}

# Egress (all traffic)
resource "aws_vpc_security_group_egress_rule" "eks_egress" {
  security_group_id = aws_security_group.eks_nodes.id

  description = "Allow all outbound traffic"
  ip_protocol = "-1"
  cidr_ipv4   = "0.0.0.0/0"

  tags = {
    Name = "eks-egress"
  }
}
