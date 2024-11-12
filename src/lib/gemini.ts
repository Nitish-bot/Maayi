import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export async function POST(request: Request) {
  const { userInput } = await request.json();
  const text = await streamText({
    model: google("models/gemini-1.5-pro-latest"),
    prompt: userInput,
  });
  return text.toTextStreamResponse();
}
