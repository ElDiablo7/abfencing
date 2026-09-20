import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    console.log("Chat messages:", messages);
    
    // TODO: In production, integrate with OpenAI API or Anthropic API
    // using the system prompt for AB Fencing.
    // For now, return a placeholder response.
    
    return NextResponse.json({ 
      success: true, 
      response: "Thanks for your message! This is a placeholder AI response. Please contact Scott on 07539 490 180 for immediate assistance." 
    }, { status: 200 });
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
