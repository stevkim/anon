'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function passwordLogin(formData: FormData) {
	const supabase = createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	});

	if (error) {
		return { error: error.message };
	}

	revalidatePath('/', 'layout');
	redirect('/');
}

export async function signup(formData: FormData) {
	const supabase = createClient();

	const { error } = await supabase.auth.signUp({
		email: formData.get('email') as string,
		password: formData.get('password') as string,
		options: {
			data: {
				first_name: formData.get('firstName'),
				last_name: formData.get('lastName'),
			},
		},
	});

	if (error) {
		return { error: error.message };
	}

	revalidatePath('/', 'layout');
	redirect('/');
}

export async function signout() {
	const supabase = createClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		console.log(error);
		redirect('/error');
	}

	revalidatePath('/', 'layout');
	redirect('/');
}
