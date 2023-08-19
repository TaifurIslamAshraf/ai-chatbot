
import { ChatClientProps } from "@/types";
import { MessageSquare } from "lucide-react";
import BackBtn from "./BackBtn";
import BotAvatar from "./BotAvatar";
import ChatOptions from "./ChatOptions";

const ChatHeader = ({ celebrity }: ChatClientProps) => {

  return (
    <div className="pb-4 flex justify-between items-center border-b border-primary/10 w-full">
      <div className="flex items-center gap-x-2">
       <BackBtn />
        <BotAvatar src={celebrity.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex gap-x-2">
            <p className="font-bold">{celebrity.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-1" />
              {celebrity._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Created by {celebrity.userName}</p>
        </div>
      </div>
      <ChatOptions celebrity={celebrity} />
    </div>
  );
};

export default ChatHeader;
