import mongoDb from "@/lib/mongoDb";
import user from "@/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
export async function POST(req) {
    try {
        const { email, password } = await req.json()
        await mongoDb();
        const checkEmail = await user.findOne({ email: email })
        if (!checkEmail) {
            return NextResponse({ message: "User dont Exist" }, { status: 401 })
        }
        const passwordMatch = await bcryptjs.compare(password, checkEmail.password)
        if (!passwordMatch) {
            return NextResponse.json({ message: "Incorrect Password",status: 401 })
        }
        return NextResponse.json({ message: "Login succesfully", status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Something wnet wrong" }, { status: 401 })
    }
}