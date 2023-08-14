import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected = async ({ children }: ProtectedProps) => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return <>{children}</>;
  } else {
    return (
      <>
        {redirect("/signin")}
        {toast.error("Please signin")}
      </>
    );
  }
};

export default Protected;
