import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Tabs defaultValue="signin" className="w-[400px]">
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
