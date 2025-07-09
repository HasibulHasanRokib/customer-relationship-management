import { AddCompany } from "@/components/companies/add-company";
import { columns } from "@/components/companies/columns";
import { DataTable } from "@/components/data-table";
import PaginationControl from "@/components/pagination";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Companies",
  description: "View and manage your companies",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const companiesSearchParams = await searchParams;

  const page = Number(companiesSearchParams.page) || 1;
  const limit = Number(companiesSearchParams.limit) || 5;
  const offset = (page - 1) * limit;

  const user = await getCurrentUser();
  const companies = await db.company.findMany({
    where: {
      userId: user?.id,
    },
    skip: offset,
    take: limit,
  });
  const totalCompanies = await db.company.count({
    where: {
      userId: user?.id,
    },
  });
  const totalPages = Math.ceil(totalCompanies / limit);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <AddCompany />
      </div>
      <DataTable columns={columns} data={companies} />
      <PaginationControl
        page={page}
        limit={limit}
        pathname="/dashboard/companies"
        totalPages={totalPages}
        total={totalCompanies}
      />
    </div>
  );
}
