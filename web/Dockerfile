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

FROM node:21-alpine AS runner

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/.next/standalone ./
# COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/.next/static ./.next/static

CMD HOSTNAME="0.0.0.0" node server.js
