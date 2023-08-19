import Image from "next/image";

import { CelebrityProps } from "@/types";
import Link from "next/link";
import { Card, CardFooter, CardHeader } from "./ui/card";

import { BiMessageRoundedCheck } from "react-icons/bi";

const Celebrity = ({ data }: CelebrityProps) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col justify-center items-center gap-y-4">
        <div className="relative w-40 h-32">
          <Image
            className="grayscale rounded-lg"
            src="/empty.jpg"
            fill
            alt="empty"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Not found any AI Chat bot
        </p>
      </div>
    );
  }

  return (
    <div
      className="
    grid grid-cols-2 
    sm:grid-cols-3 
    md:grid-cols-4 
    lg:grid-cols-5
    xl:grid-cols-6
    gap-2 pb:10
    "
    >
      {data.map((item) => (
        <Card
          key={item.id}
          className="bg-primary/10 rounded-xl hover:opacity-75 cursor-pointer transition border-0"
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-muted-foreground text-center">
              <div className="relative h-32 w-32">
                <Image
                  src={item.src}
                  alt="chat bot pic"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <p className="font-bold">{item.name}</p>
              <p className="text-xs">{item.description}</p>
            </CardHeader>
            <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                <p className="lowercase">@{item.userName}</p>
                <div className="flex items-center gap-2">
                <BiMessageRoundedCheck />
                {item._count.messages}
                </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Celebrity;
