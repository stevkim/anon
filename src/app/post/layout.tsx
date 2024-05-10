import { ReactNode, Suspense } from 'react';
import ComponentLoader from '@/components/Utilities/ComponentLoader';

const PostLayout = async ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Suspense fallback={<ComponentLoader />}>{children}</Suspense>
		</>
	);
};

export default PostLayout;
