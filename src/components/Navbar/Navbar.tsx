import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ThemeToggle from './ThemeToggle';

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
		<nav className="flex flex-row px-[10%] bg-secondary">
			<Link
				href={'/'}
				className="mr-auto text-3xl font-logo"
			>
				anon.
			</Link>
			<div className="flex gap-4 items-center mr-4">
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
				{user ? <LogoutButton /> : <LoginButton />}
			</div>
			<ThemeToggle />
		</nav>
	);
};

export default Navbar;
