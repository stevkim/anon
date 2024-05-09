'use client';
import { useMemo } from 'react';
import { useEditor, EditorContent, type Content } from '@tiptap/react';
import { defaultExtensions } from '@/components/Editor/extensions';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import LikeButton from './Buttons/LikeButton';
import ButtonWrapper from './ButtonWrapper';
import type { TPost } from '@/types/posts';

interface Props {
	post: TPost;
}

const Card = ({ post }: Props) => {
	const { content, liked, likes, id, saved, authorId, createdAt } = post;
	// format the date
	const date = useMemo(() => {
		const time = new Date(createdAt);
		return time.toLocaleString([], {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
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
		<div className="border border-secondary p-4 rounded-md">
			<EditorContent
				editor={editor}
				className="prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full"
			/>
			<div className="flex gap-4 items-center">
				<span className="text-[gray] text-xs mr-auto">{date}</span>
				<LikeButton
					liked={liked!}
					likes={likes!}
					postId={id}
				/>
				<ButtonWrapper
					postId={id}
					authorId={authorId}
					saved={saved!}
				/>
			</div>
		</div>
	);
};
// 2024-05-03T22:38:42.360Z

export default Card;
