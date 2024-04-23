'use client';
import LoginForm from '@/components/Forms/LoginForm';
import { Separator } from '@/components/ui/separator';

const Login = () => {
	return (
		<section className="page flex flex-col gap-4 items-center">
			<h1>Login to anon.</h1>
			<LoginForm />
			<Separator />
		</section>
	);
};

export default Login;
