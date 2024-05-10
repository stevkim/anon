import ShareButton from './Buttons/ShareButton';
import { EllipsisVertical } from 'lucide-react';
import ReportButton from './Buttons/ReportButton';
import SaveButton from './Buttons/SaveButton';
import DeleteButton from './Buttons/DeleteButton';
import { useContext } from 'react';
import { MenuContext } from '@/app/providers';

interface Props {
	postId: string;
	saved: string;
	authorId: string;
}

const ButtonWrapper = ({ postId, saved, authorId }: Props) => {
	const { menu, setMenu } = useContext(MenuContext);

	const handleToggle = () => {
		if (menu === postId) {
			setMenu('');
		} else {
			setMenu(postId);
		}
	};

	return (
		<div
			className="relative flex items-center text-sm"
			onClick={(e) => e.stopPropagation()}
		>
			<button onClick={handleToggle}>
				<EllipsisVertical
					size={16}
					className={`transition-all ${
						menu === postId ? 'rotate-90' : 'rotate-0'
					}`}
				/>
			</button>
			{menu === postId ? (
				<div className="absolute bottom-[20px] right-[-1rem] p-2 flex flex-col gap-1 z-[100] text-xs bg-white">
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
