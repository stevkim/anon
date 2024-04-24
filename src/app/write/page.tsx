import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import EditorContainer from '@/components/Editor/EditorContainer';
import { Suspense } from 'react';

const Write = async () => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user?.id) {
		redirect('/login');
	}

	return (
		<section className="page">
			<Suspense fallback={<div>Loading...</div>}>
				<EditorContainer />
			</Suspense>
		</section>
	);
};

export default Write;
