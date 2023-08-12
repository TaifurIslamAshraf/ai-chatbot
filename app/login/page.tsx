import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
         <LoginForm />
        </TabsContent>
        <TabsContent value="register">
           <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
