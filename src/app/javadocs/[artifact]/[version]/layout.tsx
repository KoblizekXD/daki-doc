import { DefaultSidebar } from "@/components/sidebar";
import { getAllVersionsFromArtifact } from "@/lib/central-util";
import { version } from "os";

export default async function VersionOpinionedDocsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ artifact: string, version: string }>
}) {
  const param = await params;
  const artifact = decodeURIComponent(param.artifact);
  const versions = await getAllVersionsFromArtifact(artifact);

  if (!versions) {
    return (
      <main>
        <h1>You were not supposed to be here!</h1>
      </main>
    )
  }
  

  return (
    <main className="flex w-full min-h-screen">
      <DefaultSidebar selected={param.version} artifact={artifact} versions={versions} />
      <div className="flex-1">
        {children}
      </div>
    </main>
  )
}