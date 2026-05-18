# Architecture & How It Works

This document explains how the Todo CRUD application works, designed for beginners to understand the full-stack flow.

## Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER / REACT FRONTEND                │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  App.jsx (Main Component)                             │ │
│  │  - Manages global state (todos, loading, error)       │ │
│  │  - Handles CRUD operations                            │ │
│  │  - Passes data to child components                    │ │
│  └────────────────────────────────────────────────────────┘ │
│           ↓                                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Components                                           │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │ │
│  │  │ TodoForm.jsx │  │ TodoList.jsx │  │TodoItem.jsx│  │ │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│           ↓                                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  todoService.js (API Client)                          │ │
│  │  - Uses Axios to make HTTP requests                   │ │
│  │  - Communicates with backend API                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          ↓ HTTP Requests ↓
┌─────────────────────────────────────────────────────────────┐
│              NODE.JS / EXPRESS BACKEND                       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  server.js (Express Setup)                            │ │
│  │  - Initializes Express app                            │ │
│  │  - Sets up middleware (CORS, JSON parsing)            │ │
│  │  - Connects to MongoDB                                │ │
│  └────────────────────────────────────────────────────────┘ │
│           ↓                                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  routes/todos.js (API Routes)                         │ │
│  │  - GET /api/todos                                     │ │
│  │  - POST /api/todos                                    │ │
│  │  - PUT /api/todos/:id                                 │ │
│  │  - DELETE /api/todos/:id                              │ │
│  └────────────────────────────────────────────────────────┘ │
│           ↓                                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  controllers/todoController.js (Business Logic)       │ │
│  │  - getAllTodos()                                      │ │
│  │  - createTodo()                                       │ │
│  │  - updateTodo()                                       │ │
│  │  - deleteTodo()                                       │ │
│  └────────────────────────────────────────────────────────┘ │
│           ↓                                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  models/Todo.js (Database Schema)                     │ │
│  │  - Defines Todo structure                             │ │
│  │  - Validates data with Mongoose                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          ↓ Queries ↓
┌─────────────────────────────────────────────────────────────┐
│                   MONGODB DATABASE                           │
│                                                              │
│  Collection: todos                                          │
│  [                                                          │
│    {                                                        │
│      _id: ObjectId(...),                                   │
│      title: "Learn React",                                 │
│      completed: false,                                     │
│      createdAt: Date(...)                                  │
│    },                                                      │
│    { ... }                                                 │
│  ]                                                         │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow: Adding a Todo

### Step 1: User Action (Frontend)
```javascript
// In TodoForm.jsx
User types "Learn React" → clicks Add button
→ handleSubmit() is called
```

### Step 2: Create Request (Frontend to Backend)
```javascript
// TodoForm calls onAddTodo()
await onAddTodo(title)
  ↓
// App.jsx calls handleAddTodo()
await todoService.createTodo(title)
  ↓
// todoService makes HTTP POST request
axios.post('http://localhost:5000/api/todos', { title })
```

### Step 3: Route Matching (Backend)
```javascript
// routes/todos.js
router.post('/', todoController.createTodo)
  ↓
// Request reaches createTodo controller
```

### Step 4: Business Logic (Backend)
```javascript
// controllers/todoController.js - createTodo()
1. Extract title from request body
2. Validate title is not empty
3. Create new Todo instance
4. Save to MongoDB
5. Return saved todo as JSON response
```

### Step 5: Database Operation (MongoDB)
```javascript
// models/Todo.js
const todo = new Todo({
  title: "Learn React",
  completed: false,
  createdAt: new Date()
})
await todo.save()
// MongoDB stores the document and returns it with _id
```

### Step 6: Response (Backend to Frontend)
```javascript
// Backend sends JSON response
{
  _id: "507f1f77bcf86cd799439011",
  title: "Learn React",
  completed: false,
  createdAt: "2024-01-15T10:30:00.000Z"
}
```

### Step 7: Update UI (Frontend)
```javascript
// App.jsx handleAddTodo() receives the response
setTodos([newTodo, ...todos])
  ↓
// React re-renders the component
// New todo appears at the top of the list
```

## Key Concepts Explained

### React Hooks

#### useState
Stores component state (data that changes).

```javascript
const [todos, setTodos] = useState([])
// todos = current state value
// setTodos = function to update state
// [] = initial state value (empty array)
```

When you call `setTodos()`, React:
1. Updates the state
2. Re-renders the component with new data
3. UI updates to show new state

#### useEffect
Runs code after component renders (side effects).

```javascript
useEffect(() => {
  fetchTodos()  // Fetch data when component first loads
}, [])  // Empty dependency array = run once on mount
```

Without `useEffect`, we'd create infinite loops of API requests!

### MongoDB & Mongoose

**MongoDB** is a NoSQL database that stores data as JSON-like documents.

**Mongoose** is a Node.js library that:
1. Defines schemas (structure of documents)
2. Validates data before saving
3. Provides helper methods (save, find, delete, etc.)

