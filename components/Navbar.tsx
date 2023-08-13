import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import SigninBtn from "./SigninBtn";

const poppins = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <div className="fixed z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary w-full">
      <div className="flex items-center">
        <Menu className="md:hidden block cursor-pointer" />
        <Link href={"/"}>
          <h1
            className={cn(
              "text-primary font-bold text-xl md:text-3xl hidden md:block",
              poppins.className
            )}
          >
            celebrity.ai
          </h1>
        </Link>
      </div>
        <SigninBtn />
    </div>
  );
};

export default Navbar;
