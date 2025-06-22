Library Management System
Library Management System is a RESTful backend API for managing books and borrowing operations in a library. It is built with Express (a minimal Node.js web framework
expressjs.com
) and TypeScript, using Mongoose as the ODM for MongoDB Atlas. The system supports full CRUD (Create, Read, Update, Delete) for books, a borrowing workflow with copies count and availability logic, aggregated reporting on borrowed books, input validation, and query filtering/sorting. Each Mongoose schema includes custom static and instance methods and uses middleware hooks to enforce business rules.
Features
Book Management (CRUD): Create, retrieve (all or by ID), update, and delete books.
Borrowing Workflow: Borrow and return books, automatically updating the copies and available counts. Business logic ensures you cannot borrow more copies than available.
Aggregation Reports: Compute summaries of borrowed books using MongoDB aggregation pipelines (via Model.aggregate())
mongoosejs.com
. For example, you might get total books borrowed per title.
Input Validation: Schema-level validation (e.g. required fields, min/max, enums) ensures only valid data is saved
mongoosejs.com
. Mongoose runs validation as a pre-save hook
mongoosejs.com
.
Filtering & Sorting: List endpoints accept query parameters to filter and sort results. This allows clients to narrow queries (e.g. ?author=Hemingway) and order by fields (e.g. ?sort=title)
atatus.com
.
Mongoose Middleware & Methods: Uses schema middleware (e.g. pre('save') hooks) to implement custom logic
mongoosejs.com
, and defines static/instance methods on models for reusable functionality
mongoosejs.com
mongoosejs.com
.
Tech Stack
Node.js – JavaScript runtime
Express – Web application framework
expressjs.com
TypeScript – Typed superset of JavaScript
Mongoose – MongoDB object modeling (ODM) library
MongoDB Atlas – Cloud-hosted MongoDB database
Prerequisites
Node.js & npm: Install Node.js (v18+ LTS recommended) and npm on Windows. You can download the LTS Windows installer from the [official Node.js site] or use a version manager
docs.npmjs.com
.
MongoDB Atlas: Create a MongoDB Atlas account and cluster. In the Atlas UI, navigate to Connect → Connect Your Application to copy the cluster’s connection string
mongodb.com
. (Replace <username> and <password> and database name in the URI as instructed.) Ensure your IP is whitelisted or use the provided network access settings.
Installation
Clone the repository:
git clone https://github.com/yourusername/library-management-system.git
cd library-management-system
Install dependencies:
npm install
Environment setup: Create a .env file in the project root (you can copy from .env.sample). In .env, set MONGODB_URI to your Atlas connection string, e.g.:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/myLibrary?retryWrites=true&w=majority
(See .env.sample for format
github.com
.) You can also set a PORT if you want to override the default.
Running the Application
Development Server: Run the app with automatic restarts on code changes:
npm run dev
This uses ts-node-dev to compile TypeScript on the fly
github.com
. The API will typically run at http://localhost:3000.
Production Build: To build and run for production, compile TypeScript and then start:
npm run build
npm start
The build script runs tsc to compile into dist/, and start executes node dist/server.js as defined in package.json.
API Endpoints
Below is an overview of the main API endpoints (grouped by functionality):
Books:
GET /api/books (List all books)
GET /api/books/:id (Get a book by ID)
POST /api/books (Create a new book)
PUT /api/books/:id (Update a book by ID)
DELETE /api/books/:id (Delete a book by ID)
Borrowing:
POST /api/borrow (Borrow a book; decrements available)
POST /api/return (Return a book; increments available)
(These endpoints enforce business rules on copy counts.)
Reports:
GET /api/borrowed-summary (Get aggregated summary of borrowed books)
Note: Filtering and pagination can be applied to list endpoints via query parameters (e.g. ?author=Hemingway&page=2).
Examples
Create a New Book (POST /api/books):
POST /api/books
Content-Type: application/json

{
"title": "The Great Gatsby",
"author": "F. Scott Fitzgerald",
"copies": 4
}
Response (201 Created)
{
"id": "64b7a7e1f9b91b6d98a3c1b2",
"title": "The Great Gatsby",
"author": "F. Scott Fitzgerald",
"copies": 4,
"available": 4
}
List All Books (GET /api/books):
GET /api/books
Response (200 OK)
[
{
"id": "64b7a7e1f9b91b6d98a3c1b2",
"title": "The Great Gatsby",
"author": "F. Scott Fitzgerald",
"copies": 4,
"available": 4
},
{
"id": "64b7a7e1f9b91b6d98a3c1b3",
"title": "1984",
"author": "George Orwell",
"copies": 5,
"available": 3
}
]
