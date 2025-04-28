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
import { Deals } from "@prisma/client";
import { updateDealStage } from "@/actions/deals";

const getStageColor = (stage: string) => {
  switch (stage) {
    case "NEW":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "CONTACTED":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "PROPOSAL":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    case "NEGOTIATION":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
    case "WON":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "LOST":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

type Stage = {
  id: string;
  title: string;
  deals: Deals[];
};

export function DealKanbanView({ initialDeals }: { initialDeals: Deals[] }) {
  const initialStages: Stage[] = [
    { id: "NEW", title: "New", deals: [] },
    { id: "CONTACTED", title: "Contacted", deals: [] },
    { id: "PROPOSAL", title: "Proposal", deals: [] },
    { id: "NEGOTIATION", title: "Negotiation", deals: [] },
    { id: "WON", title: "Won", deals: [] },
    { id: "LOST", title: "Lost", deals: [] },
  ];

  const [stages, setStages] = useState<Stage[]>(initialStages);

  useEffect(() => {
    if (initialDeals) {
      const updatedStages = initialStages.map((stage) => ({
        ...stage,
        deals: initialDeals.filter((deal) => deal.stage === stage.id),
      }));
      setStages(updatedStages);
    }
  }, [initialDeals]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceStage = stages.find((stage) => stage.id === source.droppableId);
    const destStage = stages.find(
      (stage) => stage.id === destination.droppableId,
    );

    if (!sourceStage || !destStage) return;

    const newStages = [...stages];

    const deal = sourceStage.deals[source.index];

    const sourceDeals = [...sourceStage.deals];
    sourceDeals.splice(source.index, 1);

    const destDeals = [...destStage.deals];
    destDeals.splice(destination.index, 0, {
      ...deal,
      stage: destStage.id as Deals["stage"],
    });

    const sourceStageIndex = newStages.findIndex(
      (s) => s.id === sourceStage.id,
    );
    const destStageIndex = newStages.findIndex((s) => s.id === destStage.id);

    newStages[sourceStageIndex] = {
      ...sourceStage,
      deals: sourceDeals,
    };

    newStages[destStageIndex] = {
      ...destStage,
      deals: destDeals,
    };

    setStages(newStages);

    // TODO: Add API call to update the deal stage in the database

    startTransition(async () => {
      const response = await updateDealStage({
        id: deal.id,
        stage: destStage.id as Deals["stage"],
      });
      if (response.error) {
        toast("Error message", { description: response.error });
      } else {
        toast(`Deal moved to ${response.updatedDeal?.title} stage`);
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex flex-col">
            <div className="mb-2 flex items-center justify-between rounded-full border p-2">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStageColor(stage.title.toUpperCase())}`}
                  >
                    {stage.title}
                  </span>
                </h3>
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>
                    $
                    {stage.deals
                      .reduce((sum, deal) => sum + (deal.value || 0), 0)
                      .toLocaleString()}
                  </span>
                  <span>total</span>
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>{stage.deals.length}</span>
                </Badge>
              </div>
            </div>

            <Droppable droppableId={stage.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-muted/40 min-h-32 flex-1 space-y-2 rounded border p-2"
                >
                  {stage.deals.map((deal, index) => (
                    <Draggable
                      key={deal.id}
                      draggableId={deal.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card className="cursor-grab px-0 active:cursor-grabbing">
                            <CardHeader>
                              <CardTitle className="text-xs">
                                {deal.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-muted-foreground text-xs">
                                {deal.customer}
                              </div>
                              <div>${deal.value.toLocaleString()}</div>
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
