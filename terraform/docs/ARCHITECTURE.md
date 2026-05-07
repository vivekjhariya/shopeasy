# Infrastructure Architecture

## Overview

ShopEasy infrastructure follows a three-tier architecture deployed on AWS:

```
┌─────────────────────────────────────────────────────────┐
│                      AWS Cloud                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │                VPC (10.0.0.0/16)                  │  │
│  │  ┌─────────────────┐  ┌─────────────────┐        │  │
│  │  │ Public Subnets  │  │ Private Subnets │        │  │
│  │  │                 │  │                 │        │  │
│  │  │  - Jenkins EC2  │  │  - EKS Nodes    │        │  │
│  │  │  - NAT Gateway  │  │  - Application  │        │  │
│  │  │  - Bastion      │  │  - MongoDB      │        │  │
│  │  └─────────────────┘  └─────────────────┘        │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Components

### 1. VPC Module
- CIDR: 10.0.0.0/16
- 3 Public subnets (Internet-facing)
- 3 Private subnets (Application tier)
- 3 Intra subnets (Database tier)
- NAT Gateway for outbound traffic

### 2. EKS Cluster
- Managed Kubernetes service
- Auto-scaling node groups
- Spot instances for cost optimization
- IRSA for pod-level IAM permissions

### 3. EC2 (Jenkins)
- CI/CD automation server
- Docker pre-installed
- Kubernetes tools configured

### 4. Security
- Security groups with least privilege
- KMS encryption for EKS secrets
- IAM roles with minimal permissions

## Data Flow

1. User → ALB → EKS Ingress → Application Pods
2. Application → MongoDB (in-cluster)
3. Jenkins → GitHub → Docker Hub → EKS
