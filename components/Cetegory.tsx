"use client";

import { cn } from "@/lib/utils";
import { Cetegory } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CetegoryProps {
  data: Cetegory[];
}

const Cetegory = ({ data }: CetegoryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (id: string | undefined) => {
    const query = { cetegory: id };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    });

    router.push(url);
  };

  const cetegoryId = searchParams.get("cetegory")

  return (
    <div className="w-full space-x-2 overflow-x-auto flex p-1">
      <button
        className={cn(
          "flex items-center bg-primary/10 hover:opacity-80 text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md transition",
          !cetegoryId && "bg-primary/25"
        )}
        onClick={() => handleClick(undefined)}
      >
        Newest
      </button>
      {data.map((item) => {
        return (
          <button
            key={item.id}
            className={cn(
              "flex items-center bg-primary/10 hover:opacity-80 text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md transition",
              item.id === cetegoryId ? "bg-primary/25" : "bg-primary/10"
              
            )}
            onClick={() => handleClick(item.id)}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default Cetegory;
