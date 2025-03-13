# Frontend – WV Temperature Map

This is the user interface component of the WV Temperature Map project. This React-based application handles user authentication (login and registration) and will eventually display NOAA temperature data on an interactive map. The project is designed as an educational tool for WVU Software Engineering students, sponsored by the West Virginia High Tech Foundation.

---

## Overview

The frontend is built with React and uses React Router for navigation between pages. It communicates with the backend API for user registration and login, with the API URL configured via environment variables. The code is organized into reusable components, pages, and service modules, making it easy to understand and extend.

---

## Project Structure

The main directory structure under `frontend/src` is as follows:

```
frontend/
└── src/
    ├── components/     # Reusable UI components (buttons, form inputs, etc.)
    ├── pages/          # Page components (e.g., Login.js, Register.js)
    ├── services/       # API service modules (e.g., authService.js)
    ├── App.js          # Main application component that sets up routing
    ├── index.js        # Entry point of the React application
    └── styles/         # (Optional) CSS files or styled components for custom styling
```

Each subdirectory contains code that is modular and easy to maintain, providing a solid foundation for further development.

---

## Setup Instructions

### Prerequisites

- **Node.js and npm:** Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Git:** Ensure Git is installed for cloning the repository.
- **VS Code:** Recommended for code editing and development.

### Installation

1. **Clone the Repository and Switch to the `demo1` Branch:**

   ```bash
   git clone https://github.com/tdevine1/wv-temperature-map.git
   cd wv-temperature-map
   git checkout demo1
   ```

2. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend
   ```

3. **Install Dependencies:**

   In the `frontend` directory, run:
   ```bash
   npm install
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the `frontend` folder with the following content:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```
   This URL should match the address where your backend API is running.

---

## Running the Application

1. **Start the Development Server:**

   In the `frontend` directory, run:
   ```bash
   npm start
   ```
   The development server should start, and you’ll typically see the application running on [http://localhost:3000](http://localhost:3000) or another port if specified by your React configuration.

2. **Access the Application:**

   Open your web browser and navigate to the URL provided by the development server. You can switch between the Login and Registration pages using the navigation links provided in the header.

---

## Testing Functionality

- **User Authentication:**  
  Test the Login and Registration forms by entering user credentials. The forms make API calls (using Axios) to your backend. Open the browser’s developer tools (Network tab) to view these requests and verify that the responses are as expected.

- **Error Handling:**  
  If you encounter any errors (e.g., CORS issues), ensure that your backend is configured properly. Refer to the backend README for CORS setup instructions.

---

## Educational Context

This project is part of an educational initiative for a WVU Software Engineering course. Students learn to build a full-stack web application that integrates real-world NOAA data. This frontend provides a practical example of modern web development practices including user authentication, API integration, and modular code organization.

An article on the class can be read [here](https://media.statler.wvu.edu/news/2025/03/03/cloud-hosting-software-project-empowers-wvu-students-for-hands-on-learning-career-readiness?fbclid=IwY2xjawI_r6BleHRuA2FlbQIxMQABHXWZEl7J5FWvDaYc1QXTufHes-BeCbPfsfS4ZERlsLbnLaoB_Y8GA-YCsA_aem_kavMonip2Uazr9BtaV1xww).

---

## License

This project is licensed under the [MIT License](../doc/LICENSE).
