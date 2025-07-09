import { DataTable } from "@/components/data-table";
import { db } from "@/lib/prisma";
import { columns } from "./columns";
import PaginationControl from "@/components/pagination";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Feedback",
  description: "View and manage user feedback",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const feedbackSearchParams = await searchParams;

  const page = Number(feedbackSearchParams.page) || 1;
  const limit = Number(feedbackSearchParams.limit) || 5;
  const offset = (page - 1) * limit;

  const users = await db.user.findMany({
    where: {
      role: "user",
    },
    include: {
      Feedback: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
  const totalUsers = await db.user.count({
    where: {
      role: "user",
    },
  });
  const totalPages = Math.ceil(totalUsers / limit);
  return (
    <div>
      <h2>Feedback Page</h2>
      <DataTable columns={columns} data={users} />
      <PaginationControl
        limit={limit}
        page={page}
        totalPages={totalPages}
        total={totalUsers}
        pathname="/admin/feedback"
      />
    </div>
  );
}
