'use client';
import { signup } from '@/actions/authActions';
import Link from 'next/link';
import toast from 'react-hot-toast';

const Signup = () => {
	const passwordSignUp = async (formData: FormData) => {
		if (formData.get('password') !== formData.get('confirmPassword')) {
			return toast.error('Passwords must match');
		}
		const { error } = await signup(formData);

		if (error) {
			toast.error(error);
		}
	};

	return (
		<form className="flex flex-col">
			<label>
				First Name:
				<input
					type="text"
					name="firstName"
				/>
			</label>
			<label>
				Last Name:
				<input
					type="text"
					name="lastName"
				/>
			</label>
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
			<label>
				Confirm Password:
				<input
					type="text"
					name="confirmPassword"
				/>
			</label>
			<div className="flex gap-4">
				<button formAction={passwordSignUp}>Sign up</button>
				<Link href={'/login'}>Back To login</Link>
			</div>
		</form>
	);
};

export default Signup;
