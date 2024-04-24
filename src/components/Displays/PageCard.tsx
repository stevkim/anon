'use client';
import type { TPost } from '@/types/posts';
import { useEditor, EditorContent, type Content } from '@tiptap/react';
import { defaultExtensions } from '@/components/Editor/extensions';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import LikeButton from './Buttons/LikeButton';
import ButtonWrapper from './ButtonWrapper';
import { useState } from 'react';

interface Props {
	post: TPost;
}

const PageCard = ({ post }: Props) => {
	const [open, setOpen] = useState(false);
	const { content, liked, likes, id, saved, authorId } = post;

	const editor = useEditor({
		extensions: [
			...defaultExtensions,
			TextStyle,
			Highlight.configure({ multicolor: true }),
		],
		content: content as Content,
		editable: false,
	});

	return (
		<div>
			<EditorContent
				editor={editor}
				className="prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full"
			/>
			<div className="flex gap-4 text-gray-400 items-center">
				<LikeButton
					liked={liked!}
					likes={likes!}
					postId={id}
				/>
				<ButtonWrapper
					postId={id}
					authorId={authorId}
					saved={saved!}
					open={open}
					toggle={() => setOpen(!open)}
				/>
			</div>
		</div>
	);
};

export default PageCard;
