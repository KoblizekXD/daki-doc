import { XMLParser } from "fast-xml-parser";

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

export const findJavadoc = (group: string, artifact: string, version: string) => {
  return `https://search.maven.org/remotecontent?filepath=${group.replaceAll('.', '/')}/${artifact}/${version}/${artifact}-${version}-javadoc.jar`;
}

export const findSources = (group: string, artifact: string, version: string) => {
  return `https://search.maven.org/remotecontent?filepath=${group.replaceAll('.', '/')}/${artifact}/${version}/${artifact}-${version}-sources.jar`;
}

export const JAVADOC_API_URL = 'https://javadocs-backend.7f454c46.xyz'
export const MAVEN_CENTRAL   = 'https://repo1.maven.org/maven2/'

export const findAllClasses = async (body: {
  repository: string;
  groupId: string;
  artifactId: string;
  version: string;
}): Promise<string[] | string> => {
  
  const result = await fetch(`${JAVADOC_API_URL}/api/javadoc/classes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!result.ok) {
    return result.statusText;
  }

  const response = await result.json();
  
  return response;
}

export const getAllVersions = async (repo: string = MAVEN_CENTRAL, group: string, artifact: string): Promise<{
  latest: string;
  versions: string[];
} | undefined> => {
  const response = await fetch(new URL(`${group.replaceAll('.', '/')}/${artifact}/maven-metadata.xml`, repo));

  if (!response.ok) {
    return undefined;
  }

  const text = await response.text();
  const parser = new XMLParser();
  const xml = parser.parse(text);
  
  return {
    latest: xml.metadata.versioning.latest,
    versions: Array.from(xml.metadata.versioning.versions.version).map((v) => v as string)
  }
}

export const getAllVersionsFromArtifact = async (artifact: string): Promise<{
  latest: string;
  versions: string[];
} | undefined> => {
  return getAllVersions(MAVEN_CENTRAL, artifact.split(':')[0], artifact.split(':')[1]);
}