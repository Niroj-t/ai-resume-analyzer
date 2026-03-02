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

export function SideMenu() {
  // Static UI state (visual only)
  const activeSection = "upload";
  const hasResult = false;

  const menuItems = [
    {
      id: "upload",
      label: "Upload",
      icon: Upload,
      enabled: true,
    },
    {
      id: "result",
      label: "Result",
      icon: FileBarChart,
      enabled: hasResult,
    },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Logo / Title */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <FileSearch className="w-6 h-6 text-blue-600" />
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight text-blue-700">
              Resume Analyzer
            </span>
            <span className="text-[10px] text-gray-500 leading-tight hidden sm:block">
              AI-Powered Analysis
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
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
                "w-full justify-start gap-3",
                isActive &&
                  "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
                !isActive &&
                  !isDisabled &&
                  "text-gray-700 hover:bg-blue-50",
                isDisabled && "opacity-60 cursor-not-allowed",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>

              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
              )}
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
              <Menu className="w-6 h-4" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-0 left-0 h-screen bg-white border-r border-blue-100 w-64 shrink-0 shadow-sm">
        <SidebarContent />
      </div>
    </>
  );
}
