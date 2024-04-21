'use client';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createPost } from '@/lib/fetch';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const options = [
	[{ font: [] }],
	[{ size: ['small', false, 'large', 'huge'] }],
	['bold', 'italic', 'underline', 'strike'],
	['blockquote', 'code-block'],
	[{ color: [] }, { background: [] }],
	[{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
];

const Editor = () => {
	const [content, setContent] = useState('');
	const { push } = useRouter();

	const submit = async () => {
		const response = await createPost({ content: content });

		if (!response.ok) {
			return toast.error('Internal server error');
		}

		toast.success('Post Created');
		push('/');
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<ReactQuill
				modules={{ toolbar: options }}
				onChange={setContent}
				className="max-w-[1500px] w-[90%] editor min-h-[400px]"
				theme="snow"
			/>
			<button
				type="button"
				onClick={submit}
			>
				Submit
			</button>
		</div>
	);
};

export default Editor;
