output "prometheus_endpoint" {
  description = "Prometheus server endpoint"
  value       = "http://prometheus-server.monitoring.svc.cluster.local"
}

output "grafana_endpoint" {
  description = "Grafana endpoint"
  value       = "Access via: kubectl port-forward -n monitoring svc/grafana 3000:80"
}

output "grafana_admin_password_secret" {
  description = "AWS Secrets Manager secret name for Grafana admin password"
  value       = aws_secretsmanager_secret.grafana_admin.name
}

output "loki_endpoint" {
  description = "Loki endpoint"
  value       = "http://loki.monitoring.svc.cluster.local:3100"
}

output "metrics_server_status" {
  description = "Metrics server deployment status"
  value       = "Deployed in kube-system namespace"
}