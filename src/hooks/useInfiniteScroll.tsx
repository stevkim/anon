interface ScrollableElement extends HTMLElement {
	scrollTop: number;
	clientHeight: number;
	scrollHeight: number;
}

const useInfiniteScroll = (
	el: React.RefObject<ScrollableElement>,
	fn: () => void,
	nextPage: boolean
) => {
	const handleScroll = () => {
		const { scrollTop, clientHeight, scrollHeight } =
			el.current as ScrollableElement;

		// calculate scroll position to be 300px from the bottom
		if (scrollTop + clientHeight > scrollHeight - 300 && nextPage) {
			fn();
		}
	};

	return handleScroll;
};

export default useInfiniteScroll;
