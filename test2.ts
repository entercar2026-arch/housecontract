import { GoogleGenAI } from '@google/genai';

async function test() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
    });
    console.log('gemini-1.5-flash:', response.text);
  } catch (err: any) {
    console.error('gemini-1.5-flash error:', err.message);
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
    });
    console.log('gemini-1.5-pro:', response.text);
  } catch (err: any) {
    console.error('gemini-1.5-pro error:', err.message);
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
    });
    console.log('gemini-2.5-flash:', response.text);
  } catch (err: any) {
    console.error('gemini-2.5-flash error:', err.message);
  }
}

test();
