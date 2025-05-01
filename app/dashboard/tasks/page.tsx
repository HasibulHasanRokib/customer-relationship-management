import { DataTable } from "@/components/data-table";
import { columns } from "@/components/tasks/columns";
import { CreateTaskForm } from "@/components/tasks/create-task-form";
import { TaskKanbanView } from "@/components/tasks/task-kanban-view";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskCalendarView } from "@/components/tasks/task-calendar-view";

export default async function TasksPage() {
  const user = await getCurrentUser();

  const tasks = await db.task.findMany({
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
      <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
      <Tabs defaultValue="table">
        <div className="flex items-center justify-between">
          <TabsList className="gap-x-4 px-2">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          <CreateTaskForm />
        </div>

        <TabsContent value="table">
          <DataTable
            columns={columns}
            data={tasks}
            searchColumn="subject"
            searchPlaceholder="subject"
            tableName="Task"
          />
        </TabsContent>
        <TabsContent value="kanban">
          <TaskKanbanView initialTasks={tasks} />
        </TabsContent>
        <TabsContent value="calendar">
          <TaskCalendarView data={tasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
