import { ChatClientProps } from "@/types"
import ChatHeader from "./ChatHeader"


const ChatClient = ({celebrity}:ChatClientProps) => {
  return (
    <div className="p-4 space-y-2 flex flex-col h-full">
        <ChatHeader celebrity={celebrity} />
    </div>
  )
}

export default ChatClient