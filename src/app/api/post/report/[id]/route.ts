import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/db/client";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { createReport, updatePostReports } from "@/db/methods";
import { Prisma } from "@prisma/client";

// creates a report for a post
export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const postId = request.nextUrl.pathname.split("/")[4];
  const data = await request.json();

  try {
    await prisma.$transaction([
      createReport(postId, data, user!.id),
      updatePostReports(postId),
    ]);

    revalidatePath("/", "layout");

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" // Error code P2002 indicates a report for this post/user exists
    ) {
      return NextResponse.json(
        { error: "You may only submit 1 report per post." },
        { status: 403 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
