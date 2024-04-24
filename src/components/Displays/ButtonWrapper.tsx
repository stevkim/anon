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
	open: boolean;
	toggle: (id: string) => void;
}

const ButtonWrapper = ({ postId, saved, authorId, open, toggle }: Props) => {
	return (
		<div className="relative flex items-center text-sm">
			<button onClick={() => toggle(postId)}>
				<EllipsisVertical
					size={16}
					className={`transition-all ${open ? 'rotate-90' : 'rotate-0'}`}
				/>
			</button>
			{open ? (
				<div className="absolute bottom-[16px] left-[16px] bg-white p-2 border flex flex-col gap-1 rounded-md">
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
