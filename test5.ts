import { GoogleGenAI } from '@google/genai';

async function test() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const models = ['gemini-flash', 'gemini-pro', 'gemini-1.0-pro'];
  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
      });
      console.log(`${model}:`, response.text);
    } catch (err: any) {
      console.error(`${model} error:`, err.message);
    }
  }
}
test();
