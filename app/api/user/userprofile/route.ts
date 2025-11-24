import {connectDB} from "@/db/dbConfig";
import User from "@/models/userModels";
import {NextResponse, NextRequest} from "next/server";
import {getDataFromJWT} from "@/utility/getDataFromJWT";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const userId = getDataFromJWT(request);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }
    return NextResponse.json(user, {status: 200});
  } catch (error) {
    console.error("Error in profile update route:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
};
