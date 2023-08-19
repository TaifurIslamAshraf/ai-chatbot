import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authOptions } from "@/lib/auth";
import { ChatClientProps } from "@/types";
import { Edit, MoreVertical } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import DeleteCelebrity from "./DeleteCelebrity";

const ChatOptions = async ({ celebrity }: ChatClientProps) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user.id === celebrity.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="secondary">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href={`/chatbot/celebrity/${celebrity.id}`}
                className="flex w-full"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <DeleteCelebrity celebrityId={celebrity.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ChatOptions;
