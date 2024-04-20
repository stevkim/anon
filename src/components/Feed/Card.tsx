'use client';
import dynamic from 'next/dynamic';
import LikeButton from './LikeButton';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
	post: any;
}

const Card = ({ post }: Props) => {
	const { content, liked, likes, id } = post;

	return (
		<div className="">
			<ReactQuill
				modules={{ toolbar: false }}
				value={content}
				readOnly
			/>
			<LikeButton
				liked={liked}
				likes={likes}
				postId={id}
			/>
		</div>
	);
};

export default Card;
