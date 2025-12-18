import prisma from '../lib/db.js';
import bcrypt from 'bcryptjs';

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin',
      password: hashedPassword,
      name: 'Admin',
    },
  });

  console.log(`Admin user seeded: ${adminUser.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
