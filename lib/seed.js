import { PrismaClient } from "@prisma/client";
import { dummyContacts } from "./dummyData.js";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    dummyContacts.map(async (contact) => {
      await prisma.contact.upsert({
        where: {
          id: contact.id,
        },
        update: contact,
        create: contact,
      });
    }),
  );
}
async function main() {
  await Promise.all(
    dummyLeads.map(async (lead) => {
      await prisma.lead.upsert({
        where: {
          id: lead.id,
        },
        update: lead,
        create: lead,
      });
    }),
  );
}

main()
  .then(async () => {
    console.log("Seeding completed successfully 🚀");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
