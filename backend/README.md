# Backend – WV Temperature Map

This is the server-side component of the WV Temperature Map project. It is built with Node.js and Express and serves as the API for user authentication and (in the future) NOAA temperature data integration. The backend uses a MySQL database for data persistence, bcrypt for password hashing, and JSON Web Tokens (JWT) for session management. This project is part of an educational initiative for a WVU Software Engineering course sponsored by the West Virginia High Tech Foundation.

---

## Features

•  User Authentication:  
   Secure registration and login using bcrypt (to hash passwords) and JWT (to manage sessions via HTTP-only cookies).

•  RESTful API:  
   Provides endpoints for user registration and login which the frontend consumes.

•  MySQL Database Integration:  
   Uses the mysql2 package to connect to a MySQL database via a connection pool.

•  CORS Support:  
   Configured with the cors middleware to allow cross-origin requests from the frontend.

---

## Project Structure

```
backend/
├── config/
│   └── database.js         # Sets up and exports the MySQL connection pool using environment variables.
├── middleware/
│   └── authMiddleware.js   # Provides JWT verification for protecting API routes.
├── routes/
│   └── auth.js             # Defines API endpoints for user registration and login.
├── app.js                  # Main Express application file (initializes middleware, sets up CORS, and mounts routes).
├── package.json            # Lists project dependencies and scripts.
└── README.md               # Documentation and setup instructions for the backend.
```

---

## Prerequisites

- Node.js and npm (download from nodejs.org).
- MySQL (installed locally or running in a Docker container).
- Git (to clone the repository).
- (Optional) Docker if you prefer running MySQL in a container.

---

## Setup Instructions

1. Environment Configuration  
   Create a file named .env in the backend directory with the following content:

```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=P@55word
   DB_NAME=authdb
   DB_PORT=3306
   PORT=3000
   JWT_SECRET=bETMvHHeT0J0FyO07GRsHjQhoQwZBsJ1XqEppBQkPQA
```

   Note: Ensure the .env file is listed in your .gitignore so it is not committed.

2. Installing Dependencies  
   Open a terminal in the backend directory and run:
```
      npm install
```
   This will install all required packages (Express, mysql2, dotenv, cors, bcryptjs, jsonwebtoken, etc.).

3. Solving CORS Issues  
   To allow requests from the frontend (e.g., running on http://localhost:3001), open app.js and add the following:

   -  At the top, include:
```
         const cors = require('cors');
```
   -  Then add this middleware before your routes are mounted:
```
         app.use(cors({
           origin: 'http://localhost:3001',  // Change this if your frontend runs on a different URL
           credentials: true
         }));
```

4. Running the Server  
   To start the backend server, run:

```
      npm start
```
   If using nodemon for development, you might run:
```   
      npm run dev
```
   The server will start on the port specified in the .env file (default 3000).

---

## Testing and Troubleshooting

- Database Connection:  
   Ensure your MySQL server is running and that the connection details in .env are correct.

- API Endpoints:  
   Test endpoints with Postman or curl.

- CORS Errors:  
   Verify that the origin in your CORS configuration in app.js matches the URL where your frontend is running.

- Environment Variables:  
   Confirm that .env is properly loaded (using require('dotenv').config() at the top of app.js).

---

## Educational Context

This backend is designed as a teaching tool for WVU Software Engineering students. It demonstrates how to build a secure RESTful API with user authentication, integrate a MySQL database, and handle cross-origin requests. Sponsored by the West Virginia High Tech Foundation, the project serves as a practical example of integrating real-world NOAA data into a full-stack web application.
