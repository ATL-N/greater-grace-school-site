#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

echo "=== Environment Variables Check ==="
echo "DB_HOST: ${DB_HOST}"
echo "DB_USER: ${DB_USER}"
echo "DB_NAME: ${DB_NAME}"

# 1. Wait for database host to be reachable
echo ""
echo "=== Checking network connectivity to database ==="
ATTEMPTS=0
MAX_ATTEMPTS=30

while ! nc -z "$DB_HOST" 5432 > /dev/null 2>&1; do
  ATTEMPTS=$((ATTEMPTS + 1))
  if [ "$ATTEMPTS" -ge "$MAX_ATTEMPTS" ]; then
    echo "ERROR: Cannot reach database host $DB_HOST:5432"
    exit 1
  fi
  echo "Waiting for $DB_HOST:5432... (Attempt $ATTEMPTS/$MAX_ATTEMPTS)"
  sleep 2
done

echo "✓ Database host is reachable!"

# 2. Wait for PostgreSQL to accept connections
echo ""
echo "=== Waiting for PostgreSQL to be ready ==="
export PGPASSWORD="$DB_PASSWORD"
ATTEMPTS=0
MAX_ATTEMPTS=30

while ! psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q' > /dev/null 2>&1; do
  ATTEMPTS=$((ATTEMPTS + 1))
  if [ "$ATTEMPTS" -ge "$MAX_ATTEMPTS" ]; then
    echo "ERROR: Cannot connect to database after $MAX_ATTEMPTS attempts"
    exit 1
  fi
  echo "Waiting for PostgreSQL to accept connections... (Attempt $ATTEMPTS/$MAX_ATTEMPTS)"
  sleep 2
done

echo "✓ PostgreSQL is ready and accepting connections!"
unset PGPASSWORD

# 3. Push the schema directly to the database
echo ""
echo "=== Pushing schema to database (starting fresh) ==="
npx prisma db push --accept-data-loss

# 4. Start the application
echo ""
echo "=== Starting Next.js application ==="
echo "Server starting on port $PORT..."
exec node server.js