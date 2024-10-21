# WV Temperature Map: React Web Application Tutorial

This tutorial guides you through creating a React-based web application that displays an interactive map of recent temperatures for locations in West Virginia. We'll use **Leaflet** for the map rendering, mock data for local testing, and later integrate live data from the **NOAA API**. Collaboration is managed using **GitHub**, and deployment is done via **Azure App Service**.

## Table of Contents
- [Development Environment Setup](#development-environment-setup)
- [Creating Mock Data for Local Testing](#creating-mock-data-for-local-testing)
- [Running the Application Locally with Mock Data](#running-the-application-locally-with-mock-data)
- [Switching to Real API Data](#switching-to-real-api-data)
- [Collaboration and Deployment](#collaboration-and-deployment)
- [Alternative Directions for non-initial commits](#alternative-directions-for-non-initial-commits)

---

## Development Environment Setup

### 1. Install Node.js and npm
Node.js is required to run a React application. Follow these steps:

- Download and install Node.js from [https://nodejs.org/](https://nodejs.org/) (select the **LTS version**).
- Verify that Node.js and npm are installed by running the following commands in your terminal:
  ```bash
  node -v
  npm -v
  ```

### 2. Install Git
You need Git for version control and collaboration:
- Download Git from [https://git-scm.com/downloads](https://git-scm.com/downloads) and install it.
- During the installation process, make sure to select the option "Add Git to your PATH" so that you can run Git commands from the terminal.
- Verify that Git is installed by running:
```bash
git --version
```

### 3. Create a React Project
Now, create the React application:
- Open your terminal or command prompt.
- Create a new React app by running the following command:
```bash
npx create-react-app wv-temperature-map
```
- Navigate to the project folder:
``` bash
cd wv-temperature-map
```

### 4. Install Required Libraries
We’ll use React-Leaflet for map rendering and Axios for future API requests.
- Install react-leaflet and leaflet:
``` bash
npm install react-leaflet leaflet
```
- Install axios for future API integration:
```bash
npm install axios
```

## Creating Mock Data for Local Testing
We’ll start by using mock data to test the application locally without requiring API calls.

### 1. Create the Map Component
In the src directory, create a new file called MapComponent.js:
```jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ temperatures }) => {
  const center = [38.5976, -80.4549]; // Center of WV

  return (
    <MapContainer center={center} zoom={7} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {temperatures.map((temp, index) => (
        <Marker key={index} position={[temp.lat, temp.lon]}>
          <Popup>
            {temp.name}: {temp.temperature}°F
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
```
## 2. Update the App.js File to Use Mock Data
Replace the content in App.js with the following code to use mock data instead of fetching from an API:
```jsx
import React, { useState } from 'react';
import MapComponent from './MapComponent';

function App() {
  // Mock data for testing
  const mockData = [
    { lat: 38.3498, lon: -81.6326, name: 'Charleston', temperature: 72 },
    { lat: 39.6295, lon: -79.9559, name: 'Morgantown', temperature: 68 },
    { lat: 37.7782, lon: -81.1855, name: 'Beckley', temperature: 70 },
    { lat: 39.264, lon: -80.239, name: 'Clarksburg', temperature: 65 },
    { lat: 39.3417, lon: -77.7311, name: 'Harpers Ferry', temperature: 67 },
    { lat: 37.2695, lon: -81.2224, name: 'Bluefield', temperature: 66 },
  ];

  const [temperatures] = useState(mockData); // Use mock data

  return (
    <div className="App">
      <h1>Recent Temperatures in West Virginia (Mock Data)</h1>
      <MapComponent temperatures={temperatures} />
    </div>
  );
}

export default App;
```

## Running the Application Locally with Mock Data
Once you've set up the mock data, you can test the app locally.

### 1. Start the Development Server
In your project directory, run the following command:

```bash
npm start
```
This will start a development server, and the application will be available at [http://localhost:3000](http://localhost:3000).

### 2. View the App in Your Browser
Open your browser and go to [http://localhost:3000](http://localhost:3000). You should see a map of West Virginia with markers at the specified mock data locations, each displaying the temperature when clicked.

## Switching to Real API Data
Once you’re ready to replace the mock data with real NOAA data, follow these steps.

### 1. Update App.js to Fetch Real Data
Replace the mock data logic with an API call using Axios:

```jsx
import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import axios from 'axios';

function App() {
  const [temperatures, setTemperatures] = useState([]);

  useEffect(() => {
    const fetchTemperatures = async () => {
      try {
        const response = await axios.get('https://api.noaa.gov/temperature-wv'); // Replace with actual API URL
        setTemperatures(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTemperatures();
  }, []);

  return (
    <div className="App">
      <h1>Recent Temperatures in West Virginia</h1>
      <MapComponent temperatures={temperatures} />
    </div>
  );
}

export default App;
```

### 2. Install Axios if Needed
If you haven't installed Axios yet, do so by running:

```bash
npm install axios
```

## Collaboration and Deployment
Set Up GitHub for Collaboration
### 1. Initialize Git
- Initialize Git in your project directory:

```bash
git init
```
### 2. Set Up Your Git Identity
- Run these commands to set your global Git username and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Create a GitHub Repository
- Go to GitHub and create a new repository.
- Add the remote GitHub repository URL to your local project:

```bash
git remote add origin <repository-url>
```

### 4. Push Your Project to GitHub
```bash
git add .
git commit -m "Initial commit"
git push -u origin master
```

Create a Pull Request
- Create a new branch for your feature:
```bash
git checkout -b feature-branch
```

- Once your work is done, push the branch to GitHub:

```bash
git add .
git commit -m "Feature: Add new functionality"
git push origin feature-branch
```
- On GitHub, create a Pull Request to merge the feature branch into the main branch.

### 3. Deploy to Azure App Service
- Log into the Azure Portal.
- Create a new App Service and select Node.js as the runtime.
- Link your GitHub repository for continuous deployment.

## Alternative Directions for non-initial commits
If you were not the one to make the initial commit to the repository, follow these steps to clone the project and start developing in your own branch.

### 1. Clone the GitHub Repository
- Get the URL of the repository from GitHub. The URL will look something like this:
```arduino
https://github.com/username/wv-temperature-map.git
```
- Open a terminal or command prompt and navigate to the directory where you want to store the project.

- Clone the repository by running:

```bash
git clone https://github.com/username/wv-temperature-map.git
```
This will download the project to your local machine.

### 2. Navigate into the Project Directory
After cloning, change into the project directory:

```bash
cd wv-temperature-map
```

### 3. Create a New Branch
To avoid making changes directly to the main branch, you should create a new branch for the feature or task you are working on.

- Create a new branch with a descriptive name:

```bash
git checkout -b my-feature-branch
```
- Replace "my-feature-branch" with a meaningful name, such as add-map-functionality or fix-temperature-bug.

### 4. Install Dependencies
Before you start development, make sure to install all the required dependencies. This only needs to be done once after cloning the repo:

```bash
npm install
```

### 5. Start Developing
You are now on your own feature branch and can start developing. Make sure to run the project locally using:

```bash
npm start
```
This will start the development server, and you can view the app at [http://localhost:3000](http://localhost:3000).

### 6. Committing Changes
After making changes, add and commit them to your local branch:

```bash
git add .
git commit -m "Description of the changes you made"
```

### 7. Push Your Branch to GitHub
Once your changes are committed locally, push them to the GitHub repository:

```bash
git push origin my-feature-branch
```
This will push your branch to GitHub where the rest of the team can see and review your changes.

### 8. Create a Pull Request
- Go to the GitHub repository in your browser.
- Click on the Pull Requests tab.
- Click New Pull Request.
- Select your branch as the "compare" branch and the main branch as the "base" branch.
- Submit the pull request with a description of the changes.
Once the pull request is approved and merged, your changes will be part of the main project!

### 9. Keeping Your Branch Up-to-Date
If others are working on the project, you may want to pull the latest changes from the main branch to keep your branch up-to-date:

- Fetch the latest changes:
```bash
git fetch origin
```
- Merge the changes from main into your branch:
```bash
git merge origin/main
```
- Resolve any merge conflicts if necessary, and push your updated branch to GitHub.
