import useThrottle from './useThrottle';

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
	const throttledFn = useThrottle({ fn, delay: 100 });
	const handleScroll = () => {
		const { scrollTop, clientHeight, scrollHeight } =
			el.current as ScrollableElement;
		if (scrollTop + clientHeight > scrollHeight - 300) {
			throttledFn();
		}
	};

	return handleScroll;
};

export default useInfiniteScroll;
