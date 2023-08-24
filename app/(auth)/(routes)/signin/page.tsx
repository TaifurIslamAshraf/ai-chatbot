import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getServerSession(authOptions)

  if(session?.user){
    return redirect("/chabot")
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Tabs defaultValue="signin" className="w-[300px] md:w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="sign up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
         <LoginForm />
        </TabsContent>
        <TabsContent value="sign up">
           <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
