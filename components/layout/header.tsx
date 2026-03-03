"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
 const { data: session, status } = useSession();

  if (status === "loading") return null;

  const userName = session?.user?.name ?? "";
  const userEmail = session?.user?.email ?? "";

  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();


  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 border-b border-blue-100">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Spacer */}
        <div className="flex-1" />

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                  })
                }
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
