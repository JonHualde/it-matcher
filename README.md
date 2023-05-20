# THE LIVE VERSION IS CURRENTLY NOT WORKING

The backend has been temporarily shut down.

# IT Matcher

Welcome to the IT Matcher project. This platform is designed to streamline the connection between IT professionals and businesses. Our main goal is to offer an intuitive, user-friendly interface with top-notch functionality that effectively bridges the gap in the IT industry.

## Setting up the Project for Development

Follow these steps to set up the project in your development environment:

 - Run `npm install` from the root folder `./` to install dependencies
 - `cd` into "./docker" and run `docker compose -f docker-compose.yml up` to create a local postgreSQL DB
 - Go to `./apps/api` and create a `./environment/.dev.env` file

Value of the .env file:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
UPLOAD_LOCATION_PICTURES="/uploads/pictures"
UPLOAD_LOCATION_ATTACHMENTS="/uploads/attachments"
MAX_FILE_SIZE=2000000
AWS_S3_BUCKET_NAME={{ ADD YOUR OWN BUCKET HERE }} // not needed in dev mode
JWT_KEY={{ ADD A CUSTOM TOKEN KEY HERE}}
NODE_ENV=dev
``` 
 - Run `prisma:create` from `./apps/api`
 - Go back to the root folder and run `npm run dev` to launch the project

# Architecture

## Packages

Packages contains the API (backend) and two web applications (admin and web).
The packages folder contains all reusable components, function, variables, etc... (inside ./packages/shared)

NextJS, Typescript and TailwindCSS have been used to create a custom component library and build the web applications.
NestJS has been used to build the API.
