import Navbar from "@/components/Navbar";
import Protected from "@/components/Protected";
import Sidebar from "@/components/Sidebar";
import { checkSubscription } from "@/lib/subscription";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const isPro = await checkSubscription();

  return (
    <div className="h-full">
      <Protected>
        <Navbar isPro={isPro} />
        <div className="mt-16 hidden md:flex flex-col fixed inset-y-0">
          <Sidebar isPro={isPro} />
        </div>
        <main className="h-full md:pl-24 pt-16">{children}</main>
      </Protected>
    </div>
  );
};

export default layout;
