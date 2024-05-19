import type { TPost } from "@/types/posts";

// fetch posts by page number -- each page is 50 posts
export const fetchPosts = async (page: number) => {
  const response = await fetch(`/api/post?page=${page}`, {
    next: { revalidate: 60, tags: ["posts"] },
  });
  const results = await response.json();
  return results.data as TPost[];
};

// create a post -- data is an object with the contents of the post
export const createPost = async (data: { content: JSON }) => {
  const results = await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });
  return results;
};

// delete a post -- only author can delete
export const deletePost = async (postId: string) => {
  const results = await fetch(`/api/post?id=${postId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  return results;
};

// like a post -- path is the id of the post
export const likePost = async (postId: string) => {
  const results = await fetch(`/api/post/like/${postId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  return await results.json();
};

// unlike a post
export const unlikePost = async (postId: string, record: string) => {
  const results = await fetch(`/api/post/like/${postId}?record=${record}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  return results;
};

// report a post
export const reportPost = async (postId: string, data: { reason: string }) => {
  const results = await fetch(`/api/post/report/${postId}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });
  return results;
};
