'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import { defaultExtensions } from '@/components/Editor/extensions';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import LikeButton from './LikeButton';
import ReportButton from './ReportButton';

interface Props {
	post: any;
}

const Card = ({ post }: Props) => {
	const { content, liked, likes, id } = post;

	const editor = useEditor({
		extensions: [
			...defaultExtensions,
			TextStyle,
			Highlight.configure({ multicolor: true }),
		],
		content: content,
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
					liked={liked}
					likes={likes}
					postId={id}
				/>
				<ReportButton postId={id} />
			</div>
		</div>
	);
};

export default Card;
