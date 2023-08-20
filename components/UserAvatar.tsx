import { Avatar, AvatarImage } from "@/components/ui/avatar"

const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="/user-placherholder.jpg" className="object-cover" />
    </Avatar>
  )
}

export default UserAvatar