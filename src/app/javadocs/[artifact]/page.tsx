import { getAllVersionsFromArtifact } from '@/lib/central-util';
import { use, useEffect, useState } from 'react';
import Page from '.';

export default async function IndexPage({
  params,
}: {
  params: Promise<{ artifact: string }>;
}) {
  const artifact = decodeURIComponent((await params).artifact);
  const versions = await getAllVersionsFromArtifact(artifact);

  return <Page versions={versions} />;
}
