########################### PIGEONPOSSE DOCKERFILE ###########################

# Use the official Node.js image as a base with tag (18-alpine)
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the container
COPY package.json .
COPY pnpm-lock.yaml .

# Install the dependencies using PNPM in silent mode
RUN npm i -q -g pnpm
RUN pnpm i -s

# Copy the rest of the application files to the container
COPY . .

# Expose port 61312 for the app to listen on
EXPOSE 61312

# Start the app
CMD ["pnpm", "start"]

########################### PIGEONPOSSE DOCKERFILE ###########################