import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/db/client";
import { createClient } from "@/utils/supabase/server";
import { getPosts, getLikes, getSaved } from "@/db/Controllers";

// get latest posts -
// expects a page # in searchParams - /api/post?page={PAGE}
// maps liked and saved posts if an authenticated user is connected
export async function GET(request: NextRequest) {
  const supabase = createClient();
  const LIMIT = 50;
  const PAGE: number = Number(request.nextUrl.searchParams.get("page")) || 0;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (user?.id) {
      const userLikes = new Map();
      const userSaved = new Map();

      const [posts, likes, saved] = await Promise.all([
        getPosts(LIMIT, PAGE),
        getLikes(user.id),
        getSaved(user.id),
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

      // if the post's author is the user, reset the authorId to 'author'
      // create flags for liked and saved posts - will be undefined if not exists
      let results = posts.map((post) => {
        return {
          ...post,
          authorId: post.authorId === user.id ? "author" : post.authorId,
          liked: userLikes.get(post.id),
          saved: userSaved.get(post.id),
        };
      });

      return NextResponse.json({ data: results }, { status: 200 });
    } else {
      const posts = await getPosts(LIMIT, PAGE);

      return NextResponse.json({ data: posts }, { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

/*
	POST request: adds a Post to the database
	-- only authenticated users can post --
	newPost (req.body) =
	{
		content: JSONVALUE
	}
*/
export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const newPost = await request.json();

  try {
    await prisma.post.create({
      data: {
        ...newPost,
        authorId: user?.id,
      },
    });

    return NextResponse.json({}, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE a post
// expects a specific postId from searchParams - /api/post?id={postId}
// verified on the frontend that the user sending this request is the author
export async function DELETE(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get("id") as string;

  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
