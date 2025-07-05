import { AddCompany } from "@/components/companies/add-company";
import { columns } from "@/components/companies/columns";
import { DataTable } from "@/components/data-table";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";

export default async function CompaniesPage() {
  const user = await getCurrentUser();
  const companies = await db.company.findMany({
    where: {
      userId: user?.id,
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <AddCompany />
      </div>
      <DataTable
        columns={columns}
        data={companies}
        searchColumn="name"
        searchPlaceholder="company"
        tableName="company"
      />
    </div>
  );
}
