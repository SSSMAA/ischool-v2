import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')
  
  // Clean existing data
  await prisma.user.deleteMany()
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ischool.com',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'ADMIN',
    },
  })
  
  console.log('Created admin user:', admin.email)
  
  // Create sample teachers
  const teacher1 = await prisma.user.create({
    data: {
      email: 'teacher1@ischool.com',
      password: await bcrypt.hash('teacher123', 10),
      name: 'John Smith',
      role: 'TEACHER',
    },
  })
  
  const teacher2 = await prisma.user.create({
    data: {
      email: 'teacher2@ischool.com',
      password: await bcrypt.hash('teacher123', 10),
      name: 'Jane Doe',
      role: 'TEACHER',
    },
  })
  
  console.log('Created teachers:', teacher1.email, teacher2.email)
  
  // Create sample students
  const students = await Promise.all([
    prisma.user.create({
      data: {
        email: 'student1@ischool.com',
        password: await bcrypt.hash('student123', 10),
        name: 'Alice Johnson',
        role: 'STUDENT',
      },
    }),
    prisma.user.create({
      data: {
        email: 'student2@ischool.com',
        password: await bcrypt.hash('student123', 10),
        name: 'Bob Wilson',
        role: 'STUDENT',
      },
    }),
  ])
  
  console.log(`Created ${students.length} students`)
  
  console.log('Seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })