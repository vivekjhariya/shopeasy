# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-05-05

### Added
- Initial Terraform infrastructure setup
- VPC module with public/private/intra subnets
- EKS cluster with managed node groups
- EC2 module for Jenkins CI/CD server
- Security groups and IAM roles
- Multi-environment support (dev/staging/prod)
- S3 backend with DynamoDB state locking
- Comprehensive documentation
- Pre-commit hooks configuration
- Makefile for common operations

### Security
- KMS encryption for EKS secrets
- Security groups with least privilege
- IAM roles with minimal permissions
- S3 bucket encryption and versioning

### Documentation
- Architecture documentation
- Security best practices
- Deployment guide
- Troubleshooting guide
