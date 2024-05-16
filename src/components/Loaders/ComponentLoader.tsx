import { Loader } from "lucide-react";

const ComponentLoader = () => {
  return (
    <div className="mx-auto mt-4 h-fit w-fit">
      <Loader className="mx-auto h-10 w-10 animate-spin-slow text-gray-400" />
    </div>
  );
};

export default ComponentLoader;
