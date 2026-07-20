# Use official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port Vite runs on (5173 by default)
EXPOSE 5173

# Start the Vite development server and expose it to the host network
CMD ["npm", "run", "dev", "--", "--host"]
