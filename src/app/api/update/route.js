import mongoDb from "@/lib/mongoDb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id, message, isPlaced } = await req.json();
  console.log(id, message, isPlaced);
  try {
    await mongoDb();
    const data = await Order.findByIdAndUpdate(
      id,
      { message: message, isPlaced: isPlaced },
    );
    if (!data) {
      return NextResponse({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse({ message: "update" }, { status: 201 });
  } catch (error) {
    return NextResponse({ message: "update" }, { status: 401 });
  }
}
