'use client';
import { useRouter } from 'next/navigation';

const LoginButton = () => {
	const { push } = useRouter();

	return <button onClick={() => push('/login')}>log in</button>;
};

export default LoginButton;
