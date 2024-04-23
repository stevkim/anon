'use client';
import SignupForm from '@/components/Forms/SignupForm';

const Signup = () => {
	return (
		<section className="page flex flex-col gap-4 items-center">
			<h1>Sign up for anon.</h1>
			<SignupForm />
		</section>
	);
};

export default Signup;
