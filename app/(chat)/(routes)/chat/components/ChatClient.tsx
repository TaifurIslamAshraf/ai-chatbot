
import { ChatClientProps } from "@/types"
import ChatHeader from "./ChatHeader"
import ChatMain from "./ChatMain"


const ChatClient = ({celebrity}:ChatClientProps) => {
  return (
    <div className="p-4 space-y-2 h-full">
        <ChatHeader celebrity={celebrity} />
        <ChatMain celebrity={celebrity} />
    </div>
  )
}

export default ChatClient