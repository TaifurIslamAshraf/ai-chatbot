'use client'

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import SigninBtn from "./SigninBtn";
import { Button } from "./ui/button";

import { useProModal } from "@/hooks/useProModal";
import { MdWorkspacePremium } from "react-icons/md";
import MobileSidebar from "./MobileSidebar";
import { ModeToggle } from "./ThemeBtn";

const poppins = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const Navbar = () => {

  const proModal = useProModal()

  return (
    <div className="fixed z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary w-full h-16">
      <div className="flex items-center">
        <MobileSidebar />
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
       <div className="flex items-center gap-x-3">
        <Button onClick={proModal.onOpen} variant="premium" size="sm">Upgrade <MdWorkspacePremium size={18} className="fill-white" /></Button>
        <ModeToggle />
       <SigninBtn />
       </div>
    </div>
  );
};

export default Navbar;
