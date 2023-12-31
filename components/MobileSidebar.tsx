import { Menu } from "lucide-react"
import Sidebar from "./Sidebar"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger className="md:hidden pr-4">
            <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
            <Sidebar isPro={false} />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar