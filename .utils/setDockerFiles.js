/**
 * Todo.
 *
 * @description Todo.
 */

import { writeFileSync } from 'fs'
import { join }          from 'path'
import { pkg }           from './getPkg.js'

const dockerfile = `########################### PIGEONPOSSE DOCKERFILE ###########################

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

# Expose port ${pkg.data.extra.devPort} for the app to listen on
EXPOSE ${pkg.data.extra.devPort}

# Start the app
CMD ["pnpm", "start"]

########################### PIGEONPOSSE DOCKERFILE ###########################` 

const envsObj = pkg.data.extra.envs
const envs    = {
	name : '${' + envsObj.containerName.name + ':-' + envsObj.containerName.defaultValue + '}',
	port : '${' + envsObj.containerPort.name + ':-' + envsObj.containerPort.defaultValue + '}',
}

const dockerComposeDev = `######################### PIGEONPOSSE DOCKER-COMPOSE-DEV ########################
#
# BUILD REPO IN DOCKER WITH DOCKER COMPOSE 
# 
# @description File for build and run project with Docker.
#              you can use npm script 'docker-compose-dev' for run or
#              use cli '${pkg.data.scripts['docker-compose-dev']}'
###############################################################################

version: "3.8"


###############################################################################
# SERVICES
###############################################################################

services:          

  #############################################################################
  # RUN DOCKER IMAGE WITH DOCKERFILE
  #############################################################################
  
  ${pkg.data.name}:

    container_name: ${envs.name}
    build: .
    ports:
      - '${envs.port}:${pkg.data.extra.devPort}'
    restart: always


######################### PIGEONPOSSE DOCKER-COMPOSE-DEV ########################`

const dockerCompose = `########################## PIGEONPOSSE DOCKER-COMPOSE #########################
#
# PIGEON WEB IMAGE
# 
# @description Run latest docker image with docker-compose.
#              Easy to use.
# @usage       ${pkg.data.scripts['docker-compose-dev']}
# @link        https://hub.docker.com/r/pigeonposse/pigeon-web/
# @link        https://gethomepage.dev/en/installation/docker/
###############################################################################

version: "3.8"


###############################################################################
# SERVICES
###############################################################################

services:          

  #############################################################################
  # RUN DOCKER IMAGE WITH DOCKERFILE
  #############################################################################
  
  ${pkg.data.name}:

    container_name: ${envs.name}
    image: pigeonposse/${pkg.data.name}:latest
    ports:
      - '${envs.port}:${pkg.data.extra.devPort}'
    restart: always


########################## PIGEONPOSSE DOCKER-COMPOSE #########################`

export const setDockerFiles = () => {

	writeFileSync( join( pkg.dir, 'Dockerfile' ), dockerfile, 'utf-8' )
	writeFileSync( join( pkg.dir, 'docker-compose.yml' ), dockerCompose, 'utf-8' )
	writeFileSync( join( pkg.dir, 'docker-compose-dev.yml' ), dockerComposeDev, 'utf-8' )

}