```javascript
// Schema: Define structure
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
})

// Model: Create interface to database collection
const Todo = mongoose.model('Todo', todoSchema)

// Methods
Todo.find()              // Get all todos
Todo.findById(id)        // Get one todo
Todo.findByIdAndUpdate() // Update todo
Todo.findByIdAndDelete() // Delete todo
```

### Express Routes & Controllers

**Routes** (routes/todos.js):
- Map HTTP methods to controller functions
- Define URL patterns

**Controllers** (controllers/todoController.js):
- Contains actual business logic
- Queries database via Mongoose models
- Handles errors
- Sends responses back to client

### CORS (Cross-Origin Resource Sharing)

Allows frontend (localhost:3000) to make requests to backend (localhost:5000).

```javascript
app.use(cors())  // Enable CORS on all routes
```

Without CORS, browser blocks requests from different origins (security feature).

## Async/Await Pattern

Used throughout for handling asynchronous operations.

```javascript
// Without async/await (callback hell)
function fetchTodos(callback) {
  Todo.find((err, todos) => {
    if (err) callback(err)
    else callback(null, todos)
  })
}

// With async/await (cleaner)
async function fetchTodos() {
  try {
    const todos = await Todo.find()
    return todos
  } catch (error) {
    console.error(error)
  }
}
```

Benefits:
- Code reads like synchronous code
- Easier to understand flow
- Better error handling with try/catch

## Component Hierarchy

```
App (Root)
├── TodoForm
│   └── Input + Button
├── TodoList
│   └── TodoItem (multiple)
│       ├── Checkbox
│       ├── Title
│       └── Action Buttons (Edit, Delete)
```

### Props Flow
```
App (has todos state)
  ↓ passes todos as prop
  ↓ passes onToggleTodo, onEditTodo, onDeleteTodo callbacks
TodoList
  ↓ passes individual todo
  ↓ passes callbacks
TodoItem
  ↓ uses todo data
  ↓ calls callbacks on user action
  ↓ callback updates App state
  ↓ App re-renders with new data
```

## API Request/Response Cycle

### Example: Delete a Todo

**Request** (Frontend → Backend)
```
DELETE http://localhost:5000/api/todos/507f1f77bcf86cd799439011
```

**Route Matching** (Backend)
```javascript
router.delete('/:id', todoController.deleteTodo)
```

**Controller Logic** (Backend)
```javascript
exports.deleteTodo = async (req, res) => {
  const id = req.params.id  // Get ID from URL
  const todo = await Todo.findByIdAndDelete(id)  // Delete from DB
  res.json({ message: 'Todo deleted' })  // Send response
}
```

**Response** (Backend → Frontend)
```javascript
{
  message: "Todo deleted successfully"
}
```

**Update UI** (Frontend)
```javascript
setTodos(todos.filter(todo => todo._id !== id))
```

## Error Handling

### Frontend Error Handling
```javascript
try {
  const data = await todoService.createTodo(title)
  setTodos([data, ...todos])
} catch (error) {
  setError('Failed to create todo')
}
```

### Backend Error Handling
```javascript
exports.createTodo = async (req, res) => {
  try {
    if (!title) {
      return res.status(400).json({ error: 'Title required' })
    }
    const todo = new Todo({ title })
    await todo.save()
    res.status(201).json(todo)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
```

## Environment Variables

Stored in `.env` file (not committed to Git):

```
MONGODB_URI=mongodb://localhost:27017/todos
PORT=5000
```

Accessed in code:
```javascript
require('dotenv').config()
const mongoUri = process.env.MONGODB_URI
const port = process.env.PORT || 5000
```

Benefits:
- Different configs for dev/production
- Hide sensitive data
- Easy to change without editing code

## Performance Considerations

### Frontend
- React only re-renders components with changed state
- useEffect dependency array prevents unnecessary renders
- Components are modular and reusable

### Backend
- Mongoose queries are efficient
- Error handling prevents crashes
- CORS allows caching on frontend

### Database
- MongoDB indexes improve query speed
- Proper schema validation prevents invalid data

## Security Considerations (Beginner Level)

Current implementation is NOT production-ready. To add security:

1. **Authentication**: Add user login/signup
2. **Authorization**: Users only see their own todos
3. **Input Validation**: Sanitize all user inputs
4. **HTTPS**: Use SSL/TLS in production
5. **Rate Limiting**: Prevent API abuse
6. **CORS**: Restrict to specific origins
7. **Environment Variables**: Hide sensitive data

## Next Steps for Learning

1. **Add Features**: Categories, due dates, priority levels
2. **Database Optimization**: Add indexes, improve queries
3. **Testing**: Write unit tests with Jest
4. **Styling**: Learn CSS-in-JS, Tailwind CSS
5. **State Management**: Learn Redux or Zustand
6. **Authentication**: Implement JWT tokens
7. **Deployment**: Deploy to production (Heroku, Vercel, AWS)

---

This architecture is simple by design for learning purposes. Real-world applications have more layers, caching, queuing, and optimization!
