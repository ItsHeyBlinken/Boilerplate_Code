import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  })

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
      role: Role.USER,
      emailVerified: new Date(),
    },
  })

  // Create sample posts
  await prisma.post.createMany({
    data: [
      {
        title: 'Welcome to Next.js Starter',
        content: 'This is your first post! Edit or delete it to get started.',
        published: true,
        authorId: admin.id,
      },
      {
        title: 'Getting Started with Next.js',
        content: 'Next.js is a React framework that gives you building blocks to create web applications.',
        published: true,
        authorId: user.id,
      },
      {
        title: 'Database Integration',
        content: 'This starter includes Prisma for database management and NextAuth.js for authentication.',
        published: false,
        authorId: admin.id,
      },
    ],
  })

  console.log('Database seeded successfully!')
  console.log('Admin user:', admin.email)
  console.log('Regular user:', user.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })