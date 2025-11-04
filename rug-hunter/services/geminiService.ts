import { GoogleGenAI, Modality, GenerateContentResponse, Chat } from "@google/genai";
import { ChatMessage } from '../types';

// The API key MUST be obtained exclusively from the environment variable `process.env.API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const analyzeStrategyWithThinking = async (prompt: string): Promise<string> => {
  console.log("Using gemini-2.5-pro with thinking mode for:", prompt);
  // In a real app:
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 32768 } }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error in analyzeStrategyWithThinking:", error);
    return "Error: Could not analyze strategy.";
  }
};

export const generateImage = async (prompt: string, aspectRatio: string): Promise<string> => {
  console.log("Using imagen-4.0-generate-001 for:", prompt, "with aspect ratio", aspectRatio);
  // In a real app:
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: aspectRatio as "1:1" | "16:9" | "9:16",
        outputMimeType: 'image/jpeg'
      },
    });
    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error("Gemini API error in generateImage:", error);
    return "";
  }
};

export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
    console.log("Using gemini-2.5-flash-image to edit with prompt:", prompt);
    // In a real app:
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64ImageData, mimeType: mimeType } },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
        if (imagePart && imagePart.inlineData) {
            return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
        }
        throw new Error("No image data in response");

    } catch (error) {
        console.error("Gemini API error in editImage:", error);
        return "";
    }
};


export const chatWithBot = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  console.log("Using gemini-2.5-flash for chat.");
  // In a real app:
  
  // The `history` parameter from the component includes the new user message.
  // We separate the actual history (all messages except the last one) to initialize the chat.
  const historyForApi = history.slice(0, -1).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
  }));

  try {
      const chat: Chat = ai.chats.create({ 
          model: 'gemini-2.5-flash',
          history: historyForApi
      });
      const response = await chat.sendMessage({ message: newMessage });
      return response.text;
  } catch (error) {
      console.error("Gemini API error in chatWithBot:", error);
      return "Sorry, I encountered an error.";
  }
};
