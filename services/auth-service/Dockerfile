FROM node:20-slim

WORKDIR /app

# Install Prisma CLI globally and OpenSSL
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/* && npm install -g prisma

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies (including dev dependencies for Prisma)
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY src ./src

# Build the application
RUN npm run build

# Expose port
EXPOSE 3002

# Start the application
CMD ["npm", "run", "start"]

