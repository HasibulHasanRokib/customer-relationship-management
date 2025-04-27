"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationCrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <li key={href} className="flex items-center">
        {isLast ? (
          <span
            className="text-sm font-medium text-gray-500"
            aria-current="page"
          >
            {label}
          </span>
        ) : (
          <div className="flex items-center">
            <Link
              href={href}
              className="hover:text-primary text-sm font-medium text-gray-600 transition-colors"
            >
              {label}
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
          </div>
        )}
      </li>
    );
  });

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {pathSegments.length > 0 && <>{breadcrumbItems}</>}
      </ol>
    </nav>
  );
}
