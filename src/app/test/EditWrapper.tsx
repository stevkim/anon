'use client';
import Editor from './edit';
import { useState, useEffect } from 'react';
import type { JSONContent } from 'novel';
import Display from './display';

const EditWrapper = () => {
	const [content, setContent] = useState<JSONContent>({
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: {
					level: 1,
				},
				content: [
					{
						type: 'text',
						text: 'Header!',
					},
				],
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Current message',
					},
				],
			},
			{
				type: 'paragraph',
			},
		],
	});

	useEffect(() => {
		console.log(content);
	}, [content]);

	return (
		<div className="w-[80%] mx-auto text-lg">
			<Editor
				initialContent={content}
				onChange={setContent}
			/>
			<Display content={content} />
		</div>
	);
};

export default EditWrapper;
