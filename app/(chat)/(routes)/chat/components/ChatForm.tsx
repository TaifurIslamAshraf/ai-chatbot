"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatFormProps } from "@/types";
import { SendHorizonal } from "lucide-react";

const ChatForm = ({
  isLoading,
  handleInputChange,
  onSubmit,
  input,
}: ChatFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-x-2 border-t border-primary/10 py-4"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type Your Message"
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant="ghost">
        <SendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default ChatForm;
