import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected = async ({ children }: ProtectedProps) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/signin");
  }
  return <>{children}</>;
};

export default Protected;
