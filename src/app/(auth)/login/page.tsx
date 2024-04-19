'use client';
import { toast } from 'react-hot-toast';
import { passwordLogin } from '@/actions/authActions';
import Link from 'next/link';

const Login = () => {
	const loginWithPassword = async (formData: FormData) => {
		const { error } = await passwordLogin(formData);

		if (error) {
			return toast.error(error);
		}
	};

	return (
		<form className="flex gap-4 flex-col">
			<label>
				Email:
				<input
					type="text"
					name="email"
				/>
			</label>
			<label>
				Password:
				<input
					type="text"
					name="password"
				/>
			</label>
			<div className="flex gap-4">
				<button formAction={loginWithPassword}>Log in</button>
				<Link href={'/signup'}>Sign up</Link>
			</div>
		</form>
	);
};

export default Login;