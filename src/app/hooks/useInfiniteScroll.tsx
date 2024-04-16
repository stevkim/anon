interface ScrollableElement extends HTMLElement {
	scrollTop: number;
	clientHeight: number;
	scrollHeight: number;
}

interface Props {
	el: React.RefObject<ScrollableElement>;
	fn: () => void;
	more: boolean;
}

const useInfiniteScroll = ({ el, fn, more }: Props) => {
	const handleScroll = () => {
		const { scrollTop, clientHeight, scrollHeight } =
			el.current as ScrollableElement;
		if (scrollTop + clientHeight > scrollHeight - 300) {
			fn();
		}
	};

	return handleScroll;
};

export default useInfiniteScroll;
