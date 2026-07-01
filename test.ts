import { GoogleGenAI } from '@google/genai';

async function test() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Hello' },
            { inlineData: { data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', mimeType: 'image/png' } }
          ]
        }
      ]
    });
    console.log('Success:', response.text);
  } catch (err: any) {
    console.error('Error with gemini-3.5-flash:', err.message);
  }
}

test();
