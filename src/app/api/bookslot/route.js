import mongoDb from "@/lib/mongoDb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(req) {
    console.log(req)
  try {

    const reqData = await req.json();
    console.log(reqData)
    await mongoDb();
    const data = new Order(reqData)
    await data.save();
    return NextResponse.json(
      { message: "Submit succesfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Submit failed" }, { status: 401 });
  }
}
