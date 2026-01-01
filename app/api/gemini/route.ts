
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt, task } = await req.json();

    // Use recommended models from guidelines
    let model = 'gemini-3-flash-preview';
    let systemInstruction = 'You are a professional brand strategist and copywriter for "Perry D Beauty Studio", a luxury beauty salon in Kisumu, Kenya. Your tone is confident, premium, welcoming, and elegant. You specialize in beauty services like braids, bridal glam, and facials.';

    // Select model based on task complexity as per guidelines
    if (task === 'creative_blog' || task === 'strategy') {
      model = 'gemini-3-pro-preview';
    } else if (task === 'rewrite') {
      model = 'gemini-3-flash-preview';
      systemInstruction += ' Rewrite the following text to be more engaging, concise, and luxurious. Maintain the original meaning but improve the flow.';
    } else if (task === 'social') {
        model = 'gemini-3-flash-preview';
        systemInstruction += ' Create a catchy social media caption (Instagram/TikTok) based on the input. Include relevant hashtags for Kenya/Beauty.';
    }

    // Correctly call generateContent with model name and configuration
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Access text property directly as per @google/genai guidelines
    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
  }
}
