locals {
  monitoring_namespace = "monitoring"
  
  common_labels = {
    "app.kubernetes.io/managed-by" = "terraform"
    "app.kubernetes.io/part-of"    = "monitoring-stack"
    "environment"                  = var.environment
  }
}