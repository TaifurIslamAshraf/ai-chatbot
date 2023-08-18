import Cetegory from "@/components/Cetegory";
import Protected from "@/components/Protected";
import SearchInput from "@/components/SearchInput";
import db from "@/lib/db";

interface RootProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function Home({ searchParams }: RootProps) {
  console.log(searchParams);
  const cetegory = await db.cetegory.findMany();

  const data = await db.celebrity.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Protected>
      <div className="p-4 space-y-2 h-full">
        <SearchInput />
        <Cetegory data={cetegory} />
      </div>
    </Protected>
  );
}
