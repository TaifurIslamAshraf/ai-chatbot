'use client'

import axios from "axios"
import { Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

const DeleteCelebrity = ({celebrityId}:{celebrityId: string}) => {
    const router = useRouter()
    const handleClick = async ()=>{
        try {
            await axios.delete(`/api/celebrity/${celebrityId}`)
            toast.success("Delete Successfull")
            router.refresh()
            router.push("/chatbot")
        } catch (error) {
            toast.error("Somthing went wrong")
        }
    }

  return (
    <Link href="#" onClick={handleClick} className="flex items-center">
        <Trash className="w-4 h-4 mr-2" /> Delete
    </Link>
  )
}

export default DeleteCelebrity