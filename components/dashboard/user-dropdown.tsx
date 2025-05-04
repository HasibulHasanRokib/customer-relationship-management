"use client";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "../auth/sign-out";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

export function UserDropdown({ name, email, avatarUrl }: UserDropdownProps) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex h-auto w-full items-center justify-start gap-2 px-2">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={avatarUrl || ""} alt={name} />
            <AvatarFallback className="text-primary">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="m-2 w-[240px] rounded p-2">
        <DropdownMenuItem className="">
          <div className="flex h-auto w-full items-center gap-2 px-2">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={avatarUrl || ""} alt={name} />
              <AvatarFallback className="text-primary">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-sm">
              <span className="font-medium">{name}</span>
              <span className="text-muted-foreground text-xs">{email}</span>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/profile")}
          className="flex cursor-pointer items-center gap-2 px-3 py-2"
        >
          <User className="h-4 w-4" />
          <span>My Account</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive flex cursor-pointer items-center gap-2 px-3 py-2">
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
