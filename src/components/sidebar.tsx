"use client";

import { ChevronDown, Package } from "lucide-react";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { ReactSVG } from "react-svg";

export const Sidebar = ({ children }: { children?: ReactNode }) => {
  return (
    <aside className="min-w-64 border-r flex flex-col">
      <ArtifactHeading name="Guava" version={"1.0.0-jre"} />
      <div className="flex-1">{children}</div>
    </aside>
  );
};

export const ArtifactHeading = ({
  name,
  version,
  selected = 0,
}: {
  name: string;
  version: string[] | string;
  selected?: number;
}) => {
  return (
    <div className="py-2 cursor-pointer m-2 rounded-md flex items-center px-4 hover:bg-muted transition-colors">
      <span className="border border-blue-500 rounded bg-gradient-to-b from-black to-blue-950">
        <Package stroke="#3b82f6" className="p-0.5" />
      </span>
      <div className="flex flex-col ml-2">
        <h1 className="text-normal font-semibold">Guava</h1>
        <p className="text-xs text-muted-foreground">
          {typeof version === "string" ? version : version[selected]}
        </p>
      </div>
      <div className="ml-auto text-muted-foreground">
        <ChevronDown size={16} />
      </div>
    </div>
  );
};

export const SidebarItem = ({
  children,
  className,
  title,
}: {
  children?: React.ReactNode;
  className?: string;
  title: string;
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex flex-col m-2 flex-1">
      <div onClick={() => {
        setOpened(!opened);
      }} className={`${className} px-4 flex cursor-pointer items-center select-none gap-x-2 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors rounded`}>
        <Image
          width={20}
          height={20}
          alt="xd"
          src={
            "https://intellij-icons.jetbrains.design/icons/AllIcons/expui/nodes/class_dark.svg"
          }
        />
        {title}
        {children && (opened ? <ChevronDown className="ml-auto" size={16} /> : <ChevronDown className="ml-auto" size={16} />)}
      </div>
      <div className='transition-all hover:muted duration-100 ease-in-out' style={{ visibility: opened ? 'visible' : 'hidden', height: opened ? 'auto' : 0 }}>
        {children}
      </div>
    </div>
  );
};
