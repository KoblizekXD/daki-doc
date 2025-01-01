export type ArtifactPreviewResults = {
  total: number;
  results: {
    id: string;
    group: string;
    artifact: string;
    latestVersion: string;
    repoId: string;
    versions: number;
  }[]
}

export const findPreview = async (query: string): Promise<ArtifactPreviewResults> => {
  const json = await (await fetch(`https://search.maven.org/solrsearch/select?q=${query}&rows=10&wt=json`)).json();
  const data = json.response;
  return {
    total: data.numFound,
    results: data.docs.map((doc: any) => ({
      id: doc.id,
      group: doc.g,
      artifact: doc.a,
      latestVersion: doc.latestVersion,
      repoId: doc.repositoryId,
      versions: doc.versionCount
    }))
  }
}