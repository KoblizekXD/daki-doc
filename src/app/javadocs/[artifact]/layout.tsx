import { Navbar, RedirectingNavItem } from "@/components/navbar";
import {  getAllVersionsFromArtifact } from "@/lib/central-util";
import { BookOpenText, Coffee, ExternalLink, SpellCheck2 } from "lucide-react";
import Link from "next/link";

export default async function DocsIndexLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ artifact: string, test: string }>
}) {
  const artifact = decodeURIComponent((await params).artifact);
  const versions = await getAllVersionsFromArtifact(artifact);

  if (!versions) return (
    <main  className="flex bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] items-center gap-x-2 justify-center min-h-screen">
      <div className="flex gap-x-2 items-center absolute top-4 left-4 text-xl font-semibold">
        <Coffee />
        Daki Doc
      </div>
      <SpellCheck2 size={128} stroke="rgb(248 113 113)" strokeWidth={3} />
      <div className="flex flex-col">
        <h1 className='text-4xl font-extrabold'>
          Could not locate target artifact: 
          <span className='text-red-500'> {artifact}</span>
        </h1>
        <Link className='text-3xl gap-x-3 text-muted-foreground flex items-center font-bold' href={'/'}>
          Home
          <ExternalLink size={28} />
        </Link>
      </div>
    </main>
  )

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
        {children}
      </div>
    </main>
  )
}