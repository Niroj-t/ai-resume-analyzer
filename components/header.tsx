"use client";

import { LogOut, User, ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const userName = session?.user?.name ?? "John doe";
  const firstName = userName.split(" ")[0];
  const userEmail = session?.user?.email ?? "";

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex-1" />

        {/* USER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-100"
            >
              {/* User Icon */}
              <User className="h-5 w-5 text-blue-500" />

              {/* Username */}
              <span className="font-medium">{firstName}</span>

              {/* Chevron */}
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2 text-xs text-muted-foreground">
              {userEmail}
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer text-red-600"
              onClick={() =>
                signOut({ callbackUrl: "/login" })
              }
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}