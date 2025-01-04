import { toSimpleName } from "./central-util";

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
    classJavaDoc: cjd.javadocData.find(jd => jd.attachedType === 'CLASS' && jd.attachedName === cjd.id),
    constructors: cjd.javadocData.filter(jd => jd.attachedType === 'CONSTRUCTOR'),
    fields: cjd.javadocData.filter(jd => jd.attachedType === 'FIELD'),
    methods: cjd.javadocData.filter(jd => jd.attachedType === 'METHOD'),
  }
}