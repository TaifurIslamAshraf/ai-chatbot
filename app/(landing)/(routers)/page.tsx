import { ButtonLoading } from "@/components/ButtonLoader"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


const page = async () => {
  const session = await getServerSession(authOptions)

  if(session?.user){
    redirect("/chatbot")
  }
  return (
    <div>
        <ButtonLoading />
    </div>
  )
}

export default page