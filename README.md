# Maplinker 

Maplinker an Openlayers map application for visualising merged data using Geoconnect RestFul API based on OGC TJS.

## Build and Run the Dockerized React App

### Step 1: Build the Docker Image
Open a terminal in the root of your project (where the `Dockerfile` is located) and run the following command to build the Docker image:

```bash
docker build -t my-react-app .
```

This command will:
1. **Use the Node.js environment**: The Dockerfile specifies Node.js as the environment to build your React app.
2. **Build the React app**: It installs dependencies and runs the build process (`yarn build`).
3. **Package the app with Nginx**: The built React app is then copied into a lightweight Nginx container, which will serve the app.

### Step 2: Run the Docker Container
After the image is built, run the container with the following command:

```bash
docker run -p 80:80 my-react-app
```

This command will:
1. **Start the container**: Launch the container with your React app served via Nginx.
2. **Bind ports**: Bind port `80` of your local machine to port `80` inside the container, where Nginx is serving the app.

### Step 3: Access the React App
Open your browser and navigate to:

```
http://localhost
```

You should now see your React app running.

### Notes:
- **Modify the port**: If you want to run the app on a different port (e.g., port `3000`), you can do so by modifying the `-p` flag:

  ```bash
  docker run -p 3000:80 my-react-app
  ```

  In this case, the app would be accessible at `http://localhost:3000`.

