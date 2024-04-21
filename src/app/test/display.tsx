import { type JSONContent } from 'novel';
import { useEditor, EditorContent } from '@tiptap/react';
import { defaultExtensions } from './extensions';

interface Props {
	content: JSONContent;
}

const Display = ({ content }: Props) => {
	const editor = useEditor({
		extensions: [...defaultExtensions],
		content: content,
		editable: false,
	});

	return (
		<EditorContent
			editor={editor}
			className="prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full"
		/>
	);
};

export default Display;
