import React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

export function CustomToolbar({ date, onNavigate }: CustomToolbarProps) {
  return (
    <div className="my-4 mb-4 flex w-[250px] items-center justify-center gap-x-2 lg:justify-start">
      <Button
        onClick={() => onNavigate("PREV")}
        variant={"secondary"}
        size={"icon"}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <div className="flex h-8 w-full items-center justify-center rounded px-3 py-2">
        <Calendar className="text-primary mr-2 size-4" />
        <p className="text-sm">{format(date, "MMMM yyyy")}</p>
      </div>
      <Button
        onClick={() => onNavigate("NEXT")}
        variant={"secondary"}
        size={"icon"}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
