import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



import { db } from "@/db";



export async function GET(request){
    try {

        const user = await db.user.findMany();

        const response = NextResponse.json(user)
        
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
