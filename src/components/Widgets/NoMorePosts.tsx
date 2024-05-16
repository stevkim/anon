interface Props {
  message?: string;
}

const NoMorePosts = ({ message = "You've reached the end" }: Props) => {
  return (
    <div className="mx-auto my-5 max-w-lg rounded-md p-5 text-center">
      <p className="font-logo text-lg text-gray-600">{message}</p>
    </div>
  );
};

export default NoMorePosts;
