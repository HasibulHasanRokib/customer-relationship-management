import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlProps {
  totalPages: number;
  page: number;
  limit: number;
  total: number;
  pathname: string;
}

export default function PaginationControl({
  page,
  limit,
  total,
  totalPages,
  pathname,
}: PaginationControlProps) {
  return (
    <div>
      {totalPages > 1 && (
        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <Pagination className="w-full sm:w-auto">
            <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href={
                    page > 1
                      ? `${pathname}?page=${page - 1}&limit=${limit}`
                      : "#"
                  }
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href={`${pathname}?page=${p}&limit=${limit}`}
                    isActive={p === page}
                    className="text-sm sm:text-base"
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={
                    page < totalPages
                      ? `${pathname}?page=${page + 1}&limit=${limit}`
                      : "#"
                  }
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <p className="text-center text-xs text-gray-500 sm:text-sm">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)}{" "}
            of {total}
          </p>
        </div>
      )}
    </div>
  );
}
