'use client'

import { Tilt_Prism } from "next/font/google";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Partnar from "./Partnar";
import SigninBtn from "./SigninBtn";
import TypingAnim from "./TypingAnim";
import { Button } from "./ui/button";

const tiltPrism = Tilt_Prism({subsets: ["latin"]})

const Hero = () => {

  const router = useRouter()

  const onClick = ()=>{
    router.push("/signin")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between h-20 items-center px-5">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">CELEBRITY.AI</h1>
        <SigninBtn />
      </div>
      <div className="text-center flex items-center justify-center flex-col space-y-10">
        <div className="mb-10 space-y-4">
          <h1 className={cn(
            "lg:text-[45px] sm:text-[40px] xs:text-[30px] text-[30px] bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 inline-block mt-20 text-transparent bg-clip-text font-extrabold",
            tiltPrism.className
          )}>
            Making AI Celebrity for Fun!
          </h1>
          <TypingAnim />
          <Button
          onClick={onClick}
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-medium"
          >
            GET STARTED
          </Button>
        </div>
        <Partnar />
      </div>
    </div>
  );
};

export default Hero;
