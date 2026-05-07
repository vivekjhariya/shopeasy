locals {

name_prefix = "${var.project_name}-${var.environment}"

common_tags = merge(
    {
        Project     = var.project_name
        Environment = var.environment
        Owner       = var.owner
        CostCenter  = var.cost_center
        ManagedBy   = "Terraform"
    },
    var.additional_tags
)


}
