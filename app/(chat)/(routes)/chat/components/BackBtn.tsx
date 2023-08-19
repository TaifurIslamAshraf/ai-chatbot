'use client'

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const BackBtn = () => {

    const router = useRouter()

  return (
    <Button onClick={() => router.back()} size="icon" variant="ghost">
    <ChevronLeft className="h-8 w-8" />
  </Button>
  )
}

export default BackBtn