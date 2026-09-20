import { NextResponse } from "next/server";
import OpenAI from "openai";
import { generateSystemPrompt } from "@/lib/ai/knowledge-base";

// Initialize OpenAI conditionally to avoid crashing if the key isn't set yet
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY is not set. Returning fallback message.");
      return NextResponse.json({ 
        success: true, 
        response: "Thanks for your message! Our AI is currently offline. Please contact Scott on 07539 490 180 for immediate assistance." 
      }, { status: 200 });
    }

    const systemPrompt = generateSystemPrompt();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    const responseText = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";

    return NextResponse.json({ 
      success: true, 
      response: responseText
    }, { status: 200 });
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
