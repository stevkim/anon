import defaultValue from '../components/Editor/defaultValue';

const defaultStringList = new Set([
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
]);

/*
	checks to make sure the length of the new post is at least 3 lines
	checks to make sure less than 20% of the lines match the default stringlist
*/

// returns true if valid, false if not valid
export default function validateContent(content: typeof defaultValue): boolean {
	// content must have at least 2 lines
	if (content.content.length < 2) {
		return false;
	}
	let similarStrings = 0;

	const contentList: string[] = getList(content);

	for (let str of contentList) {
		if (defaultStringList.has(str)) {
			similarStrings++;
		}
	}

	const similarity = similarStrings / defaultStringList.size;

	// returns boolean: similarity to the default must be less than 20%
	return similarity < 0.2;
}

// iterates the content and returns the string list
function getList(content: typeof defaultValue): string[] {
	const textList: string[] = [];

	let stack: any[] = [...content.content];

	while (stack.length) {
		const current = stack.shift();

		if (current!.content) {
			current?.content.forEach((obj: any) => {
				stack.push(obj);
			});
		}
		if (current.text) {
			textList.push(current.text);
		}
	}

	return textList;
}
