import defaultValue, {
	validateDefault,
} from '../components/Editor/defaultValue';

// returns true if valid, false if not valid
export default function validateContent(content: typeof defaultValue) {
	// content must have at least 2 lines
	if (content.content.length < 2) {
		return false;
	}

	const contentList: string[] = getList(content);
	console.log(contentList);
}

function getList(content: typeof defaultValue) {
	const textList: string[] = [];

	let stack: any[] = content.content;

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

console.log(validateContent(defaultValue));
