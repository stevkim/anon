import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/db/client";
import { type TPost } from "@/types/posts";
import Card from "@/components/Displays/Card";
import {
  getPostById,
  findLikeRecordByIds,
  findSavedRecordByIds,
} from "@/db/Controllers";

const getData = async (id: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await getPostById(id);

  if (!data) {
    redirect("/");
  }

  let post: TPost = data;

  if (user?.id) {
    // user?.id: userId, id: postId
    const [liked, saved] = await Promise.all([
      findLikeRecordByIds(user?.id, id),
      findSavedRecordByIds(user?.id, id),
    ]);

    post = {
      ...data,
      liked: liked?.id,
      saved: saved?.id,
    };
  }

  return post;
};

interface Props {
  searchParams: { id: string };
}

const PostPage = async ({ searchParams: { id } }: Props) => {
  if (!id) {
    redirect("/");
  }
  const data = await getData(id);

  return (
    <section className="page">
      <Card post={data} />
    </section>
  );
};

export default PostPage;
