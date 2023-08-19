import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { BotAvater } from "@/types"

const BotAvater = ({src}:BotAvater) => {
  return (
    <Avatar>
      <AvatarImage src={src} className="object-cover" />
    </Avatar>
  )
}

export default BotAvater