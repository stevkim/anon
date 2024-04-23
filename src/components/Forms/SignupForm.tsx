import { signup } from '@/actions/authActions';
import toast from 'react-hot-toast';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/lib/validateSchema';
import PasswordField from './Fields/PasswordField';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
	const { push } = useRouter();

	const { register } = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

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
		<form className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor="firstName">First Name:</Label>
			<Input
				type="text"
				id="firstName"
				placeholder="first name"
				{...register('firstName')}
			/>
			<Label htmlFor="lastName">Last Name:</Label>
			<Input
				type="text"
				id="lastName"
				placeholder="last name"
				{...register('lastName')}
			/>
			<Label htmlFor="email">Email:</Label>
			<Input
				type="email"
				id="email"
				placeholder="email"
				{...register('email')}
			/>
			<PasswordField register={register} />
			<Label htmlFor="firstName">Confirm Password:</Label>
			<Input
				type="password"
				id="confirmPassword"
				placeholder="confirm password"
				{...register('confirmPassword')}
			/>
			<div className="w-full flex gap-2 mt-2">
				<Button
					className="w-[50%]"
					formAction={passwordSignUp}
				>
					Sign up
				</Button>
				<Button
					onClick={(e) => {
						e.preventDefault();
						push('/login');
					}}
					className="w-[50%]"
				>
					Back to Login
				</Button>
			</div>
		</form>
	);
};

export default SignupForm;