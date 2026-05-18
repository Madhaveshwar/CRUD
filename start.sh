#!/bin/bash

# Quick Start Script for Todo CRUD Application
# This script helps you start both frontend and backend servers

echo ""
echo "===================================="
echo " Todo CRUD Application Startup"
echo "===================================="
echo ""

# Check if we're running from the correct directory
if [ ! -d "backend" ]; then
    echo "Error: Please run this script from the CRUD root directory"
    exit 1
fi

# Install backend dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Check if .env file exists in backend
if [ ! -f "backend/.env" ]; then
    echo ""
    echo "Warning: backend/.env file not found!"
    echo "Creating from .env.example..."
    cp "backend/.env.example" "backend/.env"
    echo ""
    echo "Please edit backend/.env with your MongoDB connection string!"
fi

echo ""
echo "Starting backend server..."
echo "Backend will run on http://localhost:5000"
echo ""

# Start backend in background
cd backend
npm start &
BACKEND_PID=$!
cd ..

sleep 2

echo ""
echo "Starting frontend server..."
echo "Frontend will run on http://localhost:3000"
echo ""

# Start frontend in background
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "===================================="
echo "Applications started!"
echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "===================================="
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
