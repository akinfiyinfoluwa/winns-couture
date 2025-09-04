"use client";
import React from "react";
import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST"
    });

    if (res.ok) {
      router.push("/admin/login");
    }
  };

  const SidebarContent = () => (
    <div className="overflow-y-scroll h-[calc(100vh-32px-48px)] flex flex-col justify-between">
      <div>
        <AccountToggle />
        <Search />
        <RouteSelect />
        <Plan />
      </div>
      <Button onClick={handleLogout} variant="outline" className="w-full">
        Logout
      </Button>
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
