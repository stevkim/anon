"use client";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useRef, useMemo, useState } from "react";
import Card from "./Card";
import MainFeedLoader from "../Loaders/MainFeedLoader";
import useThrottle from "@/hooks/useThrottle";
import usePosts from "@/hooks/usePosts";
import ComponentLoader from "../Loaders/ComponentLoader";
import NoMorePosts from "../Widgets/NoMorePosts";
import BackTotop from "./BackToTop";

interface Props {
  queryKey: string;
  fetchFn: (pageParam: number) => Promise<any[]>;
}

const Display = ({ queryKey, fetchFn }: Props) => {
  const [backToTop, setBackToTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { posts, getNextPage, hasNextPage, isLoading, isFetching } = usePosts(
    queryKey,
    fetchFn,
  );

  const infiniteScroll = useInfiniteScroll(
    contentRef,
    getNextPage,
    hasNextPage,
    setBackToTop,
  );
  // throttles the infinite scroll to every 200ms
  const throttled = useThrottle(infiniteScroll, 200);

  const content = useMemo(() => {
    return posts.map((post) => {
      return <Card key={post.id + post.liked} post={post} />;
    });
  }, [posts]);

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <MainFeedLoader />;
  }

  return (
    <div
      data-testid={`content-display-${queryKey}`}
      className="no-scrollbar relative flex h-[90vh] w-full flex-col gap-4 overflow-auto pb-4"
      ref={contentRef}
      onScroll={throttled}
    >
      {content}
      {isFetching ? <ComponentLoader /> : <NoMorePosts />}
      {backToTop ? <BackTotop scrollToTop={scrollToTop} /> : null}
    </div>
  );
};

export default Display;
