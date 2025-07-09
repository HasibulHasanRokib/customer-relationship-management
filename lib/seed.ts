import { db } from "./prisma";

export async function seedDummyData(userId: string) {
  // 1. Create Contacts
  await db.contact.createMany({
    data: [
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: `ex${Math.random().toString(36).slice(2, 8)}@example.com`,
        phone: "555-1000",
        company: "TechCorp",
        userId,
      },
      {
        firstName: "Bob",
        lastName: "Smith",
        email: `ex+${Math.random().toString(36).slice(2, 8)}@example.com`,
        phone: "555-1001",
        company: "InnovateX",
        userId,
      },
      {
        firstName: "Carol",
        lastName: "Lee",
        email: `ex+${Math.random().toString(36).slice(2, 8)}@example.com`,
        phone: "555-1002",
        company: "CreativeLab",
        userId,
      },
      {
        firstName: "David",
        lastName: "Brown",
        email: `ex+${Math.random().toString(36).slice(2, 8)}@example.com`,
        phone: "555-1003",
        company: "FutureWorks",
        userId,
      },
      {
        firstName: "Eva",
        lastName: "Nguyen",
        email: `ex+${Math.random().toString(36).slice(2, 8)}@example.com`,
        phone: "555-1004",
        company: "NeoTech",
        userId,
      },
    ],
  });

  // 2. Create Leads
  await db.lead.createMany({
    data: [
      {
        name: "John Carter",
        company: "NextWave",
        email: `ex+${Math.random().toString(36).slice(2, 8)}@example.com`,
        phone: "555-2001",
        source: "Website",
        status: "NEW",
        userId,
      },
      {
        name: "Lara Dean",
        company: "Visionary",
        email: `ex+${Math.random().toString(36).slice(2, 8)}@example.com`,
        phone: "555-2002",
        source: "Referral",
        status: "CONTACTED",
        userId,
      },
      {
        name: "Sam Patel",
        company: "GlobalSoft",
        email: `ex+${Math.random().toString(36).slice(2, 8)}@example.com`,
        phone: "555-2003",
        source: "SocialMedia",
        status: "QUALIFIED",
        userId,
      },
      {
        name: "Nina O'Connor",
        company: "Infinitum",
        email: `ex+${Math.random().toString(36).slice(2, 8)}@example.com`,
        phone: "555-2004",
        source: "Email",
        status: "NEW",
        userId,
      },
      {
        name: "Peter Zhang",
        company: "BlueSky",
        email: `ex+${Math.random().toString(36).slice(2, 8)}@example.com`,
        phone: "555-2005",
        source: "TradeShow",
        status: "CONTACTED",
        userId,
      },
    ],
  });

  // 3. Create Deals,
  await db.deals.createMany({
    data: [
      {
        title: "Enterprise Software License",
        value: 50000,
        customer: "TechCorp",
        stage: "NEW",
        expectedClose: "2025-06-15T00:00:00.000Z",
        userId,
      },
      {
        title: "Cloud Migration Project",
        value: 75000,
        customer: "InnovateX",
        stage: "CONTACTED",
        expectedClose: "2025-06-30T00:00:00.000Z",
        userId,
      },
      {
        title: "Annual Consulting",
        value: 20000,
        customer: "CreativeLab",
        stage: "PROPOSAL",
        expectedClose: "2025-05-20T00:00:00.000Z",
        userId,
      },
      {
        title: "Security Audit",
        value: 15000,
        customer: "NeoTech",
        stage: "NEGOTIATION",
        expectedClose: "2025-05-25T00:00:00.000Z",
        userId,
      },
      {
        title: "Mobile App Development",
        value: 30000,
        customer: "FutureWorks",
        stage: "WON",
        expectedClose: "2025-05-01T00:00:00.000Z",
        userId,
      },
    ],
  });
  // 4. Tasks,
  await db.task.createMany({
    data: [
      {
        subject: "Call Alice Johnson",
        dueDate: "2025-05-04T10:00:00.000Z",
        status: "IN_PROGRESS",
        priority: "HIGH",
        description: "Discuss project scope",
        userId,
      },
      {
        subject: "Send proposal to Carol",
        dueDate: "2025-05-04T15:00:00.000Z",
        status: "NOT_STARTED",
        priority: "NORMAL",
        description: "Use Q2 template",
        userId,
      },
      {
        subject: "Follow up with Nina",
        dueDate: "2025-05-04T14:00:00.000Z",
        status: "WAITING",
        priority: "HIGH",
        description: "Waiting for her response",
        userId,
      },
      {
        subject: "Prepare for TradeShow",
        dueDate: "2025-05-04T08:00:00.000Z",
        status: "DEFERRED",
        priority: "LOW",
        description: "Pending marketing materials",
        userId,
      },
      {
        subject: "Update CRM",
        dueDate: "2025-05-04T12:00:00.000Z",
        status: "COMPLETED",
        priority: "LOWEST",
        description: "Logged all emails",
        userId,
      },
    ],
  });

  // 5.Companies the same way...
  await db.company.createMany({
    data: [
      {
        name: "TechCorp",
        industry: "Software",
        location: "New York, USA",
        employees: "500+",
        revenue: "$10M+",
        website: "https://techcorp.com",
        userId,
      },
      {
        name: "InnovateX",
        industry: "Biotech",
        location: "San Diego, USA",
        employees: "200+",
        revenue: "$5M",
        website: "https://innovatex.com",
        userId,
      },
      {
        name: "CreativeLab",
        industry: "Marketing",
        location: "Austin, USA",
        employees: "50+",
        revenue: "$1M",
        website: "https://creativelab.com",
        userId,
      },
      {
        name: "NeoTech",
        industry: "Cybersecurity",
        location: "London, UK",
        employees: "100+",
        revenue: "$3M",
        website: "https://neotech.io",
        userId,
      },
      {
        name: "FutureWorks",
        industry: "AI & ML",
        location: "Berlin, Germany",
        employees: "150+",
        revenue: "$4M",
        website: "https://futureworks.ai",
        userId,
      },
    ],
  });
}
