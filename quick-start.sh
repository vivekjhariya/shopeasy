#!/usr/bin/env bash
set -e

echo "🚀 Quick Start - ShopEasy"
echo "========================="

# Install dependencies
if [ -f package-lock.json ]; then
  npm ci --prefer-offline
else
  npm install
fi

# Create .env if not exists
if [ ! -f .env ]; then
cat > .env << 'EOF'
MONGODB_URI=mongodb://localhost:27017/shopeasy
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXTAUTH_SECRET=HmaFjYZ2jbUK7Ef+wZrBiJei4ZNGBAJ5IdiOGAyQegw=
JWT_SECRET=e5e425764a34a2117ec2028bd53d6f1388e7b90aeae9fa7735f2469ea3a6cc8c
EOF
fi

# Start dev server
npm run dev
