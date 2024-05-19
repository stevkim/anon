import type { TPost } from "@/types/posts";

// GET list of user's created posts
export const fetchUserPosts = async (page: number) => {
  const response = await fetch(`/api/user?page=${page}`);
  const results = await response.json();
  return results.data as TPost[];
};

// gets list of saved posts by the user
export const fetchSavedPosts = async (page: number) => {
  const response = await fetch(`/api/user/saved?page=${page}`);
  const results = await response.json();
  return results.data as TPost[];
};

// saves a post for the user
export const savePost = async (postId: string) => {
  const results = await fetch(`/api/user/saved/${postId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  return await results.json();
};

// unsave a post for the user
export const unsavePost = async (postId: string, record: string) => {
  const results = await fetch(`/api/user/saved/${postId}?record=${record}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  return results;
};
