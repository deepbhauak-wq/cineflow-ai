import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, duration = "3", language = "Hindi", lockedCharacter } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in Vercel environment variables." },
        { status: 500 }
      );
    }

    // Google Gemini 2.5 Engine Payload
    const systemInstruction = `
      You are the Master Story Engine for CineFlow AI Pro Studio.
      Decompose the given topic into a structured cinematic scene breakdown.
      Rules:
      - Strictly output valid JSON.
      - Duration: ${duration} minutes.
      - Voiceover language: ${language} (Shuddh / Pure tone).
      - Strict pacing: Exactly 10-13 words per scene dialog, with 1.5s natural pause marked.
      - Dynamic BGM ducked at -22dB.
      - Locked Character DNA: ${lockedCharacter || "Default Protagonist, Ultra-photorealistic live-action"}.
      - Visual prompt format: Cinematic 9:16 / 16:9, volumetric lighting, photorealistic --no text, watermark, logo.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemInstruction}\n\nTopic: ${prompt}` }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({
      success: true,
      data: generatedText,
      creditsDeducted: 10,
      status: "ready_for_render"
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

