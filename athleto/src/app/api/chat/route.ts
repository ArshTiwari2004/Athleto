import { NextRequest, NextResponse } from "next/server";

interface Message {
  text: string;
  sender: "user" | "assistant";
}

interface RequestData {
  message: string;
  history?: Message[];
}

interface ResponseData {
  text: string;
  error?: string;
}

interface CohereMessage {
  role: "USER" | "CHATBOT";
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestData = await req.json();
    const { message, history = [] } = body;

    // Validate API key
    const apiKey = process.env.NEXT_PUBLIC_COHERE_API_KEY;
    if (!apiKey) {
      console.error("COHERE_API_KEY is missing in environment variables");
      return NextResponse.json(
        { text: "", error: "API key not configured" },
        { status: 500 }
      );
    }

    // Validate input message
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { text: "", error: "Invalid message format" },
        { status: 400 }
      );
    }

    // Format conversation history
    const formattedHistory: CohereMessage[] = history.map((msg) => ({
      role: msg.sender === "user" ? "USER" : "CHATBOT",
      message: msg.text,
    }));

    // Call Cohere API
    const cohereResponse = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`, // ✅ Fixed syntax error
        "Content-Type": "application/json",
        "Cohere-Version": "2022-12-06",
      },
      body: JSON.stringify({
        message,
        chat_history: formattedHistory,
        model: "command",
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!cohereResponse.ok) {
      const errorData = await cohereResponse.json();
      console.error("Cohere API error:", errorData);
      return NextResponse.json(
        { text: "", error: errorData.message || `Error ${cohereResponse.status}` },
        { status: cohereResponse.status }
      );
    }

    // Extract response text
    const data = await cohereResponse.json();
    const responseText = data.text || data.generations?.[0]?.text || "No response generated";

    return NextResponse.json({ text: responseText });

  } catch (error) {
    console.error("Chat request error:", error);
    return NextResponse.json(
      { text: "", error: (error as Error).message || "Unknown error" },
      { status: 500 }
    );
  }
}