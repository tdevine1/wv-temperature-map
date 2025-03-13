# WV Temperature Map

![Screenshot Description](./images/screenshot.png)

**WV Temperature Map** is an educational full-stack web application developed for the Introduction to Software Engineering course at West Virginia University. This project guides students in creating a simple web app that integrates real-world NOAA data. The project is sponsored by the West Virginia High Tech Foundation and is designed to empower students with hands-on experience in modern web development, cloud hosting, and data integration.

## Overview

**WV Temperature Map** is split into two main components:

- **Frontend:** Built with React, this part of the application provides a user-friendly interface for user authentication (login and registration) and will eventually display temperature data on a map.
- **Backend:** Developed using Node.js with Express, this component handles API requests, user authentication (using bcrypt and JWT), and database interactions with MySQL.

This project is intended to be a practical learning tool for students, teaching them:
- How to implement user authentication securely.
- The basics of RESTful API integration.
- Techniques for connecting a React frontend to a Node.js backend.
- The fundamentals of working with real-world data, in this case, NOAA temperature data.

An article highlighting the class and its impact can be read [here](https://media.statler.wvu.edu/news/2025/03/03/cloud-hosting-software-project-empowers-wvu-students-for-hands-on-learning-career-readiness?fbclid=IwY2xjawI_r6BleHRuA2FlbQIxMQABHXWZEl7J5FWvDaYc1QXTufHes-BeCbPfsfS4ZERlsLbnLaoB_Y8GA-YCsA_aem_kavMonip2Uazr9BtaV1xww).

## Repository Structure

```
wv-temperature-map/
├── backend/           # Express server, API endpoints, and MySQL database connection
├── frontend/          # React application for the user interface
├── doc/               # Setup guides and documentation for both frontend and backend
└── README.md          # This main landing page
```

- **backend/README.md:** Contains detailed instructions for setting up the backend, configuring the database, and resolving CORS issues.
- **frontend/README.md:** Contains detailed instructions for setting up the frontend, installing dependencies, and connecting to the backend.
- **doc/**: Provides comprehensive guides on getting started with the project, including step-by-step setup instructions for both the frontend and backend environments.

## Educational Context

This project is a hands-on, real-world example designed for a WVU Software Engineering course. It teaches students how to build and deploy a full-stack web application that integrates NOAA data. Sponsored by the West Virginia High Tech Foundation, the project not only enhances technical skills but also prepares students for a career in the tech industry.

## Getting Started

To get started with the project, please refer to the setup guides in the `doc` folder:
- [Backend Setup Guide](doc/backend_setup.md)
- [Frontend Setup Guide](doc/frontend_setup.md)

These guides provide all the necessary steps to set up your development environment, configure environment variables, and run the application locally.

## License

This project is licensed under the [MIT License](LICENSE).
