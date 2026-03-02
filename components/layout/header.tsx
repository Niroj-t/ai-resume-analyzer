import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  // UI placeholders
  const userName = "";
  const userEmail = "user@example.com";
  const userInitials = "U";

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

                <span className="hidden sm:inline-block text-sm font-medium">
                  {userName}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {userName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* UI only — no action */}
              <DropdownMenuItem className="text-red-600 cursor-pointer">
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