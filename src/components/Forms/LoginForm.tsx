'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import { passwordLogin } from '@/actions/authActions';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const LoginForm = () => {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const { push } = useRouter();

	const { register } = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const loginWithPassword = async (formData: FormData) => {
		setLoading(true);
		const { error } = await passwordLogin(formData);

		setLoading(false);
		if (error) {
			return toast.error(error);
		}
	};

	return (
		<form className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor="email">Email:</Label>
			<Input
				type="email"
				id="email"
				placeholder="email"
				{...register('email')}
			/>
			<fieldset>
				<Label htmlFor="password">Password:</Label>
				<Input
					type={visible ? 'text' : 'password'}
					id="password"
					placeholder="password"
					{...register('password')}
				/>
				<span
					onClick={() => setVisible(!visible)}
					className="relative float-right block top-[-1.7em] right-[.8em] cursor-pointer"
				>
					{visible ? (
						<EyeOff
							size={16}
							color="gray"
						/>
					) : (
						<Eye
							size={16}
							color="gray"
						/>
					)}
				</span>
			</fieldset>
			<div className="w-full flex gap-2">
				<Button
					className="w-[50%]"
					formAction={loginWithPassword}
				>
					Login
				</Button>
				<Button
					disabled={loading}
					onClick={(e) => {
						e.preventDefault();
						push('/signup');
					}}
					className="w-[50%]"
				>
					Sign up
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
