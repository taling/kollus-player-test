import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// 여기에 JWT 토큰 생성 API를 구현해주세요
export async function GET(request: NextRequest) {

  // JWT 생성 방법
  // 암호화 알고리즘은 HMAC SHA256 (HS256) 으로 하고, Secret key는 보안 키, Payload에는 아래 Payload Spec에 맞춘 JSON String을 추가하여 JWT를 생성합니다.
  
  const jwtPayload = {
      "cuid": "taling-dev",
      "expt": Math.floor(Date.now() / 1000) + 3600, // 유효시간 일단은 1시간
      "mc": [{
        "mckey": request.nextUrl.searchParams.get("media_content_key")
      }]
  }
  const jwtToken = jwt.sign(jwtPayload, process.env.SECURITY_KEY ? process.env.SECURITY_KEY : "");

  return new Response(
    JSON.stringify({"url": `http://v.kr.kollus.com/s?jwt=${jwtToken}&custom_key=${process.env.CUSTOM_KEY}`}),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  )

}
export async function POST(request: NextRequest) {}
