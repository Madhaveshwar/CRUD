# Project Files Overview

## Root Directory Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation with setup, features, troubleshooting |
| `QUICKSTART.md` | Quick start guide with startup scripts |
| `ARCHITECTURE.md` | Detailed explanation of how the app works |
| `start.bat` | Windows startup script for both servers |
| `start.sh` | macOS/Linux startup script for both servers |

## Backend Directory Structure

### Configuration Files
- `package.json` - Node.js dependencies and scripts
- `.env.example` - Template for environment variables
- `.env` - (Created after setup) Actual environment variables
- `.gitignore` - Files to exclude from Git

### Main Server File
- `server.js` - Express server setup and configuration

### Business Logic
- `routes/todos.js` - API route definitions (GET, POST, PUT, DELETE)
- `controllers/todoController.js` - CRUD operation logic

### Data Layer
- `models/Todo.js` - MongoDB schema and Mongoose model

## Frontend Directory Structure

### Configuration Files
- `package.json` - React dependencies and scripts
- `vite.config.js` - Vite bundler configuration
- `.gitignore` - Files to exclude from Git
- `index.html` - HTML entry point

### Application Files
- `src/main.jsx` - React app entry point
- `src/App.jsx` - Main React component
- `src/App.css` - Global styling

### Components
- `src/components/TodoForm.jsx` - Input form to add todos
- `src/components/TodoList.jsx` - Container for todo list
- `src/components/TodoItem.jsx` - Individual todo item component

### Services
- `src/services/todoService.js` - API client using Axios

## File Dependencies

```
Backend:
server.js
  → requires routes/todos.js
  → requires models/Todo.js (via controller)
  → requires controllers/todoController.js

routes/todos.js
  → imports controllers/todoController.js

controllers/todoController.js
  → imports models/Todo.js

models/Todo.js
  → uses mongoose

Frontend:
index.html
  → loads src/main.jsx

src/main.jsx
  → renders src/App.jsx

src/App.jsx
  → imports src/components/*
  → imports src/services/todoService.js

src/components/TodoList.jsx
  → imports src/components/TodoItem.jsx

src/services/todoService.js
  → uses axios
```

## Key Technologies by File

### Backend Files
| File | Technologies |
|------|--------------|
| server.js | Express, Mongoose, CORS, dotenv |
| routes/todos.js | Express Router |
| controllers/todoController.js | async/await, try/catch |
| models/Todo.js | Mongoose Schema, validation |

### Frontend Files
| File | Technologies |
|------|--------------|
| main.jsx | React, React-DOM |
| App.jsx | React Hooks (useState, useEffect) |
| TodoForm.jsx | React Hooks, form handling |
| TodoList.jsx | React Props |
| TodoItem.jsx | React Hooks, event handling |
| todoService.js | Axios, async/await |
| App.css | CSS3, flexbox, gradients |

## File Sizes (Approximate)

| File | Lines | Purpose |
|------|-------|---------|
| server.js | 50 | Server setup |
| todoController.js | 80 | Business logic |
| Todo.js | 25 | Schema definition |
| todos.js (routes) | 15 | Route mapping |
| App.jsx | 95 | Main component |
| TodoItem.jsx | 90 | Item component |
| TodoForm.jsx | 50 | Form component |
| todoService.js | 50 | API client |
| App.css | 250 | Styling |

## What Each File Does

### Backend

**server.js**
- Imports Express and other dependencies
- Initializes Express app
- Sets up middleware (CORS, JSON parsing)
- Connects to MongoDB
- Loads routes
- Starts listening on specified port

**routes/todos.js**
- Defines API endpoints
- Maps HTTP methods to controller functions
- Validates request parameters
- Handles routing logic

**controllers/todoController.js**
- `getAllTodos()` - Fetch all todos from database
- `createTodo()` - Create and save new todo
- `updateTodo()` - Find and update existing todo
- `deleteTodo()` - Find and delete todo
- All include error handling and validation

**models/Todo.js**
- Defines Schema with fields: title, completed, createdAt
- Sets field types and validation rules
- Exports Mongoose model for use in controller
- Auto-generates _id for each todo

### Frontend

**main.jsx**
- Entry point for React application
- Imports React and ReactDOM
- Mounts App component to DOM root element

**App.jsx**
- Main component managing application state
- `todos` state - array of all todos
- `loading` state - loading indicator
- `error` state - error messages
- Fetch todos on component mount (useEffect)
- Call todoService methods on user actions
- Pass data and callbacks to child components
- Display UI based on state

**TodoForm.jsx**
- Simple form with input and submit button
- Manage local input state
- Validate input before submission
- Call parent's onAddTodo callback
- Clear input after successful submission

**TodoList.jsx**
- Receives todos array as prop
- Maps over todos array
- Renders TodoItem for each todo
- Pass todo and callbacks to each TodoItem

**TodoItem.jsx**
- Display individual todo
- Checkbox to toggle completion
- Edit/delete buttons
- Edit mode for updating title
- Handle toggle, edit, and delete operations
- Call parent callbacks to update App state

**todoService.js**
- Create axios instance with base URL
- `getAllTodos()` - GET request to fetch all
- `createTodo()` - POST request to create
- `updateTodo()` - PUT request to update
- `deleteTodo()` - DELETE request to delete
- All methods use async/await
- All methods handle errors

**App.css**
- Global styling with CSS3
- Gradient background
- Flexbox for layout
- Responsive design for mobile
- Color scheme: purple/blue
- Smooth transitions and hover effects

## How to Navigate the Code

1. **Start with** `frontend/src/App.jsx` - Main component
2. **Then read** `frontend/src/components/` - UI components
3. **Check** `frontend/src/services/todoService.js` - API calls
4. **Move to** `backend/server.js` - Server setup
5. **Follow** `backend/routes/todos.js` - Route definitions
6. **See** `backend/controllers/todoController.js` - Business logic
7. **Understand** `backend/models/Todo.js` - Data structure

## Common Modifications

### Change Port
- **Backend**: Edit `MONGODB_URI` in `backend/.env`
- **Frontend**: Edit `port` in `frontend/vite.config.js`

### Change Colors
- **Frontend**: Edit variables in `frontend/src/App.css`
- Search for color values like `#667eea`, `#764ba2`

### Add New Fields to Todo
1. Update schema in `backend/models/Todo.js`
2. Update controller in `backend/controllers/todoController.js`
3. Update frontend components to display new field
4. Update todoService if needed

### Add Validation
- **Backend**: Add checks in `backend/controllers/todoController.js`
- **Frontend**: Add checks in `frontend/src/components/TodoForm.jsx`

---

For detailed documentation, see [README.md](./README.md)  
For architecture overview, see [ARCHITECTURE.md](./ARCHITECTURE.md)  
For quick setup, see [QUICKSTART.md](./QUICKSTART.md)
