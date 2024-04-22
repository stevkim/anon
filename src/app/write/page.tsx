import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import EditorContainer from '@/components/Editor/EditorContainer';

const Write = async () => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user?.id) {
		redirect('/login');
	}

	return (
		<>
			<EditorContainer />
		</>
	);
};

export default Write;
