import React, { ReactElement } from 'react';
import { toSimpleName } from './central-util';
import Link from 'next/link';
import parse, {
  DOMNode,
  domToReact,
  HTMLReactParserOptions,
} from 'html-react-parser';

export interface Javadoc {
  description: {
    elements: (InlineTag | string)[];
    empty: boolean;
  };
  blockTags: BlockTag[];
}

export interface JavadocData {
  id: number;
  javadoc: Javadoc;
  attachedType: string;
  attachedName: string;
}

export interface InlineTag {
  type: string;
  content: string;
  name?: string;
}

export interface BlockTag {
  type: string;
  content: {
    elements: (InlineTag | string)[];
    empty: boolean;
  };
  name?: string;
  tagName: string;
}

export interface ClassJavadocData {
  id: string;
  javadocData: JavadocData[];
}

export interface ClassSummary {
  fqName: string;
  simpleName: string;
  classJavaDoc?: JavadocData;
  methods: JavadocData[];
  fields: JavadocData[];
  constructors: JavadocData[];
}

export function convert(cjd: ClassJavadocData): ClassSummary {
  return {
    fqName: cjd.id,
    simpleName: toSimpleName(cjd.id),
    classJavaDoc: cjd.javadocData.find(
      (jd) => jd.attachedType === 'CLASS' && jd.attachedName === cjd.id,
    ),
    constructors: cjd.javadocData.filter(
      (jd) => jd.attachedType === 'CONSTRUCTOR',
    ),
    fields: cjd.javadocData.filter((jd) => jd.attachedType === 'FIELD'),
    methods: cjd.javadocData.filter((jd) => jd.attachedType === 'METHOD'),
  };
}

export function inlineTagToString(tag: InlineTag): string {
  switch (tag.type) {
    case 'CODE':
      return `<code>${tag.content}</code>`;
    default:
      return tag.content;
  }
}

export function javadocToNode(javadoc?: Javadoc): React.ReactNode {
  return (
    <div className='text-muted-foreground'>
      {javadoc &&
        !javadoc.description.empty &&
        parse(
          javadoc.description.elements
            .map((element) =>
              typeof element === 'string'
                ? element
                : inlineTagToString(element),
            )
            .join(''),
        )}
      <h3>Tags:</h3>
      {javadoc?.blockTags.map((tag) => (
        <div className='flex gap-x-4' key={tag.tagName}>
          {tag.tagName ? <h4>{tag.tagName}:</h4> : 'EE'}
          <span>
            {!tag.content.empty &&
              parse(
                tag.content.elements
                  .map((element) =>
                    typeof element === 'string'
                      ? element
                      : inlineTagToString(element),
                  )
                  .join(''),
              )}
          </span>
        </div>
      ))}
    </div>
  );
}
