"use client";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useRef, useMemo } from "react";
import Card from "./Card";
import MainFeedLoader from "../Loaders/MainFeedLoader";
import useThrottle from "@/hooks/useThrottle";
import usePosts from "@/hooks/usePosts";
import ComponentLoader from "../Loaders/ComponentLoader";
import NoMorePosts from "../Widgets/NoMorePosts";

interface Props {
  queryKey: string;
  fetchFn: (pageParam: number) => Promise<any[]>;
}

const Display = ({ queryKey, fetchFn }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { posts, getNextPage, hasNextPage, isLoading, isFetching } = usePosts(
    queryKey,
    fetchFn,
  );

  //
  const infiniteScroll = useInfiniteScroll(
    contentRef,
    getNextPage,
    hasNextPage,
  );
  // throttles the infinite scroll to every 200ms
  const throttled = useThrottle(infiniteScroll, 200);

  const content = useMemo(() => {
    return posts.map((post) => {
      return <Card key={post.id + post.liked} post={post} />;
    });
  }, [posts]);

  if (isLoading) {
    return <MainFeedLoader />;
  }

  return (
    <div
      className="no-scrollbar flex h-[90vh] w-full flex-col gap-4 overflow-auto pb-4"
      ref={contentRef}
      onScroll={throttled}
    >
      {content}
      {isFetching ? <ComponentLoader /> : <NoMorePosts />}
    </div>
  );
};

export default Display;
