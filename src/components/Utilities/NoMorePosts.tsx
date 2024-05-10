interface Props {
	message?: string;
}

const NoMorePosts = ({ message = "You've reached the end" }: Props) => {
	return (
		<div className="mx-auto max-w-lg p-5 my-10 text-center rounded-md shadow-md">
			<p className="text-lg text-gray-600">{message}</p>
		</div>
	);
};

export default NoMorePosts;
