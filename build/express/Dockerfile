# Use a slim Node.js image as the base
FROM node:slim

# Set working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies using npm or yarn (skip installing, using volume, uncomment this to build)
# RUN npm install

# Copy your application code
COPY . .

# Expose the port your application uses (replace 3000 with your actual port)
EXPOSE 3000

# Start the application using CMD
CMD [ "npm", "start" ]

# Alternative: Start the application using ENTRYPOINT
# ENTRYPOINT [ "node", "index.js" ] (replace index.js with your main script)

# For testing instead use this command:
# docker run -p 3000:3000 -v .:/app -it node:slim tail -f /dev/null