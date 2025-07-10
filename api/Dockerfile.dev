# Use an official Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package files first (for faster rebuilds)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose API port
EXPOSE 3001

# Start in dev mode with nodemon
CMD ["npm", "run", "dev"]