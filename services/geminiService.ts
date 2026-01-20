
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getBriefAssistance = async (roughDraft: string, serviceTitle: string) => {
  if (!process.env.API_KEY) return roughDraft;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert project manager for freelancers. A client wants a ${serviceTitle}. 
      They provided this rough brief: "${roughDraft}". 
      Improve this brief to be professional, detailed, and clear for a freelancer. 
      Focus on objective, tone, target audience, and specific requirements. 
      Output ONLY the improved brief text.`,
    });
    return response.text?.trim() || roughDraft;
  } catch (error) {
    console.error("Gemini Error:", error);
    return roughDraft;
  }
};

export const getAiReply = async (message: string) => {
    if (!process.env.API_KEY) return "I'm currently offline. Please check your internet.";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are ThatFreelancer Support AI. Answer this query politely: ${message}`,
      });
      return response.text?.trim() || "Let me check that for you.";
    } catch (e) {
      return "I'm having trouble connecting to support right now.";
    }
}
