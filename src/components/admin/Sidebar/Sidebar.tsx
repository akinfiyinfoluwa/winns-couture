import React from "react";
import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  const SidebarContent = () => (
    <div className="overflow-y-scroll h-[calc(100vh-32px-48px)]">
      <AccountToggle />
      <Search />
      <RouteSelect />
      <Plan />
    </div>
  );

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[220px] p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <SidebarContent />
      </div>
    </>
  );
};
