import { useState } from "react";
import { NotchNav } from "@/components/ui/notch-nav/NotchNav";
import { NAV_ITEMS } from "@/types/nav-items";
import { NavLogo } from "./NavLogo";
import { NavSignUp } from "./NavSignUp";

export default function Navbar() {
  const [activeId, setActiveId] = useState("home");

  return (
    <NotchNav
      items={NAV_ITEMS}
      activeId={activeId}
      position="top"
      logo={<NavLogo />}
      rightContent={<NavSignUp />}
      onActiveChange={setActiveId}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">Active section:</p>
        <p className="text-xl font-bold text-foreground capitalize">
          {activeId.replace(/-/g, " ")}
        </p>
      </div>
    </NotchNav>
  );
}
