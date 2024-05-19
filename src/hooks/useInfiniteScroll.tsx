interface ScrollableElement extends HTMLElement {
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
}

const useInfiniteScroll = (
  el: React.RefObject<ScrollableElement>,
  fn: () => void,
  nextPage: boolean,
  setBackToTop: (set: boolean) => void,
) => {
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } =
      el.current as ScrollableElement;

    scrollTop > 500 ? setBackToTop(true) : setBackToTop(false);

    // calculate scroll position to be 300px from the bottom
    if (scrollTop + clientHeight > scrollHeight - 300 && nextPage) {
      fn();
    }
  };

  return handleScroll;
};

export default useInfiniteScroll;
