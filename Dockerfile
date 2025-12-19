# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk update && \
    apk add --no-cache postgresql-client curl && \
    rm -rf /var/cache/apk/*

# Copy package files
COPY package*.json ./

# Install ALL dependencies (not just production)
RUN npm ci && \
    npm cache clean --force

# Copy Prisma files
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts

# Set a dummy DATABASE_URL for build time (Prisma needs this to generate the client)
# The real DATABASE_URL will be provided at runtime via docker-compose
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Generate Prisma client
RUN npx prisma generate

# Copy rest of source code
COPY . .

# Build the Next.js application
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install runtime dependencies
RUN apk update && \
    apk add --no-cache postgresql-client curl dumb-init && \
    rm -rf /var/cache/apk/*

# Copy package files for runtime dependencies
COPY package*.json ./

# Install production dependencies (needed for Prisma and socket server)
RUN npm ci --only=production && \
    npm cache clean --force

# Copy Prisma files and config
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# CRITICAL: Copy standalone server files
COPY --from=builder /app/.next/standalone ./

# CRITICAL: Copy static files into the standalone directory structure
COPY --from=builder /app/.next/static ./.next/static

# CRITICAL: Copy public folder
COPY --from=builder /app/public ./public

# Copy entrypoint
COPY entrypoint.sh ./entrypoint.sh

# Make entrypoint executable
RUN chmod +x ./entrypoint.sh

# Expose ports
EXPOSE 3000
EXPOSE 8080

# Use dumb-init
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Run the application
CMD ["./entrypoint.sh"]
