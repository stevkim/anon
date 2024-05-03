'use client';
import { useMemo } from 'react';
import { useEditor, EditorContent, type Content } from '@tiptap/react';
import { defaultExtensions } from '@/components/Editor/extensions';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import LikeButton from './Buttons/LikeButton';
import ButtonWrapper from './ButtonWrapper';
import type { TPost } from '@/types/posts';

interface Props {
	post: TPost;
	menuId: string;
	toggle: (id: string) => void;
}

const Card = ({ post, menuId, toggle }: Props) => {
	const { content, liked, likes, id, saved, authorId, createdAt } = post;
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
		<div className="border border-secondary p-4 rounded-md">
			<EditorContent
				editor={editor}
				className="prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full"
			/>
			<div className="flex gap-4 items-center">
				<div className="text-[gray] text-xs mr-auto">{date}</div>
				<LikeButton
					liked={liked!}
					likes={likes!}
					postId={id}
				/>
				<ButtonWrapper
					postId={id}
					authorId={authorId}
					saved={saved!}
					open={menuId === id}
					toggle={toggle}
				/>
			</div>
		</div>
	);
};
// 2024-05-03T22:38:42.360Z

export default Card;
