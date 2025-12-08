FROM node:20-slim

WORKDIR /app

# Instalar OpenSSL (Prisma lo usa) y Prisma CLI
RUN apt-get update \
  && apt-get install -y openssl \
  && rm -rf /var/lib/apt/lists/* \
  && npm install -g prisma

# Copiar package.json y tsconfig
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm install

# Copiar esquema de Prisma
COPY prisma ./prisma

# Generar Prisma Client
RUN npx prisma generate

# Copiar el código fuente
COPY src ./src

# Build de Nest
RUN npm run build

# Exponer el puerto del notifications-service
EXPOSE 3004

# Comando de arranque
CMD ["npm", "run", "start"]
