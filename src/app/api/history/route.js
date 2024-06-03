import mongoDb from "@/lib/mongoDb"
import Order from "@/models/order"
import { NextResponse } from "next/server";

export async function GET()
{
    try {
        await mongoDb()
        const data = await Order.find({});
        return NextResponse.json({message:"Fetching succesfully",data},{status:201})
    } catch (error) {
        return NextResponse.json({message:"Failed"},{status:401})
    }
}