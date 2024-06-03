import mongoDb from "@/lib/mongoDb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // console.log(req.json());
    // console.log(req.body)
    const { email } = await req.json();
    console.log(email);
    await mongoDb();
    const data = await Order.find({ email: email });
    console.log(data);
    return NextResponse.json(
      { message: "Fetching succesfully", data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Failed" }, { status: 401 });
  }
}
