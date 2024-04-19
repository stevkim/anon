import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import LoginButton from './Buttons/LoginButton';
import LogoutButton from './Buttons/LogoutButton';

const NAVS = [
	{
		name: 'home',
		link: '/',
	},
	{
		name: 'write',
		link: '/write',
	},
	{
		name: 'account',
		link: '/account',
	},
];

const Navbar = async () => {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<nav className="flex flex-row px-4">
			<Link
				href={'/'}
				className="mr-auto text-xl"
			>
				anon.
			</Link>
			<div className="flex gap-4 items-center">
				{NAVS.map((nav) => {
					return (
						<Link
							key={nav.name}
							href={nav.link}
						>
							{nav.name}
						</Link>
					);
				})}
				{user?.id ? <LogoutButton /> : <LoginButton />}
			</div>
		</nav>
	);
};

export default Navbar;
