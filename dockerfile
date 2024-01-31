# Stage 1: Build the Angular application
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json /app/

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the project files into the docker image
COPY . /app

# Build the project for production
RUN npm run build --prod

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build /app/dist/nomad-go-fe/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
