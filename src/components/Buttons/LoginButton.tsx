'use client';
import { useRouter } from 'next/navigation';

const LoginButton = () => {
	const { push } = useRouter();

	const goToLogin = () => {
		push('/login');
	};

	return <button onClick={goToLogin}>log in</button>;
};

export default LoginButton;
