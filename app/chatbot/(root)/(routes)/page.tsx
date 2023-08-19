import Celebrity from "@/components/Celebrity";
import Cetegory from "@/components/Cetegory";
import SearchInput from "@/components/SearchInput";
import db from "@/lib/db";

interface RootProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function Home({ searchParams }: RootProps) {
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
      <div className="p-4 space-y-2 h-full">
        <SearchInput />
        <Cetegory data={cetegory} />
        <Celebrity data={data} />
      </div>
  );
}
