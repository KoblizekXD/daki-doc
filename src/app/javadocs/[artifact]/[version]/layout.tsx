import { DefaultSidebar } from '@/components/sidebar';
import { getAllVersionsFromArtifact } from '@/lib/central-util';

export default async function VersionOpinionedDocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ artifact: string; version: string }>;
}) {
  const param = await params;
  const artifact = decodeURIComponent(param.artifact);
  const versions = await getAllVersionsFromArtifact(artifact);

  if (!versions) {
    return (
      <main>
        <h1>You were not supposed to be here!</h1>
      </main>
    );
  }

  return (
    <main className='flex justify-center items-center w-full'>{children}</main>
  );
}
