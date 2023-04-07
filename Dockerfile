########################### PIGEONPOSSE DOCKERFILE ###########################

# Use the official Node.js 18 image as a base
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the container
COPY package.json .
COPY pnpm-lock.yaml .

# Install the dependencies using PNPM
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 61312 for the app to listen on
EXPOSE 61312

# Start the app
CMD ["pnpm", "start"]

########################### PIGEONPOSSE DOCKERFILE ###########################