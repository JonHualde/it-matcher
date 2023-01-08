FROM node:18-slim

# Install openssl for prisma (M1 Macs)
RUN apt-get update
RUN apt-get install -y openssl

# create a work directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# Copy configuration files
COPY tsconfig.build.json ./
COPY tsconfig.json ./ 
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the app + generate prisma client
RUN npm run prisma:generate
RUN npm run build

# Expose port 8000
EXPOSE 8000

# Populate the database using prisma:create and start the server
ENTRYPOINT ["sh", "-c", "node dist/src/main.js"]


