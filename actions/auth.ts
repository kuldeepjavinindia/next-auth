"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import axios from "axios";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};




export const loginAction = async (
  values,
  // callbackUrl=null,
) => {

  
  const { email, password } = values


  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Invalid credentials!" }
      }
    }

    throw error;
  }
};


export const registerAction = async (credentials: any) => {
  try {
    const res = await axios.post('http://localhost:8050/api/auth/register', credentials)
    
    if(res.data.data){

      console.log('res.data.data >> ', res.data.data)
        return { success: "success", data:res.data.data }
    }
    
  } catch (error) {
    // console.log('error >> ', error.response.data)
    return error?.response?.data || null;

    throw error;
    
  }

}

