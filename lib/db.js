import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis || window;

const getPrismaClient = () => {
  // The 'pg' library uses the same environment variables as Prisma (e.g., DATABASE_URL)
  // so we don't need to pass the connection string manually.
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({ adapter });
};

const prisma = globalForPrisma.prisma ?? getPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}