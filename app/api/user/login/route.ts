import {connectDB} from "@/db/dbConfig";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import {NextResponse, NextRequest} from "next/server";
import jws from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const {email, password} = await request.json();
    console.log(email, password);
    const user = await User.findOne({email});
    if (!user) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({message: "Invalid password"}, {status: 400});
    }
    const token = jws.sign(
      {email: user.email, id: user._id},
      process.env.JWT_SECRET as string,
      {expiresIn: "1d"}
    );
    const response = NextResponse.json(
      {message: "Login successful"},
      {status: 200}
    );
    response.cookies.set("token", token, {httpOnly: true});
    return response;
  } catch (error) {
    console.error("Error in verify email route:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
};
