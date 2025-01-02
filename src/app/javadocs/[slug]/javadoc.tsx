"use client";

import { Navbar, RedirectingNavItem } from "@/components/navbar";
import { Sidebar, SidebarItem } from "@/components/sidebar";
import { BookOpenText, ChevronDown, Package, Search, SearchIcon } from "lucide-react";

export default function ArtifactContent({ artifact }: { artifact: string }) {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar className="py-2">
        <RedirectingNavItem
          className={"font-extrabold flex items-center gap-x-2"}
          href="/"
        >
          <BookOpenText />
          Daki Docs
        </RedirectingNavItem>
        <div className="absolute left-1/2 -translate-x-1/2">
          <button
            className={
              "inline-flex justify-center hover:bg-muted transition-colors items-center md:w-48 lg:w-72 xl:w-80 gap-x-2 px-2 py-2 rounded-md bg-muted/50 text-sm text-muted-foreground border border-input"
            }
          >
            <span className={"inline-flex"}>Search for classes...</span>
            <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </Navbar>
      <div className="flex-1 flex">
        <Sidebar>
          <SidebarItem title="Yes">
            <SidebarItem title="Yes">
            <SidebarItem title="Yes">
            
            </SidebarItem>
            </SidebarItem>
          </SidebarItem>
        </Sidebar>
      </div>
    </main>
  );
}
