import { DefaultSidebar } from '@/components/sidebar';
import {
  findAllClasses,
  getAllVersionsFromArtifact,
  MAVEN_CENTRAL,
} from '@/lib/central-util';
import { Metadata } from 'next';

export const metadata: Metadata = {
  icons: [
    '/icon2.ico'
  ]
}

export default async function ClassLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ artifact: string; version: string; type: string[] }>;
}) {
  const param = await params;
  const artifact = decodeURIComponent(param.artifact);
  const versions = await getAllVersionsFromArtifact(artifact);
  const targetClass = param.type.map((tp) => decodeURIComponent(tp)).join('.');

  if (!versions) {
    return (
      <main>
        <h1>You were not supposed to be here!</h1>
      </main>
    );
  }

  return (
    <main className='flex h-full w-full'>
      <DefaultSidebar
        selectedClass={targetClass}
        classes={
          (await findAllClasses({
            repository: MAVEN_CENTRAL,
            groupId: artifact.split(':')[0],
            artifactId: artifact.split(':')[1],
            version: param.version,
          })) || []
        }
        selected={param.version}
        artifact={artifact}
        versions={versions}
      />
      {children}
    </main>
  );
}
