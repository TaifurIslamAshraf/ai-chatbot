import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChatClient from "../components/ChatClient";

interface ChaiIdProps {
  params: {
    chatId: string;
  };
}


const page = async ({ params }: ChaiIdProps) => {
  const session = await getServerSession(authOptions);
  const { chatId } = params;
  const celebrityMsg = await db.celebrity.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId: session?.user.id,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if(!celebrityMsg){
    redirect("/chatbot")
  }

  return <div>
    <ChatClient celebrity={celebrityMsg} />
  </div>;
};

export default page;
