import { DealPipeline } from "@/components/deals/deal-pipeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddDealsForm } from "@/components/deals/add-deals-form";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/deals/columns";

export default async function DealsPage() {
  const user = await getCurrentUser();

  const deals = await db.deals.findMany({
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
  });
  return (
    <>
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="table">
          <div className="flex items-center justify-between">
            <TabsList className="gap-x-4 px-2">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
            </TabsList>
            <AddDealsForm />
          </div>

          <TabsContent value="table">
            <DataTable
              columns={columns}
              data={deals}
              searchColumn="title"
              searchPlaceholder="Filter title..."
              tableName="Deal"
            />
          </TabsContent>
          <TabsContent value="kanban">
            <DealPipeline initialDeals={deals} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
