'use client'

import axios from "axios"
import { Trash } from "lucide-react"
import Link from "next/link"
import { toast } from "react-hot-toast"

const DeleteCelebrity = ({celebrityId}:{celebrityId: string}) => {

    const handleClick = async ()=>{
        try {
            await axios.delete(`/api/celebrity/${celebrityId}`)
            toast.success("Delete Successfull")
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