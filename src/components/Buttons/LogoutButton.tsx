'use client';
import { signout } from '@/actions/authActions';
import { toast } from 'react-hot-toast';

const LogoutButton = () => {
	const logout = async () => {
		await signout();
		toast.success('Successfully Logged out');
	};

	return <button onClick={logout}>logout</button>;
};

export default LogoutButton;
