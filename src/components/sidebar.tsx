"use client";

import { CLASS_ICON, PACKAGE_ICON } from "@/lib/utils";
import { ChevronDown, ChevronRight, Library, LibraryBig, Package } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export const Sidebar = ({ children }: { children?: ReactNode }) => {
  return (
    <aside className="min-w-[25%] overflow-x-hidden text-ellipsis border-r flex flex-col">
      {children}
    </aside>
  );
};

export const ArtifactHeading = ({
  name,
  version,
  selected = undefined,
  onVersionChange
}: {
  name: string;
  version: string[] | string;
  selected?: number;
  onVersionChange?: (version: string) => void;
}) => {
  const [opened, setOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | undefined>(selected);

  useEffect(() => {
    const outsideClickListener = (e: MouseEvent) => {
      setOpened(false);
    }
    document.addEventListener('click', outsideClickListener);
    return () => document.removeEventListener('click', outsideClickListener);
  })

  return (
    <div className="py-2 relative cursor-pointer m-2 rounded-md flex items-center px-4 hover:bg-muted transition-colors">
      <div onClick={() => {
        if (version instanceof Array) {
          setOpened(!opened);
        }
      }} className="flex select-none items-center gap-x-2 w-full">
        <span className="border border-blue-500 rounded bg-gradient-to-b from-black to-blue-950">
          <Package stroke="#3b82f6" className="p-0.5" />
        </span>
        <div className="flex flex-col ml-2">
          <h1 className="text-normal font-semibold">{name}</h1>
          <p className="text-xs text-muted-foreground">
            {typeof version === "string" ? version : selectedItem !== undefined ? version[selectedItem] : ''}
          </p>
        </div>
      </div>
      {version instanceof Array && (
        <>
          <div className="ml-auto text-muted-foreground">
            {opened ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          <div className={`absolute max-h-[500%] overflow-y-scroll ${!opened && 'hidden'} flex flex-col rounded border bg-background p-0.5 w-inherit left-0 top-[110%] right-0`}>
            {version instanceof Array &&
              version.map((v, i) => (
                <div
                  onClick={() => {
                    onVersionChange?.(v);
                    setOpened(false);
                    setSelectedItem(i);
                  }}
                  key={i}
                  className="flex hover:bg-muted rounded items-center px-2 py-1 gap-x-2">
                  <Library stroke="#3B82F6" />
                  <span>{name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {v}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export const SidebarItem = ({
  children,
  className,
  title,
  onSelected,
  icon,
  defaultState = false
}: {
  children?: React.ReactNode;
  className?: string;
  title: string;
  onSelected?: () => void;
  icon: string;
  defaultState?: boolean;
}) => {
  const [opened, setOpened] = useState(defaultState);

  return (
    <div className="flex overflow-hidden flex-col mx-2 my-1">
      <div
        onClick={() => {
          if (!opened && !children)
            onSelected?.();
          setOpened(!opened);
        }}
        className={`${className} px-4 flex cursor-pointer items-center select-none gap-x-2 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors rounded`}
      >
        <Image
          width={20}
          height={20}
          alt="xd"
          src={icon}
        />
        {title}
        {children &&
          (opened ? (
            <ChevronDown className="ml-auto" size={16} />
          ) : (
            <ChevronRight className="ml-auto" size={16} />
          ))}
      </div>
      <div
        className="transition-all hover:muted duration-100 ease-in-out"
        style={{ maxHeight: opened ? "1000px" : "0px", overflow: "hidden" }}
      >
        {children}
      </div>
    </div>
  );
};

export function DefaultSidebar({ artifact, versions, selected, classes, selectedClass }: { 
  artifact: string, 
  versions: { latest: string, versions: string[] }, 
  selected: string;
  classes: string[];
  selectedClass: string;
}) {
  const router = useRouter();
  const tree = toTree(classes);

  return (
    <Sidebar>
      <ArtifactHeading
        onVersionChange={(version) => {
          const split = artifact.split(':');
          router.push(`/javadocs/${split[0]}:${split[1]}/${version}`);          
        }}
        name={artifact.split(':')[1]}
        version={versions.versions}
        selected={versions.versions.indexOf(selected)}
      />
      {Object.entries(tree).map((group, i) => (
        <SidebarItem defaultState={group[1].some((item: any) => selectedClass === item.type)} key={i} title={group[0]} icon={PACKAGE_ICON}>
          {group[1].map((item: any, j: number) => (
            <SidebarItem
              className={`${selectedClass === item.type && 'bg-muted'}`}
              icon={CLASS_ICON}
              key={j}
              title={item.type.substring(item.type.lastIndexOf('.') + 1)}
              onSelected={() => {
                const split = artifact.split(':');
                router.push(`/javadocs/${split[0]}:${split[1]}/${selected}/${item.type}`);
              }}
            />
          ))}
        </SidebarItem>
      ))}
    </Sidebar>
  )
}

function toTree(classes: string[]): Record<string, string[]> {
  const mapped = classes.map(type => ({ type, package: type.substring(0, type.lastIndexOf('.')) }))
  const toRet = groupBy(mapped, 'package') as Record<string, string[]>;
  return toRet;
}

const groupBy = function(xs: any[], key: string) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};