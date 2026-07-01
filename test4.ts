import { GoogleGenAI } from '@google/genai';

async function test() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-pro-latest',
      contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
    });
    console.log('gemini-pro-latest:', response.text);
  } catch (err: any) {
    console.error('gemini-pro-latest error:', err.message);
  }
}
test();
