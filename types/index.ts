import { Celebrity } from "@prisma/client";
import { Message } from "react-hook-form";

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