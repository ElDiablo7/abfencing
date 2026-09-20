import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    console.log("New Lead Received:", data);
    
    // TODO: In production, integrate with SendGrid, Resend, or Nodemailer
    // to email the lead details to Scott.
    
    return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
