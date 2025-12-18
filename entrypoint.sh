#!/bin/sh

# Run Prisma migrations
npx prisma migrate deploy

# Start the Next.js application
npm start
