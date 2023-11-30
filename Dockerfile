FROM node:16

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install 'cors' module
RUN npm install cors

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]