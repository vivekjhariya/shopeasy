.PHONY: help init plan apply destroy fmt validate clean

ENVIRONMENT ?= dev
ENV_DIR = enviroments/$(ENVIRONMENT)

help:
	@echo "Terraform Management Commands:"
	@echo "  make init ENV=dev        - Initialize Terraform"
	@echo "  make plan ENV=dev        - Show execution plan"
	@echo "  make apply ENV=dev       - Apply changes"
	@echo "  make destroy ENV=dev     - Destroy infrastructure"
	@echo "  make fmt                 - Format code"
	@echo "  make validate            - Validate configuration"
	@echo "  make clean               - Clean temporary files"

init:
	cd $(ENV_DIR) && terraform init

plan:
	cd $(ENV_DIR) && terraform plan

apply:
	cd $(ENV_DIR) && terraform apply

destroy:
	cd $(ENV_DIR) && terraform destroy

fmt:
	terraform fmt -recursive

validate:
	cd $(ENV_DIR) && terraform validate

clean:
	find . -type d -name ".terraform" -exec rm -rf {} +
	find . -type f -name "*.tfstate*" -delete
	find . -type f -name "tfplan" -delete
