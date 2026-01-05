
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are the Monster Electrical Assistant. Help users with electrical service inquiries. 
        Services offered: Maintenance, Installations, Solar/Inverters, Rewiring, COC, and Geyser Timers. 
        Keep responses professional, concise, and encourage booking a consultation. 
        If asked for pricing, explain that we provide custom quotes based on assessment.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the electrical grid right now. Please call us directly for assistance!";
  }
};
