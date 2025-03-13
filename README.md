Below is a sample README file for the main landing page of the repository (branch demo1). You can adjust details as needed for your project.

---

# WV Temperature Map

**WV Temperature Map** is a full-stack web application designed to display temperature data for West Virginia. The project is structured as a modern web application featuring:

- **Frontend:** Built with React to provide a dynamic and responsive user interface, including user authentication (login and registration) and a future temperature map display.
- **Backend:** Developed using Node.js with Express to handle API endpoints, user authentication with JSON Web Tokens (JWT), and data management with a MySQL database.
- **Database:** MySQL is used to store temperature data as well as user credentials, and the backend is configured to work with both local and cloud-based MySQL deployments.

> **Branch:** This README corresponds to the `demo1` branch, which is a demonstration version of the project.

---

## Features

- **User Authentication:**  
  Users can register and log in securely. Passwords are hashed using bcrypt, and sessions are managed via JWTs stored in HTTP-only cookies.

- **Temperature Map (Upcoming):**  
  While the current demo focuses on authentication and foundational setup, the project will eventually display a dynamic temperature map.

- **Modular Architecture:**  
  The project is split into clear sections for the frontend and backend, making it easy for students to understand, extend, and deploy.

- **API Integration:**  
  The front end communicates with the backend using RESTful API calls managed by Axios.

- **CORS & Environment Configuration:**  
  The backend is configured to handle cross-origin requests and uses environment variables for secure configuration.

---

## Architecture

The repository is organized into two main directories:

- **/frontend:** Contains the React application, which handles user interaction, authentication, and (in the future) map visualization.
- **/backend:** Contains the Express-based server that provides RESTful API endpoints, handles user authentication, and connects to a MySQL database.

Each directory includes its own README file with detailed setup and configuration instructions.

---

## Getting Started

### Prerequisites

- **Node.js and npm:** [Download Node.js](https://nodejs.org/)
- **Git:** [Download Git](https://git-scm.com/)
- **Docker (Optional):** If you prefer to run MySQL in a container.
- **VS Code:** Recommended for development.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/tdevine1/wv-temperature-map.git
   cd wv-temperature-map
   git checkout demo1
   ```

2. **Follow the Setup Instructions:**

   - For the **Frontend**, see [frontend/README.md](./frontend/README.md) for instructions on installing dependencies, configuring environment variables, and running the React application.
   - For the **Backend**, see [backend/README.md](./backend/README.md) for instructions on configuring the Node.js server, connecting to MySQL, and solving CORS issues.

---

## Directory Structure

```
wv-temperature-map/
├── backend/           # Express server, API endpoints, and MySQL database connection
│   ├── config/        # Database configuration files
│   ├── routes/        # API routes (e.g., authentication)
│   ├── authMiddleware.js  # JWT authentication middleware
│   ├── app.js         # Main Express application file
│   └── README.md      # Backend setup and configuration instructions
├── frontend/          # React application for the UI
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Pages (e.g., Login, Register)
│   │   ├── services/    # API service modules (e.g., authService.js)
│   │   ├── App.js       # Main application component with routing
│   │   └── index.js     # React entry point
│   └── README.md      # Frontend setup and configuration instructions
└── README.md          # This main landing page with project overview and links to subdirectories
```

Each subdirectory contains its own README file that explains the contents and provides setup information for that section of the project.

---

## License

MIT License

Copyright (c) 2025 Thomas Ryan Devine

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

