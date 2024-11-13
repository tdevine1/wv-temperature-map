# WV Temperature Map Project Setup Guide
This tutorial will guide you through the entire setup process for the WV Temperature Map project. We’ll start by setting up VS Code to connect to GitHub, proceed with the frontend and backend setup, and finish by integrating both parts to run the application as a cohesive whole.

---
## Table of Contents
1. Setting Up VS Code with GitHub
2. Frontend Setup
3. Backend Setup
4. Integrating Frontend and Backend
5. Running the Complete Application
---

## 1. Setting Up VS Code with GitHub
To start developing with GitHub in VS Code, follow these steps to set up Git, connect to your GitHub repository, and clone the project.

### Step 1: Install Git
- Download Git from https://git-scm.com/downloads.
- Run the installer and select the option to Add Git to your PATH.
- Verify Installation: Open a terminal in VS Code and type:
```bash
git --version
```
### Step 2: Configure Git in VS Code
Open VS Code.
- Go to View > Command Palette (or press Ctrl+Shift+P / Cmd+Shift+P on Mac).
- Type Git: Clone and press Enter.
- Paste the repository URL:
```bash
https://github.com/tdevine1/wv-temperature-map
```
- Choose a location on your computer to save the project and click Open when cloning completes.
### Step 3: Set Up GitHub Authentication in VS Code
- Open Command Palette (Ctrl+Shift+P or Cmd+Shift+P) and type GitHub: Sign in.
- Follow the prompts to authenticate with GitHub.
- Once signed in, verify by typing:
```bash
git remote -v
```
- You should see the GitHub repository URL.
## 2. Frontend Setup
### Step 1: Install Node.js and npm
- Download and install Node.js from https://nodejs.org/ (use the LTS version).
- Verify the installation in your terminal:
```bash
node -v
npm -v
```
### Step 2: Set Up the React App
- In VS Code, navigate to the src folder.
- Run the following commands to install React and necessary dependencies:
```bash
npx create-react-app .
npm install react-router-dom react-leaflet leaflet axios
```
### Step 3: Configure the Frontend Components
Refer to the following structure for setting up each component:

- App.js: Manages authentication and routing between login/register and map pages.
- Login.js: A login form that authenticates users.
- Register.js: A registration form for new users.
- MapPage.js: Displays the map and logout option.
- MapComponent.js: Renders the Leaflet map and places markers.
- Important: Use the provided detailed documentation in each component to understand each part's purpose and function.

### Step 4: Run the Frontend
- In the terminal, navigate to the src folder.
- Start the React app:
```bash
npm start
```
- Open your browser and go to http://localhost:3000 to verify the frontend.

## 3. Backend Setup
In this section, we’ll set up the backend on VSCode, create and initialize an Azure SQL Database, configure VS Code to connect to the database, and set up the backend to use the Azure SQL connection.

### Step 1: Set Up a Node.js and Express Backend
- Create a folder in src called 'backend' with 2 subfolders called 'routes' and 'middleware'
- In the backend folder, initialize a Node.js project:
```bash
npm init -y
```
- Install dependencies:
```bash
npm install express mssql bcryptjs jsonwebtoken dotenv cookie-parser cors
```

### Step 2: Set Up an Azure SQL Database
- Create an Azure SQL Database on Azure (NOTE: For CS 330, your databases are already created)
	- Sign in to Azure Portal:
	- Go to https://portal.azure.com.
- Create a New Resource:
	- Search for SQL Database in the search bar.
	- Click Create under SQL Database.
- Configure Database Basics:
	- Subscription: Choose your Azure subscription.
	- Resource Group: Create a new resource group or use an existing one.
	- Database Name: Choose a unique name for your database (e.g., wv-temperature-db).
- Configure the Server:
	- Under Server, click Create new.
	- Server Name: Choose a unique name (e.g., wv-temperature-server).
	- Admin Username and Password: Enter credentials to manage your database.
	- Location: Select the closest location.
	- Click OK to create the server.
- Additional Settings:
	- Choose Use existing data or None for now.
	- Click Review + create, then Create to finalize the setup.
- Configure Firewall Settings
	- Once the SQL database is created, go to the Server settings (under SQL Databases, click on the server name).
	- Select Networking > Firewall and virtual networks.
	- Add your IP address to the Allow Azure services and resources to access this server section, enabling access to the database from your local machine.
	- Save your changes.
