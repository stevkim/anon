import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/db/client";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import {
  createLikeRecord,
  updatePostLikes,
  deleteLikeRecord,
} from "@/db/Controllers";

/*
	POST request - like a post, tied to the user
	-- only authenticated users can like a post --
	postId is from path - /api/post/like/{postId}
*/
export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const postId = request.nextUrl.pathname.split("/")[4];

  try {
    const [record] = await prisma.$transaction([
      createLikeRecord(postId, user!.id),
      updatePostLikes(postId, "increment"),
    ]);

    revalidatePath("/", "layout");

    return NextResponse.json({ data: record }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

// unlike a post - decrement the likes column for the post and deletes record of like
// postId is from the path, record is from the searchParams - /api/post/like/{postId}?record={record}
export async function DELETE(request: NextRequest) {
  const postId = request.nextUrl.pathname.split("/")[4];
  const record = request.nextUrl.searchParams.get("record") as string;

  try {
    await Promise.all([
      updatePostLikes(postId, "decrement"),
      deleteLikeRecord(record),
    ]);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
