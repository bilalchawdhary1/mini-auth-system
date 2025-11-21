import {connectDB} from "@/db/dbConfig";
import User from "@/models/userModels";
import {sendEmail} from "@/utility/mailer";
import bcrypt from "bcryptjs";
import {NextResponse, NextRequest} from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const {username, email, password} = await request.json();
    console.log(username, email, password);
    const existingUser = await User.findOne({
      $or: [{email}, {username}],
    }).exec();
    if (existingUser) {
      return NextResponse.json(
        {message: "User with this email or username already exists"},
        {status: 400}
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // send verification email
    await sendEmail(email, "VERIFY", newUser._id);
    return NextResponse.json(
      {message: "User registered successfully"},
      {status: 201}
    );
  } catch (error) {
    console.error("Error in signup route:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
};
