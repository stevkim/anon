"use client";
import { useMemo } from "react";
import { useEditor, EditorContent, type Content } from "@tiptap/react";
import { defaultExtensions } from "@/components/Editor/extensions";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import LikeButton from "./Buttons/LikeButton";
import ButtonMenu from "./ButtonMenu";
import type { TPost } from "@/types/posts";

interface Props {
  post: TPost;
}

const Card = ({ post }: Props) => {
  const { content, liked, likes, id, saved, authorId, createdAt } = post;
  // format the date
  const date = useMemo(() => {
    const time = new Date(createdAt);
    return time.toLocaleString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [createdAt]);

  // content to be displayed - not editable
  const editor = useEditor({
    extensions: [
      ...defaultExtensions,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Underline,
    ],
    content: content as Content,
    editable: false,
  });

  return (
    <div className="border-bottom rounded-[--radius] border-secondary px-4 pb-4 shadow-sm">
      <EditorContent
        editor={editor}
        className="prose-headings:font-title font-default prose prose-lg dark:prose-invert focus:outline-none"
      />
      <div className="flex items-center gap-4">
        <span className="mr-auto text-xs text-[gray]">{date}</span>
        <LikeButton liked={liked!} likes={likes!} postId={id} />
        <ButtonMenu postId={id} authorId={authorId} saved={saved!} />
      </div>
    </div>
  );
};

export default Card;
