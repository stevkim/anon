import { Loader2 } from "lucide-react";

interface Props {
  message?: string;
}

const ButtonLoader = ({ message = "Updating" }: Props) => {
  return (
    <>
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="ml-2 whitespace-nowrap">{message}</span>
    </>
  );
};

export default ButtonLoader;
