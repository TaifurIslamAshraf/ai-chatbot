'use client'

import { useProModal } from "@/hooks/useProModal"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Separator } from "./ui/separator"

const ProModal = () => {

    const proModal = useProModal()
    const [isLoading, setIsLoading] = useState(false)

    const onSubscribe = async ()=>{
        try {
            setIsLoading(true)
            const response = await axios.get("/api/stripe")
            window.location.href = response.data.url
        } catch (error) {
            toast.error("Somthing went wrong")
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
            <DialogHeader className="space-y-4">
                <DialogTitle className="text-center">Upgrade To Pro</DialogTitle>
                <DialogDescription className="text-center space-y-2">
                Create Your Won Custom Chatbot AI
            </DialogDescription>
            <Separator />
            <div className="flex items-center justify-between">
                <p className="text-2xl font-medium">
                    $9<span className="text-sm font-normal">.99 / mo</span>
                </p>
            <Button onClick={onSubscribe} disabled={isLoading} variant={"premium"}>Subscribe</Button>
            </div>
            </DialogHeader>
            
        </DialogContent>
    </Dialog>
  )
}

export default ProModal