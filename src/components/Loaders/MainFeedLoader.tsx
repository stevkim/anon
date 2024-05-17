import { Heart, EllipsisVertical } from "lucide-react";
import "./loaders.css";

const CardSkeleton = () => {
  return (
    <div className="gradient-loader flex h-[450px] w-full flex-col rounded-md p-4">
      <div className="mt-2 h-[20%] w-[80%] rounded-md bg-muted"></div>
      <div className="mt-8 h-[10%] w-[90%] rounded-md bg-muted"></div>
      <div className="mt-2 h-[5%] w-[90%] rounded-md bg-muted"></div>
      <div className="mt-2 h-[10%] w-[90%] rounded-md bg-muted"></div>
      <div className="ml-4 mt-2 h-[5%] w-[90%] rounded-md bg-muted"></div>
      <div className="ml-4 mt-2 h-[5%] w-[90%] rounded-md bg-muted"></div>
      <div className="mt-auto flex w-full items-center gap-4 text-gray-400">
        <span className="mr-auto text-xs">x/x/xxxx, xx:xx xx</span>
        <div className="flex items-center">
          <Heart size={16} />
          <span className="ml-1">{"0"}</span>
        </div>
        <EllipsisVertical size={16} />
      </div>
    </div>
  );
};

const MainFeedLoader = () => {
  return (
    <section className="no-scrollbar flex h-[90vh] w-full flex-col gap-4 overflow-auto">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </section>
  );
};

export default MainFeedLoader;
