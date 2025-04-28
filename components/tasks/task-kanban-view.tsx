"use client";

import { useState, useEffect, startTransition } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Task, User } from "@prisma/client";
import { updateTaskStatus } from "@/actions/tasks";

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "WAITING":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    case "DEFERRED":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "NOT_STARTED":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "HIGHEST":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    case "HIGH":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
    case "NORMAL":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "LOW":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "LOWEST":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};
type TaskWithUser = Task & { user: Pick<User, "name"> };
type Status = {
  id: string;
  title: string;
  tasks: TaskWithUser[];
};

export function TaskKanbanView({
  initialTasks,
}: {
  initialTasks: TaskWithUser[];
}) {
  const initialStatus: Status[] = [
    { id: "NOT_STARTED", title: "Not Started", tasks: [] },
    { id: "DEFERRED", title: "Deferred", tasks: [] },
    { id: "IN_PROGRESS", title: "In Progress", tasks: [] },
    { id: "COMPLETED", title: "Completed", tasks: [] },
    { id: "WAITING", title: "Waiting for input", tasks: [] },
  ];

  const [status, setStatus] = useState<Status[]>(initialStatus);

  useEffect(() => {
    if (initialTasks) {
      const updatedStatus = initialStatus.map((status) => ({
        ...status,
        tasks: initialTasks.filter((task) => task.status === status.id),
      }));
      setStatus(updatedStatus);
    }
  }, [initialTasks]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceStatus = status.find((item) => item.id === source.droppableId);
    const destStatus = status.find(
      (item) => item.id === destination.droppableId,
    );

    if (!sourceStatus || !destStatus) return;

    const newStatus = [...status];

    const task = sourceStatus.tasks[source.index];

    const sourceTasks = [...sourceStatus.tasks];
    sourceTasks.splice(source.index, 1);

    const destTasks = [...destStatus.tasks];
    destTasks.splice(destination.index, 0, {
      ...task,
      status: destStatus.id as TaskWithUser["status"],
    });

    const sourceStatusIndex = newStatus.findIndex(
      (s) => s.id === sourceStatus.id,
    );
    const destStatusIndex = newStatus.findIndex((s) => s.id === destStatus.id);

    newStatus[sourceStatusIndex] = {
      ...sourceStatus,
      tasks: sourceTasks,
    };

    newStatus[destStatusIndex] = {
      ...destStatus,
      tasks: destTasks,
    };

    setStatus(newStatus);

    startTransition(async () => {
      const response = await updateTaskStatus({
        id: task.id,
        status: destStatus.id as Task["status"],
      });
      if (response.error) {
        toast("Error message", { description: response.error });
      } else {
        toast(`Deal moved to ${response.updatedTask?.subject} status`);
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {status.map((s) => (
          <div key={s.id} className="flex flex-col">
            <div className="mb-2 flex items-center justify-between rounded-full border p-2">
              <h3 className="font-medium">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(s.id)}`}
                >
                  {s.title}
                </span>
              </h3>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>{s.tasks.length}</span>
                </Badge>
              </div>
            </div>

            <Droppable droppableId={s.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-muted/40 min-h-32 flex-1 space-y-2 rounded border p-2"
                >
                  {s.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card className="cursor-grab rounded px-0 active:cursor-grabbing">
                            <CardHeader>
                              <CardTitle className="capitalize">
                                {task.subject}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div>{task.dueDate?.toLocaleDateString()}</div>
                              <div>
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(task.priority)}`}
                                >
                                  {task.priority}
                                </span>
                              </div>

                              <div>{task.user.name}</div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
