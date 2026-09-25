import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be configured before seeding')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  })
  const oldAdmin = await prisma.user.findUnique({
    where: { email: 'admin@karmveer.studio' },
  })

  const admin = existingAdmin
    ? await prisma.user.update({
        where: { id: existingAdmin.id },
        data: { password: hashedPassword },
      })
    : oldAdmin
      ? await prisma.user.update({
          where: { id: oldAdmin.id },
          data: {
            email,
            password: hashedPassword,
          },
        })
      : await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name: 'Karmveer Kumar',
          },
        })

  console.log('Created admin user:', admin.email)

  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      studioName: 'Karmveer Studio',
      ownerName: 'Karmveer Kumar',
      email: 'contact@karmveer.studio',
      instagram: 'editwithkarmveer',
      availability: 'AVAILABLE FOR SELECTED PROJECTS',
    },
  })

  console.log('Created site settings')
  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
