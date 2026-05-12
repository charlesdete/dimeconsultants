# Multi-stage Dockerfile for TanStack Start app

# Stage 1: Builder
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build for production
RUN npm run build

# Stage 2: Development (with hot reload)
FROM node:24-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]

# Stage 3: Production
FROM node:24-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["npm", "run", "preview"]
