"use client";

import { ChatMessagesProps } from "@/types";
import { ElementRef, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";

const ChatMessages = ({
  messages = [],
  isLoading,
  celebrity,
}: ChatMessagesProps) => {
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );
  const scrollRef = useRef<ElementRef<"div">>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(()=>{
    scrollRef?.current?.scrollIntoView({behavior: "smooth"})
  },[messages.length])

  return (
    <div className="flex-grow overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-primary/10 h-full">
      <ChatMessage
        isLoading={fakeLoading}
        src={celebrity.src}
        role="system"
        content={`Hello i am ${celebrity.name}, ${celebrity.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          src={celebrity.src}
          role={message.role}
          content={message.content}
        />
      ))}
      {isLoading && <ChatMessage src={celebrity.src} isLoading role="system" />}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
