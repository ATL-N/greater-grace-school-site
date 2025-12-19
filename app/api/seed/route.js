import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET(request) {
  // IMPORTANT: Protect this route from being run in production
  // if (process.env.NODE_ENV === 'production') {
  //   return NextResponse.json({ message: 'Seeding is disabled in production.' }, { status: 403 });
  // }

  try {
    const hashedPassword = await bcrypt.hash('password@123', 10);

    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@school.com' },
      update: {
        password: hashedPassword,
      },
      create: {
        email: 'admin@school.com',
        password: hashedPassword,
        name: 'Admin',
      },
    });

    console.log('Seeding successful. Admin user created or updated.');
    return NextResponse.json({ message: 'Seeding successful!', user: adminUser });

  } catch (error) {
    console.error('Seeding failed:', error);
    return NextResponse.json({ message: 'Seeding failed.', error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
