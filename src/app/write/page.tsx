'use client';
import { useState } from 'react';
import { createPost } from '@/lib/fetch';
import Editor from '@/components/Editor';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Write = () => {
	const { push } = useRouter();
	const [content, setContent] = useState('');

	const submit = async () => {
		const response = await createPost({ content: content });

		if (!response.ok) {
			toast.error('Internal server error');
		}

		toast.success('Post Created');
		push('/');
	};

	return (
		<>
			<Editor setContent={setContent} />
			<button
				type="submit"
				onClick={submit}
			>
				Submit
			</button>
		</>
	);
};

export default Write;
