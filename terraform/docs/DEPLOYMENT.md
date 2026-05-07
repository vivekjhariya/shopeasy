# Deployment Guide

## Prerequisites Setup

### 1. Install Required Tools
```bash
# Terraform
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install terraform

# AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 2. Configure AWS
```bash
aws configure
# Enter: Access Key, Secret Key, Region, Output format
```

### 3. Generate SSH Key
```bash
ssh-keygen -f terra-key
chmod 400 terra-key
```

## Deployment Steps

### Step 1: Backend Setup
```bash
# Create S3 bucket for state
aws s3 mb s3://nextjs-infra-terraform-state --region us-east-1

# Create DynamoDB table for locking
aws dynamodb create-table \
  --table-name terraform-state-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

### Step 2: Configure Variables
```bash
cd enviroments/dev
cp ../../terraform.tfvars.example terraform.tfvars
vim terraform.tfvars  # Update with your values
```

### Step 3: Initialize Terraform
```bash
terraform init
```

### Step 4: Plan & Review
```bash
terraform plan -out=tfplan
# Review the plan carefully
```

### Step 5: Apply Configuration
```bash
terraform apply tfplan
```

### Step 6: Configure kubectl
```bash
aws eks update-kubeconfig --region us-east-1 --name nextjs-infra-dev-eks
kubectl get nodes
```

## Post-Deployment

### Access Jenkins
```bash
# Get Jenkins IP
terraform output jenkins_public_ip

# SSH to Jenkins
ssh -i ../../terra-key ubuntu@<jenkins-ip>

# Get initial password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

### Verify EKS
```bash
kubectl get nodes
kubectl get pods -A
```

## Cleanup

```bash
terraform destroy
```
