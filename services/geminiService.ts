
import { GoogleGenAI } from "@google/genai";

// We use a getter to initialize the AI client only when needed, 
// ensuring it picks up the defined process.env.API_KEY correctly.
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Please set API_KEY in your environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getBriefAssistance = async (roughDraft: string, serviceTitle: string) => {
  const ai = getAiClient();
  if (!ai) return roughDraft;

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
    const ai = getAiClient();
    if (!ai) return "I'm currently offline. Support will be available soon.";
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are ThatFreelancer Support AI. Answer this query politely: ${message}`,
      });
      return response.text?.trim() || "Let me check that for you.";
    } catch (e) {
      console.error("Chat AI Error:", e);
      return "I'm having trouble connecting to support right now.";
    }
}
