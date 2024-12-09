# Connecting to Your Headless Linux Server Using VSCode and Setting Up Your Project
Follow these steps to connect to your group's virtual machine (VM), clone your project repository, and run your application. The VM is preconfigured to run the frontend on port 3000 and the backend on port 5000.

## Step 1: Place the .pem File in the Correct Directory
	1. A .pem key file will be stored in your group’s Google Drive
	2. Save the .pem file (provided via Google Drive) to your local machine.
	3. Move the .pem file to your ~/.ssh directory

## Step 2: Test SSH Connection
	1. Open a terminal (not in VSCode) and test the SSH connection: 
	2. ssh azureuser@<VM-IP-ADDRESS> -i ~/.ssh/<your-key-file>.pem
		- Replace <VM-IP-ADDRESS> with your assigned server IP and <your-key-file>.pem with the name of your key file.
	3. If successful, you'll see a terminal prompt on the VM. If not, ensure: 
		- The IP address is correct.
		- Your .pem file is correctly set up in ~/.ssh.
		- You may need to copy the full path to your .pem on a Windows machine \
	1. Instead of ~/.ssh/ use “C:\Users\<your-username>\.ssh\<your-key-file>.pem”

## Step 3: Open VSCode
	1. Launch Visual Studio Code on your local machine.
	2. Ensure you have the Remote - SSH extension installed: 
		- Go to the Extensions pane (Ctrl+Shift+X).
		- Search for Remote - SSH and install it.

## Step 4: Add SSH Host in VSCode
	1. Open the Command Palette (Ctrl+Shift+P).
	2. Search for Remote-SSH: Connect to Host... and select it.
	3. Choose + Add New SSH Host.
	4. Enter the following command, replacing the placeholders with your details: 
	5. ssh azureuser@<VM-IP-ADDRESS> -i ~/.ssh/<your-key-file>.pem
	6. You should see a notification: "Host Added!" Dismiss this notification.

## Step 5: Connect to the VM
	1. Open the Command Palette (Ctrl+Shift+P) again.
	2. Search for Remote-SSH: Connect to Host... and select it.
	3. You will see a list of available SSH hosts. Select your VM's IP address.
	4. A new VSCode window will open, connected to your remote VM. ??

## Step 6: Clone Your Project Repository and Setup the Environment
	1. Open a terminal in the remote VSCode session (Terminal > New Terminal).
	2. Navigate to the directory where you'd like to clone the repository, e.g.: 
	1. cd ~
	3. Clone your repository from GitHub
	4. Navigate into your project directory
	5. Run your npm install commands where necessary (frontend, backend, root)
	6. Install any necessary python libraries
		- If you receive an error saying: error: externally-managed-environment, then run the pip command again with -–break-system-packages
	7. Test the system locally to prep for deployment

## Step 7: Build and Serve the Frontend
	1. Navigate to the frontend directory: 
	2. cd frontend
	3. Install dependencies: 
	4. npm install
	5. Build the frontend: 
	6. npm run build
	7. Serve the built frontend using the serve tool: 
	8. npx serve -s build -l 3000

## Step 8: Start the Backend
	1. Open a new terminal in the remote VSCode session.
	2. Navigate to the backend directory: 
	3. cd ~/wv-temperature-map/backend
	4. Install dependencies: 
	5. npm install
	6. Start the backend server: 
	7. node index.js

## Step 9: Access Your Application
	1. Open a web browser on your local machine.
	2. Visit the frontend by navigating to: 
	3. http://<VM-IP-ADDRESS>:3000
	4. Interact with your application and ensure that the frontend and backend communicate correctly.

### Notes:
	- Use Ctrl+C in the terminal to stop the frontend or backend servers.
	- Ensure the .env file for the backend is correctly configured with the database credentials provided.

