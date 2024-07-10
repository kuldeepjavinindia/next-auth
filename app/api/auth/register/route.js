import { NextResponse } from "next/server";
import { db } from "@/db";
import { saltAndHashPassword } from "@/utils/helper";



export async function POST(request){
    try {

        const reqBody = await request.json()
        const {name, email, password} = reqBody;

        let user = await db.user.findUnique({
            where: {
              email,
            },
          });
        if(user){
            return NextResponse.json({error: "User already exist"}, {status: 400})
        }

        const hash = saltAndHashPassword(password);
        const data = {
            name,
            email,
            hashedPassword: hash,
          }


        console.log('reqBody >>> ', reqBody, data);


        let newUser = await db.user.create({
            data,
          });
          
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            data:newUser
        })
        
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}