const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const skills = [
    { name: 'Web Development', status: 'approved' },
    { name: 'Graphic Design', status: 'approved' },
    { name: 'Data Analysis', status: 'approved' },
    { name: 'Public Speaking', status: 'approved' },
    { name: 'Digital Marketing', status: 'approved' },
    { name: 'Copywriting', status: 'approved' },
    { name: 'Photography', status: 'approved' }
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill
    });
  }
  console.log('Skills seeded!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
