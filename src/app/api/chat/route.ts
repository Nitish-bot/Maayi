import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userInput } = await request.json();
    const text = await streamText({
      model: google("models/gemini-1.5-pro-latest"),
      system: "You are a helpful robot with particular interest in helping women and their families regarding prenatal and postpartum care. Keep in mind that some of these ladies comes from rural villages and don't have quick access to a lot of facilities, so help in whatever capacity you can and if it's out of your scope, advice them to visit a health facility.",
      prompt: userInput,
    });
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json({ error: "An error occurred while generating the response" }, { status: 500 });
  }
}
