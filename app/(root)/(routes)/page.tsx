import Cetegory from "@/components/Cetegory";
import Protected from "@/components/Protected";
import SearchInput from "@/components/SearchInput";
import db from "@/lib/db";


export default async function Home() {
  
  const cetegory = await db.cetegory.findMany()

  return (
    <Protected>
   <div className="p-4 space-y-2 h-full">
    <SearchInput />
    <Cetegory data={cetegory} />
   </div>
   </Protected>
  )
}
