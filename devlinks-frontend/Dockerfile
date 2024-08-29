# Use the official Node.js image as a base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5173 (default port for Vite development server)
EXPOSE 5173

# Command to run Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
