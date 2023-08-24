import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface ParamsProps {
  params: { celebrityId: string };
}

export async function PATCH(req: Request, { params }: ParamsProps) {
  const session: any = await getServerSession(authOptions);
  const isPro = await checkSubscription()
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

    if(!isPro){
      return new NextResponse("Pro subscription is required", {status: 403})
    }

    const celebrity = await db.celebrity.update({
      where: {
        id: params.celebrityId,
        userId: session?.user.id
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

export async function DELETE(req: Request, { params }: ParamsProps) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorize user", { status: 401 });
    }

    const celebrity = await db.celebrity.delete({
      where: {
        userId: session?.user.id,
        id: params.celebrityId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "AI Chat deleted successfully",
      celebrity,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
