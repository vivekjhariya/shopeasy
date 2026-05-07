# Troubleshooting Guide

## Common Issues

### 1. Terraform Init Fails

**Error**: `Backend initialization failed`

**Solution**:
```bash
# Verify S3 bucket exists
aws s3 ls s3://nextjs-infra-terraform-state

# Verify DynamoDB table
aws dynamodb describe-table --table-name terraform-state-lock

# Check AWS credentials
aws sts get-caller-identity
```

### 2. VPC Creation Fails

**Error**: `Error creating VPC: VpcLimitExceeded`

**Solution**:
- Delete unused VPCs
- Request limit increase from AWS Support
- Use existing VPC

### 3. EKS Cluster Not Accessible

**Error**: `Unable to connect to the server`

**Solution**:
```bash
# Update kubeconfig
aws eks update-kubeconfig --region us-east-1 --name <cluster-name>

# Verify AWS credentials
aws sts get-caller-identity

# Check cluster status
aws eks describe-cluster --name <cluster-name>
```

### 4. Jenkins Not Accessible

**Error**: `Connection timeout`

**Solution**:
```bash
# Check security group
aws ec2 describe-security-groups --group-ids <sg-id>

# Verify instance running
aws ec2 describe-instances --instance-ids <instance-id>

# Check Jenkins service
ssh -i terra-key ubuntu@<ip>
sudo systemctl status jenkins
```

### 5. State Lock Issues

**Error**: `Error acquiring the state lock`

**Solution**:
```bash
# Force unlock (use carefully)
terraform force-unlock <lock-id>

# Or delete lock from DynamoDB
aws dynamodb delete-item \
  --table-name terraform-state-lock \
  --key '{"LockID": {"S": "<lock-id>"}}'
```

### 6. Insufficient Permissions

**Error**: `AccessDenied`

**Solution**:
- Verify IAM permissions
- Check AWS credentials
- Review CloudTrail logs

### 7. Resource Already Exists

**Error**: `AlreadyExists`

**Solution**:
```bash
# Import existing resource
terraform import <resource_type>.<name> <resource_id>

# Or delete and recreate
```

## Debug Commands

```bash
# Enable debug logging
export TF_LOG=DEBUG
terraform apply

# Validate configuration
terraform validate

# Check formatting
terraform fmt -check

# Show current state
terraform show

# List resources
terraform state list
```

## Getting Help

- Check AWS Service Health Dashboard
- Review CloudWatch logs
- Check Terraform documentation
- AWS Support (if applicable)
