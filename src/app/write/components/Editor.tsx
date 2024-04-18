import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const options = [
	['bold', 'italic', 'underline', 'strike'],
	['blockquote', 'code-block'],
	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ indent: '-1' }, { indent: '+1' }],
	[{ size: ['small', false, 'large', 'huge'] }],
];

interface Props {
	setContent: (val: string) => void;
}

const Editor = ({ setContent }: Props) => {
	return (
		<ReactQuill
			modules={{ toolbar: options }}
			onChange={setContent}
		/>
	);
};

export default Editor;
