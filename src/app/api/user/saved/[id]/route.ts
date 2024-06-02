import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/db/client";
import { revalidatePath } from "next/cache";

// saves a post for a user
// postId comes from the path - /api/saved/{postId}
// userId is authenticated from the supabase auth middleware
export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const postId = request.nextUrl.pathname.split("/")[4];

  console.log(postId);

  try {
    const record = await prisma.saved.create({
      data: {
        postId,
        userId: user?.id as string,
      },
    });

    console.log(record);

    revalidatePath("/saved");

    return NextResponse.json({ data: record }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

// removes a saved post from the user's list
// expects a record id (id of the row for saved posts) in searchParams - /api/saved/{postId}?record={record}
export async function DELETE(request: NextRequest) {
  const record = request.nextUrl.searchParams.get("record") as string;

  try {
    await prisma.saved.delete({
      where: {
        id: record,
      },
    });

    revalidatePath("/saved");

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
