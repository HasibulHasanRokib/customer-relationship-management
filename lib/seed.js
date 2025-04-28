import { PrismaClient } from "@prisma/client";
import {
  dummyContacts,
  dummyLeads,
  dummyDeals,
  dummyTasks,
} from "./dummyData.js";

const prisma = new PrismaClient();

async function main() {
  // Insert Contacts
  await Promise.all(
    dummyContacts.map(async (contact) => {
      await prisma.contact.upsert({
        where: {
          email:
            contact.email ||
            `${contact.firstName}.${contact.lastName}@example.com`,
        },
        update: contact,
        create: contact,
      });
    }),
  );

  // Insert Leads
  await Promise.all(
    dummyLeads.map(async (lead) => {
      await prisma.lead.upsert({
        where: {
          email: lead.email || `${lead.name.split(" ").join(".")}@example.com`,
        },
        update: lead,
        create: lead,
      });
    }),
  );

  // Insert Deals
  await Promise.all(
    dummyDeals.map(async (deal) => {
      await prisma.deals.create({
        data: deal,
      });
    }),
  );

  // Insert Tasks
  await Promise.all(
    dummyTasks.map(async (task) => {
      await prisma.task.create({
        data: task,
      });
    }),
  );
}

main()
  .then(async () => {
    console.log("Seeding completed 🚀");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
