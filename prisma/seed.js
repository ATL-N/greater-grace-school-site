import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password@123", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@school.com" },
    update: {
      password: hashedPassword,
    },
    create: {
      email: "admin@school.com",
      password: hashedPassword,
      name: "Admin",
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
