import { findAllClasses, getAllVersions, MAVEN_CENTRAL } from "@/lib/central-util";
import ArtifactContent from "./javadoc";

export default async function BrowseDocs({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const decoded = decodeURIComponent(slug);

  const result = await findAllClasses({
    repository: MAVEN_CENTRAL,
    groupId: decoded.split(':')[0],
    artifactId: decoded.split(':')[1],
    version: decoded.split(':')[2]
  })

  const versions = await getAllVersions(MAVEN_CENTRAL, decoded.split(':')[0], decoded.split(':')[1]);

  if (typeof versions === 'string') {
    return <h1>Cannot find versions: {versions}</h1>
  }

  return <ArtifactContent versions={(versions as { latest: string; versions: string[] }).versions} found={typeof result !== 'string'} types={result} artifact={decoded} />;
}