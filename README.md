# 📝 Full-Stack Todo CRUD Application

A simple, beginner-friendly full-stack CRUD application built with **React**, **Node.js + Express**, and **MongoDB**.

## Project Structure

```
CRUD/
├── backend/
│   ├── controllers/
│   │   └── todoController.js     # Business logic for CRUD operations
│   ├── models/
│   │   └── Todo.js               # MongoDB schema and model
│   ├── routes/
│   │   └── todos.js              # API routes
│   ├── .env.example              # Environment variables template
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server setup
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx      # Form to add new todos
│   │   │   ├── TodoList.jsx      # List of todos
│   │   │   └── TodoItem.jsx      # Individual todo item
│   │   ├── services/
│   │   │   └── todoService.js    # API service with Axios
│   │   ├── App.jsx               # Main app component
│   │   ├── App.css               # Styling
│   │   └── main.jsx              # Entry point
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js            # Vite configuration
│
└── README.md                      # This file
```

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either:
  - Install locally from [mongodb.com](https://www.mongodb.com/try/download/community)
  - Use **MongoDB Atlas** (cloud) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - [Download here](https://git-scm.com/)

## Setup Instructions

### Step 1: MongoDB Setup

#### Option A: Using MongoDB Atlas (Recommended for beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster
4. Create a database user with username and password
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/todos`)
6. Copy this string for later use

#### Option B: Using Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service
3. Connection string will be: `mongodb://localhost:27017/todos`

### Step 2: Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend folder (copy from `.env.example`):
   ```bash
   # Windows
   copy .env.example .env
   
   # macOS/Linux
   cp .env.example .env
   ```

4. Edit `.env` file and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/todos
   PORT=5000
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

   Or with auto-reload during development:
   ```bash
   npm run dev
   ```

   You should see: `✓ Server is running on http://localhost:5000`

### Step 3: Frontend Setup

1. In a new terminal, navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   You should see: `VITE v4.x.x  ready in xxx ms` and a local URL like `http://localhost:5000`

4. Open your browser and go to `http://localhost:3000`

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo by ID |
| DELETE | `/api/todos/:id` | Delete a todo by ID |

### Example API Calls

```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a new todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn React"}'

# Update a todo (replace :id with actual MongoDB ID)
curl -X PUT http://localhost:5000/api/todos/:id \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a todo
curl -X DELETE http://localhost:5000/api/todos/:id
```

## Features

✅ **Add Todo**: Create new todo items  
✅ **View Todos**: Display all todos in a list  
✅ **Edit Todo**: Update todo title  
✅ **Toggle Completion**: Mark todos as completed/uncompleted  
✅ **Delete Todo**: Remove todos from the list  
✅ **Responsive Design**: Works on desktop and mobile  
✅ **Error Handling**: User-friendly error messages  

## Technology Stack

**Frontend:**
- React 18 (Hooks: useState, useEffect)
- Vite (Build tool)
- Axios (HTTP client)
- CSS3 (Styling)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- CORS (Cross-Origin Resource Sharing)

**Database:**
- MongoDB (NoSQL database)

## Key Concepts for Beginners

### React Hooks
- **useState**: Manages component state (data that changes)
- **useEffect**: Runs side effects like fetching data when component mounts

### CRUD Operations
- **Create** (POST): Add new todo
- **Read** (GET): Fetch todos
- **Update** (PUT): Modify existing todo
- **Delete** (DELETE): Remove todo

### REST API
- Uses HTTP methods (GET, POST, PUT, DELETE) for operations
- Returns JSON responses
- Stateless communication between frontend and backend

### MongoDB
- NoSQL database that stores data as JSON-like documents
- Each todo is a document in the "todos" collection
- Automatically generates unique `_id` for each document

## Troubleshooting

### MongoDB Connection Error
**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
- Ensure MongoDB is running (check MongoDB Atlas or local MongoDB service)
- Verify `MONGODB_URI` in `.env` file is correct
- For local MongoDB: Start the MongoDB service

### Port Already in Use
**Problem**: `Error: listen EADDRINUSE :::5000` or `:::3000`

**Solution**:
- Change the PORT in `.env` (backend)
- Change the port in `vite.config.js` (frontend)

### CORS Error
**Problem**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
- Ensure backend server is running
- Check if CORS is enabled in `server.js`
- Verify API URL in `frontend/src/services/todoService.js` is correct

### Frontend Can't Connect to Backend
**Problem**: Network requests fail or timeout

**Solution**:
- Ensure backend is running on `http://localhost:5000`
- Check browser's Network tab for failed requests
- Verify API URL in `todoService.js` matches your backend URL

## Running Both Frontend and Backend

### Terminal Setup (Recommended)

1. **Terminal 1 - Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open browser to `http://localhost:3000`

## Next Steps to Enhance the App

After learning the basics, try adding:

1. **User Authentication**: Sign up, login, logout
2. **Categories/Tags**: Organize todos by category
3. **Due Dates**: Add deadline to todos
4. **Search and Filter**: Find todos by keyword
5. **Dark Mode**: Toggle between light and dark themes
6. **Sorting**: Sort by date, completion status, etc.
7. **Local Storage**: Save draft todos locally
8. **Animation**: Add smooth transitions and animations
9. **Backend Validation**: More robust data validation
10. **Testing**: Unit and integration tests

## Common Questions

**Q: Can I deploy this app?**  
A: Yes! Deploy the backend to Heroku/Render and frontend to Netlify/Vercel.

**Q: Do I need authentication?**  
A: Not for this basic version. Add it later if multiple users need separate todos.

**Q: Can I use a different database?**  
A: Yes, you can replace MongoDB with PostgreSQL, MySQL, Firebase, etc.

**Q: Is this production-ready?**  
A: No, this is a learning project. For production, add authentication, validation, error handling, and testing.

## License

This project is open source and free to use for learning purposes.

## Support

For questions or issues:
1. Check the Troubleshooting section above
2. Review the code comments for explanations
3. Visit the official documentation:
   - [React Docs](https://react.dev)
   - [Express Docs](https://expressjs.com)
   - [MongoDB Docs](https://docs.mongodb.com)
   - [Mongoose Docs](https://mongoosejs.com)

---

Happy coding! 🚀
