# 'frontend\src' Folder
This directory contains the core source code for the WV Temperature Map frontend application. Below is an overview of each file and its purpose:

## File Descriptions
- 'App.css': Contains the main stylesheet for the application, defining styles that apply globally across various components.

- 'App.js': The root React component that sets up the application's structure and integrates child components.

- 'App.test.js': Includes test cases for the App component, ensuring it renders and functions as expected.

- 'DateSelector.js': A React component that provides a dropdown-based interface for users to select a specific date. Integrates with the backend to filter and fetch temperature data.

- 'MapComponent.js': A React component responsible for rendering the map interface, utilizing libraries like Leaflet to display temperature data.

- 'MapPage.js': The main page component of the application, integrating the map (MapComponent), the date selector (DateSelector), and a logout button. Manages state for the application, including temperature data and user interactions.

- 'Register.js': Handles user registration for the application. Provides a form interface for entering user credentials and interacts with the backend to create new accounts.

- 'index.css': Provides global CSS styles that apply to the entire application, ensuring consistent design and layout.

- 'index.js': The entry point of the React application, responsible for rendering the App component into the DOM.

- 'logo.svg': An SVG file containing the application's logo, used within components like the header or navigation.
