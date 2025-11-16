# Production Dockerfile for Railway
FROM node:22.19.0-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies (skip husky prepare script)
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Copy application source
COPY . .

# Build application
RUN npm run build

# Remove dev dependencies and source files
RUN rm -rf src test node_modules
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Expose port
EXPOSE 3000

# Start application directly (no wait-for-it needed - Railway uses external DB)
CMD ["node", "dist/main.js"]
