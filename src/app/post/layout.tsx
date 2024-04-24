import { ReactNode, Suspense } from 'react';

const PostLayout = async ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
		</>
	);
};

export default PostLayout;
