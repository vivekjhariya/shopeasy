# 🛍️ ShopEasy - Modern E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-ready-blue?style=flat-square&logo=docker)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-EKS-326CE5?style=flat-square&logo=kubernetes)](https://kubernetes.io/)
[![Terraform](https://img.shields.io/badge/Terraform-AWS-7B42BC?style=flat-square&logo=terraform)](https://www.terraform.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

ShopEasy is a modern, full-stack e-commerce platform built with **Next.js 15**, **TypeScript**, and **MongoDB**. It features a beautiful UI with Tailwind CSS, JWT authentication, real-time cart, dark mode, and a complete CI/CD pipeline with Jenkins, Docker, and ArgoCD on AWS EKS.

---

## ✨ Features

- 🎨 Modern responsive UI with dark/light mode
- 🔐 JWT-based secure authentication
- 🛒 Real-time cart management with Redux
- 🔍 Product search, filtering, and sorting
- 📦 10+ product categories (gadgets, fashion, grocery, etc.)
- 👤 User profiles, order history, wishlists
- 💳 Checkout with order tracking
- 🐳 Docker + Docker Compose support
- ☸️ Kubernetes manifests for EKS deployment
- 🔄 CI/CD with Jenkins + ArgoCD
- 🏗️ Terraform IaC for AWS infrastructure

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              Presentation Tier               │
│   Next.js 15 · Tailwind CSS · Redux         │
├─────────────────────────────────────────────┤
│              Application Tier                │
│   Next.js API Routes · JWT Auth · Mongoose  │
├─────────────────────────────────────────────┤
│                 Data Tier                    │
│         MongoDB · Mongoose ODM              │
└─────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 20+
- MongoDB running locally

```bash
git clone https://github.com/vivekjhariya/shopeasy.git
cd shopeasy

# Install dependencies
npm install

# Seed database
MONGODB_URI=mongodb://localhost:27017/shopeasy npx tsx scripts/migrate-data.ts

# Start dev server
npm run dev
```

App runs at `http://localhost:3000`

---

## 🐳 Docker Compose (Recommended)

```bash
# Copy and configure env
cp .env.example .env   # fill in NEXTAUTH_SECRET, JWT_SECRET

# Start all services (MongoDB + Migration + App)
docker compose up --build
```

Services:
| Service | Port | Description |
|---|---|---|
| `shopeasy` | 3000 | Next.js app |
| `shopeasy-mongodb` | 27017 | MongoDB |
| `shopeasy-migration` | — | One-time data seeder |

---

## ☁️ AWS Infrastructure (Terraform)

### Prerequisites
- AWS CLI configured (`aws configure`)
- Terraform installed

```bash
cd terraform

# Generate SSH key for Jenkins EC2
ssh-keygen -f terra-key

# Copy and fill in your values
cp terraform.tfvars.example terraform.tfvars
# Set: aws_region, jenkins_allowed_cidr (your IP), etc.

terraform init
terraform plan
terraform apply
```

**What gets created:**
- VPC with public/private/intra subnets
- EC2 (Jenkins) in public subnet
- EKS cluster with managed node group (t3.large, SPOT)
- NAT Gateway, Security Groups

```bash
# After apply — connect to Jenkins
ssh -i terra-key ubuntu@<jenkins_public_ip>

# Update kubeconfig
aws eks update-kubeconfig --region <region> --name shopeasy-eks-cluster
```

---

## 🔧 Jenkins CI/CD Setup

### 1. Access Jenkins
```
http://<jenkins_public_ip>:8080
```
Get initial password:
```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

### 2. Install Plugins
Go to **Manage Jenkins → Plugins → Available**:
- Docker Pipeline
- Pipeline View

### 3. Add Credentials
**Manage Jenkins → Credentials → Global → Add Credentials**

| ID | Type | Purpose |
|---|---|---|
| `github-credentials` | Username/Password | GitHub access |
| `docker-hub-credentials` | Username/Password | DockerHub push |

### 4. Shared Library
**Manage Jenkins → Configure System → Global Pipeline Libraries**
- Name: `shared`
- Default Version: `main`
- Repo: `https://github.com/<your-username>/shopeasy-jenkins-shared-lib`

### 5. Create Pipeline Job
- Name: `shopeasy-pipeline`
- Type: Pipeline
- SCM: Git → your fork URL
- Branch: `master`
- Script Path: `Jenkinsfile`
- Enable: `GitHub hook trigger for GITScm polling`

### 6. GitHub Webhook
In your GitHub repo → **Settings → Webhooks → Add webhook**
- Payload URL: `http://<jenkins_ip>:8080/github-webhook/`
- Content type: `application/json`
- Events: `Push`

---

## ☸️ Kubernetes Deployment (ArgoCD)

### Install ArgoCD
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Expose ArgoCD UI
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'

# Get admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d
```

### Install Nginx Ingress + Cert-Manager
```bash
# Nginx Ingress
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install nginx-ingress ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace \
  --set controller.service.type=LoadBalancer

# Cert-Manager
helm repo add jetstack https://charts.jetstack.io
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager --create-namespace \
  --version v1.14.0 --set installCRDs=true
```

### Deploy App
```bash
kubectl apply -f kubernetes/
```

### ArgoCD App Setup
In ArgoCD UI → **New App**:
- Repo URL: your fork
- Path: `kubernetes`
- Namespace: `shopeasy`
- Sync Policy: `Automatic`

---

## 📁 Project Structure

```
shopeasy/
├── src/
│   ├── app/              # Next.js App Router pages & API routes
│   ├── components/       # React components
│   └── lib/              # DB, models, auth utilities
├── kubernetes/           # K8s manifests
├── terraform/            # AWS infrastructure (IaC)
├── scripts/              # DB migration script
├── .db/                  # Seed data (db.json)
├── Dockerfile            # Production (distroless)
├── Dockerfile.dev        # Development (alpine)
└── docker-compose.yml    # Local multi-service setup
```

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | NextAuth secret (generate: `openssl rand -base64 32`) |
| `JWT_SECRET` | JWT signing secret |
| `NEXT_PUBLIC_API_URL` | API base URL |
| `NEXTAUTH_URL` | App base URL |
| `NEXT_PUBLIC_IMAGE_BASE_URL` | CDN/S3 base URL for images |

---

## 📜 License

MIT License — free to use for educational and personal projects.

---

Made with ❤️ by [Vivek Jhariya](https://linkedin.com/in/vivekjhariya)
