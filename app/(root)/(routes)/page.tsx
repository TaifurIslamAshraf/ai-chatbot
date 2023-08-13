import Protected from "@/components/Protected";


export default async function Home() {

  return (
    <Protected>
   <div>
    Hello World
   </div>
   </Protected>
  )
}