- Set Up a Sample Database Table
	- Go to the Query Editor in the Azure portal (under SQL databases > your database > Query editor).
	- Log in with the admin credentials you set earlier.
	- Run the following SQL command to create a Users table:
```sql
CREATE TABLE Users (
  id INT PRIMARY KEY IDENTITY,
  username NVARCHAR(50) NOT NULL,
  password NVARCHAR(255) NOT NULL
);
```
This table will store usernames and hashed passwords for authentication.

### Step 3: Connect to Azure SQL Database in VS Code
- Install the SQL Server Extension:
	- Open Extensions in VS Code (Ctrl+Shift+X or Cmd+Shift+X on Mac).
	- Search for mssql and install the SQL Server (mssql) extension by Microsoft.
- Connect to Azure SQL Database:
	- Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P) and type MS SQL: Connect.
	- Select Create Connection Profile.
	- Enter the following details:
		-Server Name: <your-server-name>.database.windows.net.
		-Database Name: The name of your database (e.g., wv-temperature-db).
		-Authentication Type: SQL Login.
		-Username: Admin username you created earlier.
		-Password: Admin password you set.
	- Save this profile to use it for future connections.
- Run Queries from VS Code:
	- In the SQL Server extension, you can run queries directly in VS Code to interact with your Azure SQL database. Right-click on the database name and select New Query to try it out.

### Step 4: Configure Database Connection in Backend
Now that the Azure SQL database is set up, we’ll configure our backend to connect to it using the mssql package.
- In the backend directory, create a file called .env and add your database credentials:
```env
DB_USER=<your-db-username>
DB_PASSWORD=<your-db-password>
DB_SERVER=<your-db-server>
DB_DATABASE=<your-database-name>
JWT_SECRET=<your-secret-key>
```
- Open (or create) a .gitignore file in the root of your project directory.
- Add the .env file to .gitignore so Git won’t track it:
```plaintext
# Environment variables
.env
```
- Save the .gitignore file. Now, Git will ignore the .env file and won’t include it in commits to keep it secret.
- Create a config.js file to connect to the database:
	- This file should include the database configuration and connectDB function as per config.js documentation.
- Test the connection by running the server:
```bash
node index.js
```
You should see “Connected to Azure SQL Database” in the console if the connection is successful.
### Step 5: Implement Authentication Routes
- In the routes folder, create auth.js to define the routes for registration and login.
- Set up bcrypt for hashing passwords and JWT for token-based authentication. Refer to the auth.js documentation for detailed route definitions.
### Step 6: Set Up Middleware
- In the middleware folder, create authMiddleware.js to verify JWT tokens and protect specific routes.
- Ensure protected routes include this middleware to check for a valid token before granting access.
### Step 7: Run the Backend
- In the terminal, navigate to the backend folder.
- Start the server:
```bash
node index.js
```
- Confirm the backend is running by checking for a “Server running on port” message in the terminal.

## 4. Integrating Frontend and Backend
### Step 1: Set Up CORS
- To allow the frontend to communicate with the backend, configure CORS in index.js:

```javascript
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
```
### Step 2: Modify Frontend API Requests
- In both Login.js and Register.js, update axios requests to include withCredentials:
```javascript
axios.post('http://localhost:5000/auth/login', { username, password }, { withCredentials: true })
```
- This enables the browser to send cookies, which are necessary for maintaining sessions with JWT.
### Step 3: Testing the Integration
- Start the Backend: In the terminal, navigate to backend and run node index.js.
- Start the Frontend: In the src directory, run npm start.
### Step 4: Access the Application
- Open http://localhost:3000 in your browser.
- Register a new user, log in, and verify that you can view the map and logout successfully.
	- For registration, send a username and password to /auth/register.
	- For login, send the same username and password to /auth/login to receive a JWT upon successful authentication.
- Confirm Data in Database:
	- After registering a new user, go back to VS Code or the Azure portal and query the Users table to see the new entry.
	- Run:
```sql
SELECT * FROM Users;
```
You should see the new user with their hashed password stored in the table.

## 5. Running the Complete Application
To run the full application with both frontend and backend:
- Start the backend:
```bash
cd backend
node index.js
```
- Start the frontend:
```bash
cd src
npm start
```
- Access the application at http://localhost:3000.

## Full Code Reference
- Frontend Components: Detailed documentation and code can be found in App.js, Login.js, Register.js, MapPage.js, and MapComponent.js.
- Backend Components: Refer to index.js, config.js, auth.js, and authMiddleware.js.