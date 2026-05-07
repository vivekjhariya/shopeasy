#!/bin/bash

# ShopEasy Local Setup Script
# This script sets up and runs the project locally

set -e

echo "🚀 ShopEasy Local Setup Starting..."
echo "=================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm version: $(npm -v)${NC}"

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✅ MongoDB is running${NC}"
    else
        echo -e "${YELLOW}⚠️  MongoDB is installed but not running${NC}"
        echo "Starting MongoDB..."
        mongod --fork --logpath /tmp/mongodb.log --dbpath ~/data/db 2>/dev/null || echo -e "${YELLOW}⚠️  Could not start MongoDB. You may need to start it manually.${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  MongoDB not found. Using Docker MongoDB or remote connection.${NC}"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
if [ -f "package-lock.json" ]; then
    npm ci
else
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  .env file not found. Creating from template...${NC}"
    cat > .env << 'EOF'
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/shopeasy

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXTAUTH_SECRET=HmaFjYZ2jbUK7Ef+wZrBiJei4ZNGBAJ5IdiOGAyQegw=

# JWT Configuration
JWT_SECRET=e5e425764a34a2117ec2028bd53d6f1388e7b90aeae9fa7735f2469ea3a6cc8c
EOF
    echo -e "${GREEN}✅ .env file created${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

# Build the project
echo ""
echo "🔨 Building the project..."
npm run build

# Success message
echo ""
echo -e "${GREEN}=================================="
echo "✅ Setup Complete!"
echo "==================================${NC}"
echo ""
echo "To start the development server:"
echo -e "${YELLOW}npm run dev${NC}"
echo ""
echo "To start the production server:"
echo -e "${YELLOW}npm start${NC}"
echo ""
echo "The application will be available at:"
echo -e "${GREEN}http://localhost:3000${NC}"
echo ""

# Ask if user wants to start the server
read -p "Do you want to start the development server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Starting development server..."
    npm run dev
fi
