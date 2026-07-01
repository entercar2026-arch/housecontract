import { GoogleGenAI } from '@google/genai';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { imageBase64, mimeType } = req.body;
    
    if (!imageBase64) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  data: imageBase64,
                  mimeType: mimeType || 'image/jpeg',
                },
              },
              {
                text: `Extract the following information from this Cambodian ID card or passport image.
                Return ONLY a valid JSON object with the following keys, no markdown blocks, no other text:
                - nameKh: Name in Khmer script (IMPORTANT: Extract ONLY the actual name. Do NOT include labels like "ឈ្មោះ" or "នាមត្រកូល និងនាមខ្លួន" or "នាមត្រកូល". Example: "សុខ សាន្ត")
                - nameEn: Name in English/Latin script
                - gender: "Male", "Female", or extracted value translated to English
                - dob: Date of birth (format: MUST be DD/MM/YYYY)
                - idNumber: ID card number or Passport number
                - nationality: Nationality (e.g., Cambodian)`
              }
            ]
          }
        ],
        config: {
            responseMimeType: "application/json",
        }
    });

    const resultText = response.text;
    if (!resultText) {
        throw new Error("No text returned from Gemini");
    }
    
    const cleanText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    const extractedData = JSON.parse(cleanText);
    res.status(200).json(extractedData);
  } catch (error: any) {
    console.error('Extraction error:', error);
    res.status(500).json({ 
        error: error.message || 'Failed to extract information from the image.', 
        stack: error.stack 
    });
  }
}
