#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  echo "Loading environment variables from .env file..."
  export $(grep -v '^#' .env | xargs)
fi

# 1. Wait for the database to be ready
# We use the DB_HOST from the environment, which is set to 'ggca-db' in docker-compose
echo "Waiting for database to be ready at host: $DB_HOST"
export PGPASSWORD="$DB_PASSWORD"
ATTEMPTS=0
MAX_ATTEMPTS=20
while ! psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q' > /dev/null 2>&1;
do
  ATTEMPTS=$((ATTEMPTS + 1))
  if [ "$ATTEMPTS" -ge "$MAX_ATTEMPTS" ]; then
    echo "Database is not ready after $MAX_ATTEMPTS attempts. Exiting."
    exit 1
  fi
  echo "Database is not ready. Retrying in 3 seconds..."
  sleep 3
done
echo "Database is ready."
unset PGPASSWORD

# 2. Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# 3. Run the database seed script
echo "Running database seed..."
npx prisma db seed

# 4. Start the Next.js application
echo "Starting Next.js application..."
npm start
