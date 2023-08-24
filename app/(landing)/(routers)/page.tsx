import Hero from "@/components/Hero"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


const page = async () => {
  const session = await getServerSession(authOptions)

  if(session?.user){
    redirect("/chatbot")
  }
  return (
    <div className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 w-full h-screen">
        <Hero />
    </div>
  )
}

export default page