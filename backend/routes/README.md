# `routes` Folder

This folder contains the backend API route definitions for the application. Each route file defines specific endpoints that interact with different components of the application, such as user authentication, data retrieval, and temperature map data management. Using routes allows us to separate concerns in the application by grouping related functions, improving cohesion and modularity. By encapsulating different functionalities within specific routes, we make the application more maintainable and flexible, adhering to principles like **encapsulation**, **modularity**, and **separation of concerns**.

### Structure of the `routes` Folder

Each route file in this folder manages a different aspect of the application’s functionality. Here’s an overview of each route file and the middleware applied to enhance security and usability.

## `auth.js`

- **Purpose**: Manages user authentication endpoints.
- **Endpoints**:
  - `/login` - Validates user credentials, creates a session, and returns an authentication token.
  - `/register` - Registers a new user by saving their information securely.
  - `/logout` - Logs the user out by invalidating their session.
- **Middleware Applied**:
  - **Authentication Middleware**: Ensures routes like `/logout` are accessible only to authenticated users.
  - **Validation Middleware**: Verifies the structure and contents of the request to prevent invalid data from reaching the backend.

This file uses the **Separation of Concerns** principle by encapsulating all authentication logic into one dedicated route file. Applying middleware here reduces **coupling** between components, ensuring that authentication requirements are consistently enforced across all endpoints.

## `stac.js`

- **Purpose**: Retrieves NOAA temperature data by interfacing with an external Python script to query the Microsoft Planetary Computer.
- **Endpoints**:
  - `/temperature-data` - Fetches temperature data for a specified date, which is then processed by a Python script.
- **Middleware Applied**:
  - **Validation Middleware**: Ensures the date parameter is provided before calling the backend.
  - **Logging Middleware**: Logs data retrieval activity and any errors that may occur.

Using middleware in `stac.js` keeps the route’s responsibilities focused on data retrieval. The middleware handles validation and logging, which supports **modularity** by reducing **coupling** between the retrieval logic and error-handling or logging functionalities.

## What are Routes?

In the context of this project, **routes** serve as entry points to different parts of the application’s backend functionality. Routes connect frontend requests to backend operations, acting as a middle layer that controls data flow and applies necessary security checks before performing operations.

### Purpose of Middleware in Routes

Middleware functions are essential for maintaining security, data validation, and logging in the backend. Middleware applied in routes helps to:
- **Encapsulate Cross-Cutting Concerns**: Common tasks like logging, authentication, and validation are implemented once in middleware and applied wherever needed.
- **Enhance Modularity and Cohesion**: Middleware promotes modularity by keeping the main route logic focused on core tasks, which improves cohesion.
- **Support Open-Closed Principle**: With middleware, routes can be open to extension (by adding new middleware functions) without being modified directly.
- **Implement Information Hiding**: Middleware encapsulates implementation details of authentication and logging, reducing the exposure of internal mechanics to the primary route logic.

### Folder Structure Example

Here is an example of how the `routes` folder might be organized:

```
routes/
├── auth.js               # Authentication endpoints
├── stac.js               # Data retrieval from NOAA and Planetary Computer
└── README.md             # Documentation for routes folder
```
