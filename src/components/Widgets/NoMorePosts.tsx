import { ReactNode } from "react";

interface Props {
  message?: string;
  icon?: ReactNode;
}

const NoMorePosts = ({ message = "You've reached the end", icon }: Props) => {
  return (
    <div className="mx-auto my-5 flex max-w-lg select-none items-center justify-center rounded-md p-5 text-center text-gray-600">
      <p className="mx-2 text-lg ">{message}</p>
      {icon ? <>{icon}</> : null}
    </div>
  );
};

export default NoMorePosts;
