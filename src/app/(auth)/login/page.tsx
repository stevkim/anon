'use client';
import { toast } from 'react-hot-toast';
import { passwordLogin } from '@/actions/authActions';
import Link from 'next/link';
import LoginForm from '@/components/Forms/LoginForm';

const Login = () => {
	const loginWithPassword = async (formData: FormData) => {
		const { error } = await passwordLogin(formData);

		if (error) {
			return toast.error(error);
		}
	};

	return (
		<section className="page flex justify-center">
			<LoginForm />
		</section>
	);
};

export default Login;
