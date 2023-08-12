import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import * as z from 'zod';

//validate user schema with zod
const userSchema = z.object({
  username: z.string().min(1, "Username is required").min(5, "Username must be at least 5 characters."),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters."),   
})

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = userSchema.parse(body)
    //check if email alredy exist
    const isEmailExist = await db.user.findUnique({
      where: { email: email },
    });

    if (isEmailExist) {
      return NextResponse.json(
        { user: null, message: "User alredy exist with email" },
        { status: 409 }
      );
    }

    //check if username alredy exist
    const isUsernameExist = await db.user.findUnique({
      where: { username: username },
    });

    if (isUsernameExist) {
      return NextResponse.json(
        { user: null, message: "User alredy exist with username" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        success: true,
        message: "User create successfully",
        newUser: rest,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "somthing wrong" },
      { status: 400 }
    );
  }
}
