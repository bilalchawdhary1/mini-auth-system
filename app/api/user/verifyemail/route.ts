import {connectDB} from "@/db/dbConfig";
import User from "@/models/userModels";
import {NextResponse, NextRequest} from "next/server";
export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const {userId, token} = await request.json();
    console.log(userId, token);
    const user = await User.findOne({
      _id: userId,
      verifyToken: token,
      verifyTokenExpiry: {$gt: Date.now()},
    });

    if (!user) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {message: "Email verified successfully", success: true},
      {status: 200}
    );
  } catch (error) {
    console.error("Error in verify email:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
};
