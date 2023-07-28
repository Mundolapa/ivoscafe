# Step 1: Build the app in a node.js container

# Select the base image
FROM node:19 as build

# Set the working directory in the image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code to the working directory
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the app from an Nginx container

# Select the base image
FROM nginx:stable-alpine

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the nginx configuration file
# This step is optional: the configuration file is used to handle react-router's routing
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container is started
CMD ["nginx", "-g", "daemon off;"]
