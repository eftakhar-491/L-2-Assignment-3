# Library Management System

Library Management System is a RESTful backend API for managing books and borrowing operations in a library. The system supports full CRUD (Create, Read, Update, Delete) for books, a borrowing workflow with copies count and availability logic, aggregated reporting on borrowed books.

# Features

- Book Management (CRUD)
- Borrowing Workflow
- Aggregation Reports
- pipelines (via Model.aggregate() )
- Input Validation
- Filtering & Sorting
- Mongoose Middleware & Methods

# Tech Stack

- Node.js
- Express
- TypeScript
- Mongoose
- MongoDB Atlas

# Installation

### Clone the repository:

```
git clone https://github.com/eftakhar-491/L-2-Assignment-3
cd L-2-Assignment-3
```

### Install dependencies:

```
npm install
```

- Environment setup:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/myLibrary?retryWrites=true&w=majority
```

### Running the Application

- Development Server

```
npm run dev
http://localhost:5000.

```

### Production Build

```
npm run build
npm start
```

# API Endpoints

- Books:

```
GET /api/books   (List all books)
GET /api/books/:id   (Get a book by ID)
POST /api/books   (Create a new book)
PUT /api/books/:id   (Update a book by ID)
DELETE /api/books/:id   (Delete a book by ID)
```

- Borrowing:

```
GET /api/borrow   (Get aggregated summary of borrowed books)
POST /api/borrow   (Return a book; increments available )
```

<br>
<br>
<hr>
Built with ❤️ for learning and productivity.
<hr>
