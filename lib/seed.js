import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "admin",
    },
  });

  console.log({ admin });

  // Create regular user
  const userPassword = await hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "Regular User",
      email: "user@example.com",
      password: userPassword,
      role: "user",
    },
  });

  console.log({ user });

  // Create companies
  const companies = await Promise.all([
    prisma.company.upsert({
      where: { id: "company-1" },
      update: {},
      create: {
        id: "company-1",
        name: "Acme Inc",
        industry: "Technology",
        location: "New York, NY",
        employees: "100-500",
        revenue: "$10M-$50M",
        website: "https://acme.example.com",
        userId: admin.id,
      },
    }),
    prisma.company.upsert({
      where: { id: "company-2" },
      update: {},
      create: {
        id: "company-2",
        name: "TechCorp",
        industry: "Software",
        location: "San Francisco, CA",
        employees: "50-100",
        revenue: "$5M-$10M",
        website: "https://techcorp.example.com",
        userId: admin.id,
      },
    }),
    prisma.company.upsert({
      where: { id: "company-3" },
      update: {},
      create: {
        id: "company-3",
        name: "Global Solutions",
        industry: "Consulting",
        location: "Chicago, IL",
        employees: "500-1000",
        revenue: "$50M-$100M",
        website: "https://globalsolutions.example.com",
        userId: admin.id,
      },
    }),
  ]);

  console.log({ companies });

  // Create contacts
  const contacts = await Promise.all([
    prisma.contact.upsert({
      where: { id: "contact-1" },
      update: {},
      create: {
        id: "contact-1",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@example.com",
        phone: "(555) 123-4567",
        status: "Active",
        userId: admin.id,
        companyId: "company-1",
      },
    }),
    prisma.contact.upsert({
      where: { id: "contact-2" },
      update: {},
      create: {
        id: "contact-2",
        firstName: "Michael",
        lastName: "Chen",
        email: "michael@example.com",
        phone: "(555) 987-6543",
        status: "Active",
        userId: admin.id,
        companyId: "company-2",
      },
    }),
    prisma.contact.upsert({
      where: { id: "contact-3" },
      update: {},
      create: {
        id: "contact-3",
        firstName: "Emma",
        lastName: "Williams",
        email: "emma@example.com",
        phone: "(555) 456-7890",
        status: "Inactive",
        userId: admin.id,
        companyId: "company-3",
      },
    }),
    prisma.contact.upsert({
      where: { id: "contact-4" },
      update: {},
      create: {
        id: "contact-4",
        firstName: "James",
        lastName: "Brown",
        email: "james@example.com",
        phone: "(555) 789-0123",
        status: "Active",
        userId: admin.id,
        companyId: "company-1",
      },
    }),
    prisma.contact.upsert({
      where: { id: "contact-5" },
      update: {},
      create: {
        id: "contact-5",
        firstName: "Olivia",
        lastName: "Martinez",
        email: "olivia@example.com",
        phone: "(555) 234-5678",
        status: "Active",
        userId: admin.id,
        companyId: "company-2",
      },
    }),
  ]);

  console.log({ contacts });

  // Create leads
  const leads = await Promise.all([
    prisma.lead.upsert({
      where: { id: "lead-1" },
      update: {},
      create: {
        id: "lead-1",
        name: "John Smith",
        company: "Innovative Tech",
        email: "john@innovativetech.com",
        phone: "(555) 111-2222",
        source: "Website",
        status: "New",
        score: 80,
        userId: admin.id,
      },
    }),
    prisma.lead.upsert({
      where: { id: "lead-2" },
      update: {},
      create: {
        id: "lead-2",
        name: "Lisa Wong",
        company: "Future Solutions",
        email: "lisa@futuresolutions.com",
        phone: "(555) 333-4444",
        source: "Referral",
        status: "Contacted",
        score: 65,
        userId: admin.id,
      },
    }),
    prisma.lead.upsert({
      where: { id: "lead-3" },
      update: {},
      create: {
        id: "lead-3",
        name: "Robert Johnson",
        company: "Enterprise Inc",
        email: "robert@enterprise.com",
        phone: "(555) 555-6666",
        source: "Trade Show",
        status: "Qualified",
        score: 90,
        userId: admin.id,
      },
    }),
  ]);

  console.log({ leads });

  // Create opportunities
  const opportunities = await Promise.all([
    prisma.opportunity.upsert({
      where: { id: "opportunity-1" },
      update: {},
      create: {
        id: "opportunity-1",
        name: "Enterprise Software Deal",
        value: 75000,
        stage: "Discovery",
        probability: 30,
        expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        userId: admin.id,
        contactId: "contact-1",
        companyId: "company-1",
      },
    }),
    prisma.opportunity.upsert({
      where: { id: "opportunity-2" },
      update: {},
      create: {
        id: "opportunity-2",
        name: "Consulting Project",
        value: 45000,
        stage: "Proposal",
        probability: 60,
        expectedCloseDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        userId: admin.id,
        contactId: "contact-2",
        companyId: "company-2",
      },
    }),
    prisma.opportunity.upsert({
      where: { id: "opportunity-3" },
      update: {},
      create: {
        id: "opportunity-3",
        name: "Software Implementation",
        value: 120000,
        stage: "Negotiation",
        probability: 80,
        expectedCloseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        userId: admin.id,
        contactId: "contact-3",
        companyId: "company-3",
      },
    }),
  ]);

  console.log({ opportunities });

  // Create tasks
  const tasks = await Promise.all([
    prisma.task.upsert({
      where: { id: "task-1" },
      update: {},
      create: {
        id: "task-1",
        title: "Follow up with Sarah",
        description: "Discuss the new proposal",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        priority: "High",
        status: "Pending",
        userId: admin.id,
        contactId: "contact-1",
      },
    }),
    prisma.task.upsert({
      where: { id: "task-2" },
      update: {},
      create: {
        id: "task-2",
        title: "Send contract to Michael",
        description: "Finalize the agreement",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        priority: "High",
        status: "Pending",
        userId: admin.id,
        contactId: "contact-2",
      },
    }),
    prisma.task.upsert({
      where: { id: "task-3" },
      update: {},
      create: {
        id: "task-3",
        title: "Research competitor pricing",
        description: "Compare our pricing with competitors",
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        priority: "Medium",
        status: "Pending",
        userId: admin.id,
      },
    }),
    prisma.task.upsert({
      where: { id: "task-4" },
      update: {},
      create: {
        id: "task-4",
        title: "Prepare presentation for client",
        description: "Create slides for the upcoming meeting",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        priority: "Medium",
        status: "In Progress",
        userId: admin.id,
        opportunityId: "opportunity-1",
      },
    }),
  ]);

  console.log({ tasks });

  // Create custom fields
  const customFields = await Promise.all([
    prisma.customField.upsert({
      where: { id: "custom-field-1" },
      update: {},
      create: {
        id: "custom-field-1",
        name: "LinkedIn Profile",
        type: "Text",
        entity: "contacts",
        required: false,
        options: [],
      },
    }),
    prisma.customField.upsert({
      where: { id: "custom-field-2" },
      update: {},
      create: {
        id: "custom-field-2",
        name: "Lead Source",
        type: "Dropdown",
        entity: "leads",
        required: true,
        options: ["Website", "Referral", "Trade Show", "Social Media", "Other"],
      },
    }),
    prisma.customField.upsert({
      where: { id: "custom-field-3" },
      update: {},
      create: {
        id: "custom-field-3",
        name: "Deal Size Category",
        type: "Dropdown",
        entity: "opportunities",
        required: false,
        options: [
          "Small (<$10k)",
          "Medium ($10k-$50k)",
          "Large ($50k-$100k)",
          "Enterprise (>$100k)",
        ],
      },
    }),
  ]);

  console.log({ customFields });
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
