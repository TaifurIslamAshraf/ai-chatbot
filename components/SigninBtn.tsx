"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

const SigninBtn = () => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <Button variant="destructive" onClick={() => signOut()}>
          Sign Out
        </Button>
      ) : (
        <Link href={"/signin"} className={buttonVariants()}>
          Sign In
        </Link>
      )}
    </>
  );
};

export default SigninBtn;
