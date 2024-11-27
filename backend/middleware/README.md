# `middleware` Folder

The `middleware` folder contains reusable middleware functions that are applied to routes in the application to handle cross-cutting concerns like authentication, validation, and logging. Middleware enables **modularity** and **encapsulation** by isolating these concerns outside of the core route logic, supporting clean and maintainable code. Middleware also helps the application adhere to principles of **Separation of Concerns**, **Information Hiding**, **Encapsulation**, and **Low Coupling**.

## Purpose of Middleware

Middleware functions are designed to operate on the request/response cycle in Express.js. They intercept requests as they arrive, perform specified actions, and then pass control to the next middleware in the chain or directly handle the response. Common uses of middleware in this application include:

- **Authentication**: Verifies user identity, ensuring only authorized users access certain routes.
- **Validation**: Checks the structure and validity of incoming data to prevent invalid requests from reaching the main application logic.
- **Logging**: Records details of each request, providing insights for monitoring and debugging.

Middleware simplifies route management by removing duplicated code across multiple routes, aligning with the **Open-Closed Principle**: middleware can be extended or modified without changing the routes that use it.

## Structure of the `middleware` Folder

The following files are typical in the `middleware` folder, each focusing on a particular aspect of the application’s cross-cutting concerns.

### `authMiddleware.js`

- **Purpose**: Checks if the user is authenticated before allowing access to protected routes.
- **Functionality**:
  - Verifies that a valid token or session exists in the request.
  - If authenticated, the request is allowed to proceed to the next middleware or route.
  - If unauthenticated, it responds with a `401 Unauthorized` status.
- **Principles Applied**:
  - **Encapsulation**: Authenticates users without exposing the underlying logic in each route.
  - **Separation of Concerns**: Centralizes authentication logic in one file, simplifying route code.
  - **Dependency Inversion**: The middleware depends on an abstraction (token/session validation) rather than direct implementations in each route.

### `validateInput.js`

- **Purpose**: Ensures that incoming requests contain valid data.
- **Functionality**:
  - Checks the format of incoming data fields (such as `date` for the `/temperature-data` route).
  - If validation passes, the request proceeds; otherwise, it responds with a `400 Bad Request` error.
- **Principles Applied**:
  - **Open-Closed Principle**: Validation rules can be extended as new fields are added without modifying existing validation functions.
  - **Information Hiding**: Keeps validation logic separate from route handling, which makes the routes easier to understand and maintain.

### `loggingMiddleware.js`

- **Purpose**: Records the details of each request, including the route accessed, request parameters, and any errors encountered.
- **Functionality**:
  - Logs each request’s details to the console or a file for tracking and debugging purposes.
  - Captures error details and timestamps to facilitate easier debugging and performance monitoring.
- **Principles Applied**:
  - **Modularity**: The middleware is self-contained, allowing it to be used across multiple routes with minimal coupling.
  - **Cohesion**: The middleware is focused solely on logging, which aligns with its single responsibility.
  - **Information Hiding**: The routes using this middleware do not need to know about or interact with the logging mechanism.

## Benefits of Middleware

Middleware enhances the application’s design by promoting **modularity** and **reusability**. By isolating repetitive or shared functionality into middleware functions, the application achieves:
- **Improved Cohesion**: Each middleware file performs a specific task and is responsible only for that concern.
- **Reduced Coupling**: Routes do not need to be aware of how authentication, validation, or logging works internally.
- **Encapsulation**: Cross-cutting concerns like authentication and logging are managed separately, hiding these details from the main route logic.
- **Scalability**: Middleware makes it easier to introduce new features (like additional validation or different logging methods) without modifying each route individually.

## Example Folder Structure

Here is an example of how the `middleware` folder might be organized:

```
middleware/
├── authMiddleware.js          # Handles user authentication
├── validateInput.js           # Validates incoming request data
├── loggingMiddleware.js       # Logs request and error details
└── README.md                  # Documentation for middleware folder
```