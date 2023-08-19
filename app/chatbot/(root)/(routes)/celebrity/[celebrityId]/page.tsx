import CelebrityForm from "@/components/CelebrityForm";
import db from "@/lib/db";

interface CelebrityIdProps {
  params: {
    celebrityId: string;
  };
}

const page = async ({ params }: CelebrityIdProps) => {


  //Todo: check subcription

  const celebrity = await db.celebrity.findUnique({
    where: {
      id: params.celebrityId,
    },
  });

  const cetegorys = await db.cetegory.findMany();

  return <CelebrityForm initialData={celebrity} cetegory={cetegorys} />;
};

export default page;
