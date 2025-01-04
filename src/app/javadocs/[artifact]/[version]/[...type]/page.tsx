import { findClassJavadoc, findJavadoc, MAVEN_CENTRAL, toSimpleName } from "@/lib/central-util";
import { CLASS_ICON } from "@/lib/utils";
import Image from "next/image";

export default async function DefaultClassPage({
  params,
}: {
  params: Promise<{ artifact: string, version: string, type: string[] }>
}) {
  const param = await params;
  const artifact = decodeURIComponent(param.artifact);
  const group = artifact.split(':')[0];
  const artifactId = artifact.split(':')[1];
  const targetClass = param.type.map((tp) => decodeURIComponent(tp)).join('.'); 
  const result = await findClassJavadoc({
    repository: MAVEN_CENTRAL,
    groupId: group,
    artifactId: artifactId,
    version: param.version,
    classData: targetClass
  }); 

  return (
    <main className="p-24">
      <h1 className="text-2xl font-bold flex items-center gap-x-4">
        <Image src={CLASS_ICON} alt="xd" width={24} height={24} />
        {toSimpleName(targetClass)}
      </h1>
    </main>
  )
}