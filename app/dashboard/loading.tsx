import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-sm">
      <div className="flex items-center space-x-2.5">
        <div className="relative rounded-full bg-white">
          <Loader2 className="text-primary h-10 w-10 animate-spin" />
        </div>
        <h2 className="text-primary font-normal">Loading...</h2>
      </div>
    </div>
  );
}
