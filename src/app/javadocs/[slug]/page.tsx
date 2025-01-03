import ArtifactContent from "./javadoc";

export default async function BrowseDocs({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;

  return <ArtifactContent artifact={decodeURIComponent(slug)} />;
}