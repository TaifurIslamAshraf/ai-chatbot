import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session:any = await getServerSession(authOptions);
  const isPro = await checkSubscription()
  try {
    const body = await req.json();
    const { src, name, description, instruction, seed, categoryId } = body;
    if (!session?.user || !session) {
      return new NextResponse("Unauthrized", { status: 401 });
    }

    if (!src || !name || !description || !instruction || !seed || !categoryId) {
        return new NextResponse("All field are required", {status: 400})
    }

    if(!isPro){
      return new NextResponse("Pro subscription is required", {status: 403})
    }

    const celebrity = await db.celebrity.create({
        data:{
            name,
            description,
            src,
            instruction,
            seed,
            categoryId,
            userId: session.user?.id,
            userName: session.user?.username
        }
    })

    return NextResponse.json(celebrity)

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
