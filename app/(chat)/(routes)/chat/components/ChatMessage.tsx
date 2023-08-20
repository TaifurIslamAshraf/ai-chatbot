"use client";
import { Comment } from "react-loader-spinner";

import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatMessageProps } from "@/types";
import { Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "react-hot-toast";
import BotAvater from "./BotAvatar";

const ChatMessage = ({ content, isLoading, src, role }: ChatMessageProps) => {
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  };

  return <div className={cn(
    "flex items-start gap-x-2 py-4 w-full group",
    role === "user" && "justify-end"
  )}>
    {role !== "user" && src && <BotAvater src={src} />}
    <div className="px-4 py-2 text-sm bg-primary/10 max-w-sm rounded-md">
      {
        isLoading ? <Comment
        visible={true}
        height="30"
        width="40"
        color={theme === "light" ? "black" : "white"}
      /> : content
      }
    </div>
    {role === "user" && <UserAvatar />}
    {role !== "user" && !isLoading && (
      <Button
      onClick={onCopy}
      size="icon"
      variant="ghost"
      className="opacity-0 group-hover:opacity-100 transition"
      >
        <Copy className="w-4 h-4" />
      </Button>
    )}
  </div>;
};

export default ChatMessage;
