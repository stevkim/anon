'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/server';

export async function passwordLogin(formData: FormData) {
	const supabase = createClient();

	const { data, error } = await supabase.auth.signInWithPassword({
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	});
	console.log(data);

	if (error) {
		return { error };
	}

	revalidatePath('/', 'layout');
	redirect('/');
}

export async function signup(formData: FormData) {
	const supabase = createClient();

	const input = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};
	console.log(input);

	const { data, error } = await supabase.auth.signUp(input);

	console.log(data);

	if (error) {
		console.log(error);
		// redirect('/error');
	}

	// revalidatePath('/', 'layout');
	// redirect('/');
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
