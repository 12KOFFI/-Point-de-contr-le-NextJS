import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages } from "ai";
import { getSystemPrompt } from "@/lib/chatbot-context";
import type { Language } from "@/lib/translations";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, lang = "fr" } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }

    // Limit conversation history to prevent token overflow
    const recentMessages = messages.slice(-20);

    // Convert UIMessages (parts-based) to ModelMessages (content-based)
    const modelMessages = await convertToModelMessages(recentMessages);

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: getSystemPrompt(lang as Language),
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
