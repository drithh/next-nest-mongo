# Use the official Node.js image based on Alpine as a base image
FROM node:21-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Use a new stage for the final image
FROM node:21-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the build files from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "dist/src/main.js"]