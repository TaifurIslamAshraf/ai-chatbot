'use client'

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { Button } from "./ui/button"

const GoogleBtn = () => {
  return (
    <div>
        <Button className="w-full space-x-2" onClick={()=> signIn("github")}>
            <FcGoogle size={25} /> <span>Sign in With Google</span>
        </Button>
    </div>
  )
}

export default GoogleBtn