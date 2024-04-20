import Editor from '@/components/Write/Editor';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

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
			<Editor />
		</>
	);
};

export default Write;
