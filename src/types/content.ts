// JSON value type for Tiptap content
export type TContent = {
  type: string;
  content: TInnerContent[];
};

type TInnerContent = {
  type: string;
  content?: TInnerContent[];
  attrs?: { level?: number; tight?: boolean; start?: number };
  text?: string;
  marks?: TInnerContent[];
};
