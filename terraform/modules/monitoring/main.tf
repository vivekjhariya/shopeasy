# ============================================================================
# Monitoring Module - Prometheus, Grafana, Loki
# ============================================================================

# Prometheus Helm Release
resource "helm_release" "prometheus" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "prometheus"
  namespace  = "monitoring"
  version    = "25.8.0"

  create_namespace = true

  values = [
    templatefile("${path.module}/../../helm-values/prometheus.yaml", {})
  ]

  set {
    name  = "server.persistentVolume.storageClass"
    value = "gp3"
  }

  depends_on = [var.cluster_name]
}

# Grafana Helm Release
resource "helm_release" "grafana" {
  name       = "grafana"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "grafana"
  namespace  = "monitoring"
  version    = "7.0.8"

  values = [
    templatefile("${path.module}/../../helm-values/grafana.yaml", {
      ADMIN_PASSWORD = random_password.grafana_admin.result
    })
  ]

  depends_on = [helm_release.prometheus]
}

# Loki Helm Release
resource "helm_release" "loki" {
  name       = "loki"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "loki"
  namespace  = "monitoring"
  version    = "5.41.4"

  values = [
    templatefile("${path.module}/../../helm-values/loki.yaml", {})
  ]

  depends_on = [helm_release.grafana]
}

# Metrics Server
resource "helm_release" "metrics_server" {
  name       = "metrics-server"
  repository = "https://kubernetes-sigs.github.io/metrics-server/"
  chart      = "metrics-server"
  namespace  = "kube-system"
  version    = "3.11.0"

  values = [
    file("${path.module}/../../helm-values/metrics-server.yaml")
  ]

  depends_on = [var.cluster_name]
}

# Random password for Grafana
resource "random_password" "grafana_admin" {
  length  = 16
  special = true
}

# Store Grafana password in AWS Secrets Manager
resource "aws_secretsmanager_secret" "grafana_admin" {
  name                    = "${var.name_prefix}-grafana-admin-password"
  recovery_window_in_days = 7

  tags = var.tags
}

resource "aws_secretsmanager_secret_version" "grafana_admin" {
  secret_id     = aws_secretsmanager_secret.grafana_admin.id
  secret_string = random_password.grafana_admin.result
}