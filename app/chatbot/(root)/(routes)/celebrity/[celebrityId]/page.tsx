import CelebrityForm from "@/components/CelebrityForm";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";

interface CelebrityIdProps {
  params: {
    celebrityId: string;
  };
}

const page = async ({ params }: CelebrityIdProps) => {

  const session = await getServerSession(authOptions)

  //Todo: check subcription

  const celebrity = await db.celebrity.findUnique({
    where: {
      userId: session?.user.id,
      id: params.celebrityId,
    },
  });

  const cetegorys = await db.cetegory.findMany();

  return <CelebrityForm initialData={celebrity} cetegory={cetegorys} />;
};

export default page;
