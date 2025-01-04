"use client";

import { Navbar, RedirectingNavItem } from "@/components/navbar";
import { ArtifactHeading, Sidebar, SidebarItem } from "@/components/sidebar";
import { INTERFACE_ICON } from "@/lib/utils";
import { BookOpenText, ExternalLink} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ArtifactContentProps {
  artifact: string;
  found: boolean;
  types: string[] | string;
  versions: string[];
}

export default function ArtifactContent({ artifact, found, types, versions }: ArtifactContentProps) {
  const router = useRouter();

  if (!found) {
    return (
      <h1>Cannot find target element: {types}</h1>
    )
  }

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
        <Link target='_blank' href={`https://mvnrepository.com/artifact/${artifact.replaceAll(':', '/')}`} className="ml-auto text-sm flex select-none cursor-pointer hover:bg-muted transition-colors items-center gap-x-2 rounded p-1">
          <span className="text-muted-foreground">{artifact}</span>
          <ExternalLink size={16} />
        </Link>
      </Navbar>
      <div className="flex-1 flex">
        <Sidebar>
          <ArtifactHeading onVersionChange={(version) => {
            const split = artifact.split(':');
            router.push(`/javadocs/${split[0]}:${split[1]}:${version}`);
          }} name="Guava" version={versions} selected={0} />
          {(types as string[]).map((type, i) => (
            <SidebarItem key={i} title={type} />
          ))}
        </Sidebar>
        <div className="flex-1 px-32 py-28 flex flex-col gap-y-2 font-mono border" >
          <h1 className="text-4xl flex gap-x-2 items-center">
            <Image src={INTERFACE_ICON} alt="eh" width={32} height={32} />
            Hello
          </h1>
          <pre className='overflow-scroll max-w-[50%] border rounded bg-muted p-2'>
            public interface Hello;
          </pre>
        </div>
      </div>
    </main>
  );
}
