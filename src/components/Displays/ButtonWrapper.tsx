import { useState } from 'react';
import ShareButton from './Buttons/ShareButton';
import { EllipsisVertical } from 'lucide-react';
import ReportButton from './Buttons/ReportButton';
import SaveButton from './Buttons/SaveButton';
import DeleteButton from './Buttons/DeleteButton';

interface Props {
	postId: string;
	saved: string;
	authorId: string;
}

const ButtonWrapper = ({ postId, saved, authorId }: Props) => {
	const [open, toggleOpen] = useState(false);

	return (
		<div className="relative flex items-center text-sm">
			<button onClick={() => toggleOpen((prev) => !prev)}>
				<EllipsisVertical
					size={16}
					className={`transition-all ${open ? 'rotate-180' : 'rotate-0'}`}
				/>
			</button>
			{open ? (
				<div className="absolute bottom-[20px] right-[-1rem] p-2 flex flex-col gap-1 z-[100]">
					<ShareButton postId={postId} />
					<SaveButton
						postId={postId}
						saved={saved}
					/>
					<ReportButton postId={postId} />
					{authorId === 'author' ? <DeleteButton postId={postId} /> : null}
				</div>
			) : null}
		</div>
	);
};

export default ButtonWrapper;
