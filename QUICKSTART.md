# Quick Start Guide for Todo CRUD Application

This guide helps you quickly start the Todo CRUD application.

## Prerequisites

- Node.js installed (v14 or higher)
- MongoDB running (local or Atlas)

## Quick Start

### Option 1: Using Startup Scripts

#### Windows
Double-click `start.bat` file in the project root directory.

This will:
1. Install dependencies if needed
2. Create `.env` file from template
3. Start backend on http://localhost:5000
4. Start frontend on http://localhost:3000

#### macOS/Linux
Run this command in project root:
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Manual Setup

#### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

## Configuration

Before running the application, edit `backend/.env`:

```
MONGODB_URI=mongodb://localhost:27017/todos
PORT=5000
```

Replace `MONGODB_URI` with your actual MongoDB connection string.

## Access the Application

Open your browser and navigate to: `http://localhost:3000`

## Stopping the Application

- Press `Ctrl+C` in each terminal to stop the servers
- Or close the command windows (on Windows)

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running
- Check your connection string in `backend/.env`

### Port Already in Use
- Change PORT in `backend/.env` to a different number
- Or close other applications using the port

### Module Not Found
- Run `npm install` in both backend and frontend folders

## Next Steps

Read the main [README.md](./README.md) for detailed documentation and more information.

Good luck! 🚀
