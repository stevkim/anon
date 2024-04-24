'use client';
import { signout } from '@/actions/authActions';
import { useToast } from '../ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

const LogoutButton = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const logout = async () => {
		await signout();
		toast({ title: 'Successfully Logged out' });

		queryClient.invalidateQueries({ queryKey: ['posts'] });
	};

	return <button onClick={logout}>logout</button>;
};

export default LogoutButton;
