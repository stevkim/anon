'use client';
import { signout } from '@/actions/authActions';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const LogoutButton = () => {
	const queryClient = useQueryClient();

	const logout = async () => {
		await signout();
		toast.success('Successfully Logged out');

		queryClient.invalidateQueries({ queryKey: ['posts'] });
	};

	return <button onClick={logout}>logout</button>;
};

export default LogoutButton;
