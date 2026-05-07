# Security Best Practices

## Network Security

### VPC Configuration
- Private subnets for application workloads
- Public subnets only for load balancers
- Network ACLs for subnet-level filtering
- VPC Flow Logs enabled

### Security Groups
- Principle of least privilege
- No 0.0.0.0/0 in production
- Specific port ranges only
- Regular audit and review

## Access Control

### IAM Best Practices
- Use IAM roles, not access keys
- Enable MFA for all users
- Implement IRSA for pod permissions
- Regular credential rotation

### SSH Access
- Use SSH keys, not passwords
- Restrict by IP address
- Use bastion host for private resources
- Rotate keys every 90 days

## Data Protection

### Encryption
- EKS secrets encrypted with KMS
- EBS volumes encrypted
- S3 state bucket encrypted
- TLS for all communications

### Secrets Management
- Never commit secrets to Git
- Use AWS Secrets Manager
- Environment-specific secrets
- Automated rotation

## Compliance

### Monitoring
- CloudWatch logs enabled
- AWS Config for compliance
- GuardDuty for threat detection
- Regular security audits

### Backup & Recovery
- Automated EBS snapshots
- S3 versioning for state
- Disaster recovery plan
- Regular restore testing

## Checklist

- [ ] MFA enabled for AWS accounts
- [ ] Security groups reviewed
- [ ] Secrets rotated
- [ ] Logs monitored
- [ ] Backups tested
- [ ] Compliance verified
