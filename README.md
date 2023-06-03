# Simeon Zhelev's Developsoft recruitment task

## Project introduction :

### This is a monorepo of a server and client functionality about displaying and modifying Devices connected to a server's Hubs

### The Frontend portion resides in the folder 'client', while the backend is in the folder 'server'

#### Technologies used for Frontend - React, TailwindCSS

#### Technologies used for Backend - NestJS with Express server, TypeORM, Postgres, Docker

## How to run this project ?

### 1. Install Docker (Docker Desktop recommended) - [https://docs.docker.com/desktop/install/windows-install/]

### 2. Add the provided env variables to the server and client's root directories in designated .env files

### 3. Open a terminal in the server folder and use docker-compose to pull the image of Postgres and create the database "`docker-compose up -d`"

### 4. While your terminal is in the server directory, install the backend's dependencies and launch the project : `npm i` followed by `npm run start:dev`. You should see the server establishing a connection to the database and running an initial seed.

### 5. Open a new terminal in the client's directory, install the dependencies and launch the project : `npm i` followed by `npm start`

### 6. Enjoy!
