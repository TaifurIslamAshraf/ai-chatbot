import Navbar from "@/components/Navbar"

const layout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <div className="h-full">
        <Navbar />
        <main className="h-full md:pl-20 pt-16">
        {children}
        </main>
    </div>
  )
}

export default layout