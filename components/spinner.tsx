import { Loader2 } from "lucide-react";
import React from "react";

export function Spinner({ text }: { text?: string }) {
  return (
    <div className="flex items-center gap-x-2.5">
      <Loader2 className="animate-spin" />
      {text}
    </div>
  );
}
