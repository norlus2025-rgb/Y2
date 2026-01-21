#!/bin/bash

# EarnHub Quick Setup Script

echo "🚀 EarnHub Setup Assistant"
echo "=========================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js $(node -v) found"

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd backend

if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created .env file - please configure it"
fi

npm install
echo "✅ Backend dependencies installed"

# Frontend setup
echo ""
echo "🎨 Setting up Frontend..."
cd ../frontend

if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "📝 Created .env.local file"
fi

npm install
echo "✅ Frontend dependencies installed"

# Success
echo ""
echo "✨ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Configure backend/.env with your API keys"
echo "2. Configure frontend/.env.local"
echo "3. Ensure PostgreSQL is running"
echo "4. Run 'npm run dev' in backend/ folder"
echo "5. Run 'npm run dev' in frontend/ folder"
echo ""
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:3000"
