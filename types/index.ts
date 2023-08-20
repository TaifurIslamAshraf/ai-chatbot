import { Celebrity, Message } from "@prisma/client";
import { ChatRequestOptions } from "ai";
import { ChangeEvent, FormEvent } from "react";

export interface UserType {
  username: string;
  email: string;
  password: string;
}

export interface CelebrityProps {
  data: (Celebrity & {
    _count: {
      messages: number;
    };
  })[];
}


export interface ChatClientProps {
  celebrity: Celebrity & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export interface BotAvater {
  src: string
}

export interface ChatFormProps {
  isLoading: boolean,
  handleInputChange: (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)=> void,
  onSubmit: (e:FormEvent<HTMLFormElement>, chatRequestOptions?:ChatRequestOptions | undefined )=> void,
  input: string
}

export interface ChatMessagesProps {
  messages: ChatMessageProps[],
  isLoading: boolean,
  celebrity: Celebrity
}

export interface ChatMessageProps {
  role: "user" | "system",
  src?: string,
  isLoading?: boolean,
  content?:string
}