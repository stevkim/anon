'use client';
import { createClient } from '@/utils/supabase/client';
import google_logo from '../../../public/google_logo.svg';
import Image from 'next/image';
import { Button } from '../ui/button';

const GoogleLogin = () => {
	const handleLogin = async () => {
		const supabase = createClient();

		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: process.env.URL + '/api/auth/callback',
			},
		});
	};

	return (
		<Button
			onClick={handleLogin}
			className="flex items-center w-full max-w-sm"
		>
			<Image
				className="w-[30px] h-[30px] mr-1"
				src={google_logo}
				alt="google logo"
			/>
			Sign in with Google
		</Button>
	);
};

export default GoogleLogin;
