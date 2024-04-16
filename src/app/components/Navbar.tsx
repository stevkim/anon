import Link from 'next/link';

const NAVS = [
	{
		name: 'home',
		link: '/',
	},
	{
		name: 'feed',
		link: '/feed',
	},
	{
		name: 'account',
		link: '/account',
	},
];

const Navbar = () => {
	return (
		<nav className="flex flex-row px-4">
			<Link
				href={'/'}
				className="mr-auto text-xl"
			>
				anon.
			</Link>
			<div className="flex gap-4">
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
			</div>
		</nav>
	);
};

export default Navbar;
