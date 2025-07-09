import { DataTable } from "@/components/data-table";
import { AddLeadForm } from "@/components/leads/add-lead-form";
import { columns } from "@/components/leads/columns";
import PaginationControl from "@/components/pagination";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Leads",
  description: "View and manage your leads",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const leadSearchParams = await searchParams;

  const page = Number(leadSearchParams.page) || 1;
  const limit = Number(leadSearchParams.limit) || 5;
  const offset = (page - 1) * limit;

  const user = await getCurrentUser();

  const leads = await db.lead.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
  const totalLeads = await db.lead.count({
    where: {
      userId: user?.id,
    },
  });
  const totalPages = Math.ceil(totalLeads / limit);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
        <AddLeadForm />
      </div>
      <DataTable columns={columns} data={leads} />

      <PaginationControl
        page={page}
        limit={limit}
        pathname="/dashboard/leads"
        totalPages={totalPages}
        total={totalLeads}
      />
    </div>
  );
}
