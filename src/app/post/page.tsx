import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/db/client";
import { type TPost } from "@/types/posts";
import Card from "@/components/Displays/Card";

const getData = async (id: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await prisma.post.findFirst({
    where: {
      id,
    },
  });

  if (!data) {
    redirect("/");
  }

  let withFlags: TPost = data;

  if (user?.id) {
    const [liked, saved] = await Promise.all([
      prisma.likes.findFirst({
        where: {
          userId: user?.id,
          postId: id,
        },
      }),
      prisma.saved.findFirst({
        where: {
          userId: user?.id,
          postId: id,
        },
      }),
    ]);

    withFlags = {
      ...data,
      liked: liked?.id,
      saved: saved?.id,
    };
  }

  return withFlags;
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
