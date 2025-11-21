import jwt, {JwtPayload} from "jsonwebtoken";
import {NextRequest, NextResponse} from "next/server";

export const getDataFromJWT = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    return decodedToken.id as string | undefined;
  } catch (error) {
    console.error("Error in verify email route:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
};
