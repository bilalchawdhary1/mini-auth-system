import {connectDB} from "@/db/dbConfig";
import {NextRequest, NextResponse} from "next/server";

// HERE'S YOUR LOGOUT ROUTE!
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const response = NextResponse.json(
      {message: "Logout successful", sucess: true},
      {status: 200}
    );
    response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
    return response;
  } catch (error) {
    console.error("Error in verify email route:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
};
