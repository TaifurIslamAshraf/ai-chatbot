"use client";

import { useCompletion } from "ai/react";

import { ChatClientProps, ChatMessageProps } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";

const ChatMain = ({ celebrity }: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(celebrity.messages);
  const { handleSubmit, handleInputChange, input, isLoading, setInput } =
    useCompletion({
      api: `/api/chat/${celebrity.id}`,
      onFinish(prompt, completion) {
        const systemMessage:ChatMessageProps = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");
        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage:ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };

  return <div className="flex flex-col h-[84vh]">
    <ChatMessages
    messages={messages}
    isLoading={isLoading}
    celebrity={celebrity} 
    />
    <ChatForm
    isLoading={isLoading}
    handleInputChange={handleInputChange}
    onSubmit={onSubmit}
    input={input} 
    />
  </div>;
};

export default ChatMain;
