import { generateText } from "ai"
import { google } from "@ai-sdk/google"

const { text } = await generateText({
  model: google("models/gemini-1.5-pro-latest"),
  prompt: "What is love?"
});
