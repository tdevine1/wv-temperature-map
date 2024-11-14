# `backend` Folder

The `backend` folder is the server-side component of the application, responsible for handling requests from the frontend, interacting with external APIs, managing the database, and providing data for rendering maps and managing user authentication. The backend is built using **Express.js** and leverages various middleware and route handlers to maintain a clean, modular structure that adheres to best practices in software engineering, including **separation of concerns**, **information hiding**, and **modularity**.

## Structure of the `backend` Folder

The backend is organized to achieve high **cohesion** and **low coupling** by separating different concerns across dedicated files and folders. This structure supports the **MVC architecture** and aligns with principles like the **Open-Closed Principle** and **Dependency Inversion Principle**.

### Folder and File Overview

```
backend/
├── config/                # Configuration files, including database setup
│   └── db.js              # Establishes connection to the database
├── middleware/            # Middleware functions for validation, authentication, logging
│   ├── authMiddleware.js  # Middleware to ensure user is authenticated
│   └── validate.js        # Middleware for validating request data
├── routes/                # API route definitions for different backend functionalities
│   ├── auth.js            # Routes for user authentication
│   └── stac.js            # Routes for data retrieval from external APIs
├── get_temperature_data.py # Python script to retrieve NOAA temperature data
├── index.js               # Main entry point for the Express server
└── README.md              # Documentation for the backend folder
```

### Key Components in the Backend

1. **Configuration (`config`)**
   - Contains settings and configuration details, such as database connections.
   - **Encapsulates** database setup, keeping sensitive connection logic separate from the core application.

2. **Routes (`routes`)**
   - Contains route definitions that interact with the frontend, handle user requests, and serve data.
   - Each route file groups related endpoints (e.g., `auth.js` for authentication and `stac.js` for temperature data).
   - Supports **modularity** by keeping route logic isolated to specific files, enhancing **cohesion** within each route file.

3. **Middleware (`middleware`)**
   - Contains middleware functions that handle **cross-cutting concerns** such as logging, data validation, and authentication.
   - By applying middleware to route files, we reduce **coupling** between primary route logic and these auxiliary tasks.
   - **Example**: `authMiddleware.js` ensures users are authenticated before accessing specific routes, aligning with **information hiding** by keeping authentication logic separate from routes.

4. **Python Script (`get_temperature_data.py`)**
   - A script that retrieves temperature data from NOAA through the Planetary Computer STAC API.
   - This Python script is executed from within the Express app to access data beyond Node.js’s typical capabilities.
   - **Separation of Concerns**: Encapsulating data retrieval in Python ensures the backend remains **open for extension** (Python integrations) without modifying core JavaScript code.

5. **Main Server (`index.js`)**
   - The entry point of the application, responsible for initializing the Express server and connecting middleware, routes, and the database.
   - Establishes a central place to configure application-wide settings and middleware, improving **cohesion** and **modularity**.

### Key Principles and Design Choices

The backend structure is designed with several software engineering principles in mind:

- **Encapsulation**: Sensitive logic, such as database connection and authentication, is encapsulated in dedicated files, minimizing exposure of internal details.
- **Separation of Concerns**: Each functionality (e.g., authentication, data retrieval) has its dedicated file, ensuring that code handling one concern does not interfere with another.
- **Modularity**: Each folder and file in the backend has a specific responsibility, which makes the codebase more modular and easier to maintain.
- **Dependency Inversion Principle**: By leveraging middleware and modular route files, the backend relies on abstractions (e.g., middleware functions) rather than specific implementations, making it easier to extend or modify.

### Setting Up the Backend

1. **Install Dependencies**
   - Run `npm install` in the `backend` folder to install necessary packages for the backend, including `express`, `cors`, and other middleware libraries.

2. **Configure Environment Variables**
   - Create a `.env` file in the `backend` folder to store sensitive information, such as database credentials and API keys. Refer to `.env.example` for the required variables.

3. **Running the Server**
   - Use `node index.js` to start the backend server.
   - The server will listen on the specified port and log any incoming requests and errors.

4. **Interacting with External APIs**
   - The `stac.js` route file in `routes/` uses `get_temperature_data.py` to retrieve temperature data.
   - The middleware in `middleware/` validates and logs these requests, ensuring only authenticated users can access the data.

### Conclusion

The `backend` folder organizes server-side logic, API routes, database interactions, and middleware in a way that ensures **high cohesion** and **low coupling**. By using well-defined modules and adhering to best practices such as **separation of concerns** and **information hiding**, the backend code is structured for **scalability**, **maintainability**, and **security**.