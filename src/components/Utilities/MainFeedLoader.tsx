import { Heart, EllipsisVertical } from 'lucide-react';

const CardSkeleton = () => {
	return (
		<div className="flex flex-col w-full rounded-md h-[450px] gradient-loader p-4">
			<div className="w-[80%] h-[20%] bg-muted mt-2 rounded-md"></div>
			<div className="w-[90%] h-[10%] bg-muted mt-8 rounded-md"></div>
			<div className="w-[90%] h-[5%] bg-muted mt-2 rounded-md"></div>
			<div className="w-[90%] h-[10%] bg-muted mt-2 rounded-md"></div>
			<div className="w-[90%] h-[5%] bg-muted mt-2 ml-4 rounded-md"></div>
			<div className="w-[90%] h-[5%] bg-muted mt-2 ml-4 rounded-md"></div>
			<div className="w-full flex items-center text-gray-400 gap-4 mt-auto">
				<span className="mr-auto text-xs">x/x/xxxx, xx:xx xx</span>
				<div className="flex items-center">
					<Heart size={16} />
					<span className="ml-1">{'0'}</span>
				</div>
				<EllipsisVertical size={16} />
			</div>
		</div>
	);
};

const MainFeedLoader = () => {
	return (
		<section className="flex flex-col gap-4 w-full h-[90vh] overflow-auto no-scrollbar">
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
		</section>
	);
};

export default MainFeedLoader;