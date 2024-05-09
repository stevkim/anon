const defaultValue = {
	type: 'doc',
	content: [
		{
			type: 'heading',
			attrs: {
				level: 1,
			},
			content: [
				{
					text: 'Welcome to ',
					type: 'text',
				},
				{
					text: 'anon',
					type: 'text',
					marks: [
						{
							type: 'italic',
						},
					],
				},
				{
					text: '!',
					type: 'text',
				},
			],
		},
		{
			type: 'heading',
			attrs: {
				level: 2,
			},
			content: [
				{
					text: 'Rules to Contribute',
					type: 'text',
					marks: [
						{
							type: 'underline',
						},
					],
				},
			],
		},
		{
			type: 'orderedList',
			attrs: {
				start: 1,
				tight: true,
			},
			content: [
				{
					type: 'listItem',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									text: 'Respect: Be kind and refrain from offensive language',
									type: 'text',
								},
							],
						},
					],
				},
				{
					type: 'listItem',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									text: 'Original Content: Share your own writing; no plagiarism',
									type: 'text',
								},
							],
						},
					],
				},
				{
					type: 'listItem',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									text: 'Stay Appropriate: Follow legal and community standards',
									type: 'text',
								},
							],
						},
					],
				},
				{
					type: 'listItem',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									text: 'No Spamming: Keep posts relevant and avoid self-promotion',
									type: 'text',
								},
							],
						},
					],
				},
				{
					type: 'listItem',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									text: "Honor Copyrights: Respect others' creative work",
									type: 'text',
								},
							],
						},
					],
				},
				{
					type: 'listItem',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									text: 'Embrace Anonymity: No names, no identities, ever',
									type: 'text',
								},
							],
						},
					],
				},
				{
					type: 'listItem',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									text: 'Enjoy Sharing: Inspire and be inspired by the community!',
									type: 'text',
								},
							],
						},
					],
				},
			],
		},
	],
};

export const validateDefault = [
	'Welcome to ',
	'anon',
	'!',
	'Rules to Contribute',
	'Respect: Be kind and refrain from offensive language',
	'Original Content: Share your own writing; no plagiarism',
	'Stay Appropriate: Follow legal and community standards',
	'No Spamming: Keep posts relevant and avoid self-promotion',
	"Honor Copyrights: Respect others' creative work",
	'Embrace Anonymity: No names, no identities, ever',
	'Enjoy Sharing: Inspire and be inspired by the community!',
];

export default defaultValue;
