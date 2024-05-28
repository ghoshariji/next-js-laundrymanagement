import mongoDb from "@/lib/mongoDb";
import { NextResponse } from "next/server";
import user from "@/models/user";
import bcryptjs from "bcryptjs"

export async function POST(req) {
    try {
        const { email, hostel, room, name, password } = await req.json();
        await mongoDb()
        const checkEmail = await user.findOne({ email: email })
        if (checkEmail) {
            return NextResponse.json({ message: "User already exist" }, { status: 401 });
        }
        const hassPassword = await bcryptjs.hash(password, 10);
        const data = new user({ name, email, password: hassPassword, hostel, room });
        await data.save();
        return NextResponse.json({ message: "Register Succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 401 })

    }
}