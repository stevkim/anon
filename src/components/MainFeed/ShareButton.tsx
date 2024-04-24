import { Share2, Copy } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Props {
	postId: string;
}

const ShareButton = ({ postId }: Props) => {
	const url = `${process.env.URL}/post?id=${postId}`;

	// TODO: toast a message that the url has been copied
	const copyLink = () => {
		navigator.clipboard.writeText(url);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button>
					<Share2
						size={16}
						fill="currentColor"
					/>
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>
						Anyone who has this link will be able to view the content.
					</DialogDescription>
				</DialogHeader>
				<div className="flex w-full gap-4">
					<Label
						htmlFor="link"
						className="sr-only"
					>
						Link
					</Label>
					<Input
						id="link"
						defaultValue={url}
						readOnly
					/>
					<Button
						onClick={copyLink}
						size={'icon'}
					>
						<Copy size={16} />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ShareButton;