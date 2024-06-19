import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/db/client";
import { createClient } from "@/utils/supabase/server";
import { getUserPosts, getLikes, getSaved } from "@/db/Controllers";

// get Posts that the user has written
// expects the pages from searchParams - /api/saved?page={PAGE}
export async function GET(request: NextRequest) {
  const supabase = createClient();
  const LIMIT = 50;
  const PAGE: number = Number(request.nextUrl.searchParams.get("page")) || 0;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const userLikes = new Map();
    const userSaved = new Map();

    const [likes, posts, saved] = await Promise.all([
      getLikes(user!.id),
      getUserPosts(user!.id, LIMIT, PAGE),
      getSaved(user!.id),
    ]);

    const maxLength = Math.max(likes.length, saved.length);

    // keeping track of the post that the user has liked/saved
    for (let i = 0; i < maxLength; i++) {
      if (likes[i]) {
        userLikes.set(likes[i].postId, likes[i].id);
      }
      if (saved[i]) {
        userSaved.set(saved[i].postId, saved[i].id);
      }
    }

    let results = posts.map((post) => ({
      ...post,
      liked: userLikes.get(post.id),
      saved: userSaved.get(post.id),
      authorId: "author",
    }));

    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
