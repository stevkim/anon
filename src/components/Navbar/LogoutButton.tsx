'use client';
import { signout } from '@/actions/authActions';
import { useToast } from '../ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { push } = useRouter();

	const logout = async () => {
		await signout();
		toast({ title: 'Successfully Logged out' });

		queryClient.invalidateQueries({ queryKey: ['posts'] });
		push('/');
	};

	return <button onClick={logout}>logout</button>;
};

export default LogoutButton;
