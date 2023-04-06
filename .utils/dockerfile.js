/**
 * Todo.
 *
 * @description Todo.
 */

import { writeFileSync } from 'fs'
import { join }          from 'path'
import { pkg }           from './getPkg.js'

const content = `####################### PIGEONPOSSE DOCKERFILE ######################

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

# Expose port ${pkg.data.extra.devPort} for the app to listen on
EXPOSE ${pkg.data.extra.devPort}

# Start the app
CMD ["pnpm", "start"]

####################### PIGEONPOSSE DOCKERFILE #######################
` 

const file = join( pkg.dir, 'Dockerfile' )

export const dockerfile = () => {

	writeFileSync( file, content, 'utf-8' )

}
