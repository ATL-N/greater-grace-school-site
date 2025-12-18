#!/bin/sh

# Run Prisma migrations
npx prisma migrate deploy

# Run the database seed script
# This is safe to run multiple times because the script uses `upsert`
echo "Running database seed..."
npm run db:seed

# Start the Next.js application
echo "Starting application..."
npm start
