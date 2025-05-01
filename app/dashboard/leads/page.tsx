import { DataTable } from "@/components/data-table";
import { AddLeadForm } from "@/components/leads/add-lead-form";
import { columns } from "@/components/leads/columns";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";

export default async function LeadsPage() {
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
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
        <AddLeadForm />
      </div>
      <DataTable
        columns={columns}
        data={leads}
        searchColumn="email"
        searchPlaceholder="email"
        tableName="Lead"
      />
    </div>
  );
}
