# Use the official Node.js image as a base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the TypeScript configuration file
COPY tsconfig.json ./

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build
# RUN npm run start

# Expose the port the app runs on
EXPOSE 8001

ENV NODE_ENV=production
ENV DATABASE_URL=postgres://postgres:mysecretpassword@host.docker.internal:5432/devlinks

# Command to run the application
CMD ["node", "dist/server.js"]
