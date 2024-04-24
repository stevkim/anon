import useThrottle from './useThrottle';

interface ScrollableElement extends HTMLElement {
	scrollTop: number;
	clientHeight: number;
	scrollHeight: number;
}

interface Props {
	el: React.RefObject<ScrollableElement>;
	fn: () => void;
	nextPage: boolean;
}

const useInfiniteScroll = ({ el, fn, nextPage }: Props) => {
	// throttles the passed in function by the delay amount
	const throttledFn = useThrottle({ fn, delay: 500 });
	const handleScroll = () => {
		const { scrollTop, clientHeight, scrollHeight } =
			el.current as ScrollableElement;

		// calculate scroll position to be 300px from the bottom
		if (scrollTop + clientHeight > scrollHeight - 300 && nextPage) {
			throttledFn();
		}
	};

	return handleScroll;
};

export default useInfiniteScroll;
