import { getGeminiResponse } from "@/lib/gemini";
import type { Message } from "@/types";

export async function POST(req: Request) {
  const messages :Message[] = JSON.parse(await req.text());

  try {
    const stream = await getGeminiResponse(messages);
    console.log("Gemini input received in route");
    return new Response(JSON.stringify(stream), {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    });
  } 
  catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed! with error ${error}` }),
      {
        status: 300,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
} 
