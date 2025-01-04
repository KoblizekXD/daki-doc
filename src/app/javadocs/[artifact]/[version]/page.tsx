import { ClassSearchableList } from "@/components/searchable-input";
import { findAllClasses, MAVEN_CENTRAL } from "@/lib/central-util";

export default async function VersionIndexPage({ params }: {
  params: Promise<{ artifact: string, version: string }>
}) {
  const { artifact, version } = await params;
  const betterArtifact = decodeURIComponent(artifact);
  const classes = await findAllClasses({
    repository: MAVEN_CENTRAL,
    groupId: betterArtifact.split(':')[0],
    artifactId: betterArtifact.split(':')[1],
    version
  });

  if (!classes) {
    return (
      <main>
        <h1>Could not find classes for {betterArtifact}:{version}</h1>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen p-24 gap-y-2 flex-col items-center">
      <h1 className="text-3xl font-bold">All classes</h1>
      <div className="flex gap-y-4 flex-col">
        <ClassSearchableList values={classes || []} placeholder='Filter...' />
      </div>
    </main>
  )
}