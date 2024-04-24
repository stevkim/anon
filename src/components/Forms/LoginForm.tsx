'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { passwordLogin } from '@/actions/authActions';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/lib/validateSchema';
import PasswordField from './Fields/PasswordField';

const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const { push } = useRouter();
	const { toast } = useToast();

	const { register } = useForm({
		resolver: zodResolver(loginSchema),
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
			return toast({ description: error, variant: 'destructive' });
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
			<PasswordField register={register} />
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
