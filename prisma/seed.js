import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const adminData = [
  {
    name: 'Admin',
    email: 'admin@prisma.io',
    password: '$2a$10$imHKcpsYGr4Wfe42.38TwOHS9ZIY4zE0pSgusCI7bINN8h2xfvQle',
  },
];
const providerData = [
  {
    name: 'Ahmed',
    email: 'google@prisma.io',
    phone: '0123456789',
    password: '$2a$10$imHKcpsYGr4Wfe42.38TwOHS9ZIY4zE0pSgusCI7bINN8h2xfvQle',
  },
  {
    name: 'Abdelwahab',
    email: 'facebook@prisma.io',
    phone: '+20123456789',
    password: '$2a$10$imHKcpsYGr4Wfe42.38TwOHS9ZIY4zE0pSgusCI7bINN8h2xfvQle',
  },
];

const customerData = [
  {
    name: 'customer 1',
    email: 'google@prisma.io',
    phone: '0123456789',
    password: '$2a$10$imHKcpsYGr4Wfe42.38TwOHS9ZIY4zE0pSgusCI7bINN8h2xfvQle',
  },
  {
    name: 'Abdelwahab_customer',
    email: 'facebook@prisma.io',
    phone: '+20123456789',
    password: '$2a$10$imHKcpsYGr4Wfe42.38TwOHS9ZIY4zE0pSgusCI7bINN8h2xfvQle',
  },
];

const serviceData = [
  {
    name: 'Service 1',
    description: 'Description 1',
  },
  {
    name: 'Service 2',
    description: 'Description 2',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const a of adminData) {
    const admin = await prisma.admin.create({
      data: a,
    });
    console.log(`Created admin with id: ${admin.id}`);
  }

  for (const p of providerData) {
    const provider = await prisma.provider.create({
      data: p,
    });
    console.log(`Created provider with id: ${provider.id}`);
  }
  for (const p of customerData) {
    const customer = await prisma.customer.create({
      data: p,
    });
    console.log(`Created customer with id: ${customer.id}`);
  }
  for (const s of serviceData) {
    const service = await prisma.service.create({
      data: s,
    });
    console.log(`Created service with id: ${service.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
