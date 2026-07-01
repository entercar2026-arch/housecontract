import { GoogleGenAI } from '@google/genai';

async function test() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
    });
    console.log('gemini-2.0-flash:', response.text);
  } catch (err: any) {
    console.error('gemini-2.0-flash error:', err.message);
  }
}
test();
