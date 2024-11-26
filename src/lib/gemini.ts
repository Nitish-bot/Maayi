import { GoogleGenerativeAI as google,
  HarmCategory,
  HarmBlockThreshold,
 } from "@google/generative-ai";
import type { Message } from "@/types";

// ACTUAL FUNCTION WE ARE EXPORTING
// Exposing a simple getGeminiResponse that can be accessed by a route handler
export async function getGeminiResponse(messages: Message[]): Promise<string> {
  // Validation of API key
  const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!API_KEY) {
    throw new Error("Missing API key");
  }
  
  // Generate new instance of GoogleGenerativeAI
  const genAI = new google(API_KEY);
  
  // LONG
  // Instructions for the model
  const systemInstruction = "You are a helpful robot with particular interest in helping women and their families regarding prenatal and postpartum care. Keep in mind that some of these ladies comes from rural villages and don't have quick access to a lot of facilities, so help in whatever capacity you can and if it's out of your scope, advice them to visit a health facility.";
  const model = "gemini-1.5-flash";
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory. HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];
  
  const AI = genAI.getGenerativeModel({model, systemInstruction, safetySettings});

  const history = messages.map((message) => ({
    role: message.role,
    parts: [{text: message.content}],
  }));

  const chat = AI.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 8000,
      temperature: 0.5,
    }
  });
  
  // console.log(messages);
  const output = await chat.sendMessage(messages[messages.length - 1].content);
  const result = await output.response;

  return result.text();
}
