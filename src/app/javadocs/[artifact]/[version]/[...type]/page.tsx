import { findClassJavadoc, MAVEN_CENTRAL } from '@/lib/central-util';
import { convert, javadocToNode } from '@/lib/javadoc';
import { CLASS_ICON } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function DefaultClassPage({
  params,
}: {
  params: Promise<{ artifact: string; version: string; type: string[] }>;
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
    classData: targetClass,
  });

  if (result === undefined) throw new Error('Class not found');

  const summary = convert(result);

  return (
    <main className='p-24 flex gap-y-4 flex-col'>
      <Link
        className='flex items-center'
        href={`/javadocs/${group}:${artifactId}/${param.version}`}
        passHref>
        <ChevronLeft size={24} />
        Back to index
      </Link>
      <section title='class-info' className='flex gap-y-2 flex-col'>
        <h1 className='text-4xl font-bold flex items-center gap-x-4'>
          <Image src={CLASS_ICON} alt='xd' width={24} height={24} />
          {summary.simpleName}
        </h1>
        {javadocToNode(summary.classJavaDoc?.javadoc)}
      </section>
      <section className='flex flex-col gap-y-2' title='fields'>
        <h1 className='text-4xl font-bold'>Fields</h1>
        {summary.fields.length !== 0 ? (
          summary.fields.map((field) => (
            <div key={field.id} className='flex gap-x-4 flex-col'>
              <h2>{field.attachedName || 'No name provided'}</h2>
              {javadocToNode(field.javadoc)}
            </div>
          ))
        ) : (
          <span>No fields found</span>
        )}
      </section>
      <section className='flex flex-col gap-y-2' title='methods'>
        <h1 className='text-4xl font-bold'>Methods</h1>
        {summary.methods.length !== 0 ? (
          summary.methods.map((field) => (
            <div key={field.id} className='flex gap-x-4 flex-col'>
              <h2>{`${field.attachedName}()` || 'No name provided'}</h2>
              {javadocToNode(field.javadoc)}
            </div>
          ))
        ) : (
          <span>No fields found</span>
        )}
      </section>
    </main>
  );
}
