@echo off
REM Quick Start Script for Todo CRUD Application
REM This script helps you start both frontend and backend servers

echo.
echo ====================================
echo  Todo CRUD Application Startup
echo ====================================
echo.

REM Check if we're running from the correct directory
if not exist "backend" (
    echo Error: Please run this script from the CRUD root directory
    pause
    exit /b 1
)

REM Install backend dependencies if needed
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Install frontend dependencies if needed
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

REM Check if .env file exists in backend
if not exist "backend\.env" (
    echo.
    echo Warning: backend\.env file not found!
    echo Creating from .env.example...
    copy "backend\.env.example" "backend\.env"
    echo.
    echo Please edit backend\.env with your MongoDB connection string!
    pause
)

echo.
echo Starting backend server...
echo Backend will run on http://localhost:5000
echo.

REM Open backend in new command window
start cmd /k "cd backend && npm start"

timeout /t 3

echo.
echo Starting frontend server...
echo Frontend will run on http://localhost:3000
echo.

REM Open frontend in new command window
start cmd /k "cd frontend && npm run dev"

echo.
echo ====================================
echo Applications starting...
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Close command windows to stop servers.
echo ====================================
echo.

pause
