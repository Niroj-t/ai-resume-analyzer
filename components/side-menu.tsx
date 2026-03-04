import Link from "next/link";
import { Upload, FileBarChart, Menu, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type SideMenuProps = {
  activeSection: "upload" | "analysis";
  hasResult: boolean;
};

export function SideMenu({ activeSection, hasResult }: SideMenuProps) {
  const menuItems = [
    {
      id: "upload",
      label: "Upload",
      icon: Upload,
      enabled: true,
      href: "/",
    },
    {
      id: "analysis",
      label: "Result",
      icon: FileBarChart,
      enabled: hasResult,
      href: "/analysis",
    },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center gap-2 px-4 sm:px-6 lg:px-8">
        <FileSearch className="w-6 h-6 text-blue-600" />
        <div className="flex flex-col">
          <span className="font-bold text-lg text-blue-700">
            Resume Analyzer
          </span>
          <span className="text-xs text-gray-500 hidden sm:block">
            AI-Powered Analysis
          </span>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 p-6 space-y-4 border-t">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isDisabled = !item.enabled;

          return (
            <Button
              key={item.id}
              disabled={isDisabled}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 px-6 py-6 rounded-sm border-2 transition-colors duration-200",
                isActive &&
                  "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
                !isActive && !isDisabled && "text-gray-800 hover:bg-blue-50",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
              asChild
            >
              <Link
                href={isDisabled ? "#" : item.href}
                aria-disabled={isDisabled}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-white" />
                )}
              </Link>
            </Button>
          );
        })}
      </nav>
      <Separator />
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 left-4 z-50 shadow-lg"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0 shadow-xl rounded-r-lg">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block sticky top-0 left-0 h-screen w-64 shrink-0 border-r border-blue-100 shadow-sm">
        <SidebarContent />
      </div>
    </>
  );
}