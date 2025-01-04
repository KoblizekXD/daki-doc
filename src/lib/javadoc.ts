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