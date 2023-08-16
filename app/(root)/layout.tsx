import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

const layout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <div className="h-full">
        <Navbar />
        <div className="mt-16 hidden md:flex flex-col fixed inset-y-0">
          <Sidebar />
        </div>
        <main className="h-full md:pl-24 pt-16">
        {children}
        </main>
    </div>
  )
}

export default layout