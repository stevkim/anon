'use client';
import LoginForm from '@/components/Forms/LoginForm';
import { Separator } from '@/components/ui/separator';
import GoogleLogin from '@/components/Forms/GoogleLogin';

const Login = () => {
	return (
		<section className="page flex flex-col gap-4 items-center">
			<h1>Login to anon.</h1>
			<LoginForm />
			<Separator />
			<GoogleLogin />
		</section>
	);
};

export default Login;
