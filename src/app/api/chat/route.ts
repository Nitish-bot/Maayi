import { getGeminiResponse } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";
import type { Message } from "@/types";

export async function POST(request: NextRequest) {
  const requestBody= await request.json();
  const messages: Message[] = requestBody.messages;

  try {
    const stream = await getGeminiResponse(messages);

    return new NextResponse(stream, {
      headers: {
        "Content-Control": "no-cache",
        "Content-Type": "text/plain; charsett=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } 
  catch (error) {
    return NextResponse.error();
  }
} 
