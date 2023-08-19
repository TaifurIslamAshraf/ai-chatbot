import Protected from "@/components/Protected"

const ChatLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <Protected>
    <div className="mx-auto w-full h-full max-w-4xl">
        {children}
    </div>
    </Protected>
  )
}

export default ChatLayout