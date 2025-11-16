# Production Dockerfile for Railway
FROM node:22.19.0-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install ALL dependencies first (including dev for build)
RUN npm ci --ignore-scripts && npm cache clean --force

# Copy application source
COPY . .

# Build application (needs @nestjs/cli from devDependencies)
RUN npm run build

# Remove dev dependencies and source files to reduce image size
RUN rm -rf src test
RUN npm prune --omit=dev

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/main.js"]
