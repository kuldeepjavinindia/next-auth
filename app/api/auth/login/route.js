import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



import { db } from "@/db";



export async function POST(request){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;

        //check if user exists
        const user = await db.user.findUnique({
                where: {
                  email,
                },
              });


              
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.hashedPassword)

        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        } 


        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            data:user
        })
        
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
