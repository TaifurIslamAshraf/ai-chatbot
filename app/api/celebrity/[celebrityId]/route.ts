import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface ParamsProps {
  params: { celebrityId: string };
}

export async function PATCH(req: Request, { params }: ParamsProps) {
  const session: any = await getServerSession(authOptions);
  try {
    const body = await req.json();
    const { src, name, description, instruction, seed, categoryId } = body;
    if (!session?.user || !session) {
      return new NextResponse("Unauthrized", { status: 401 });
    }

    if (!src || !name || !description || !instruction || !seed || !categoryId) {
      return new NextResponse("All field are required", { status: 400 });
    }

    if (!params.celebrityId) {
      return new NextResponse("AI Bot id is required", { status: 400 });
    }

    //TODO: Check for subcription

    const celebrity = await db.celebrity.update({
      where: {
        id: params.celebrityId,
      },
      data: {
        name,
        description,
        src,
        instruction,
        seed,
        categoryId,
        userId: session.user?.id,
        userName: session.user?.username,
      },
    });

    return NextResponse.json(celebrity);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
