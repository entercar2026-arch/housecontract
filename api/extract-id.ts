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
        model: 'gemini-2.5-flash',
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
                text: `Extract the following information from this Cambodian National ID card or Passport image with maximum speed and precision.

Handling instructions based on document type:
1. For Cambodian National ID Cards:
   - Extract 'nameKh' exactly as written in Khmer script on the card (do not include prefix labels like "ឈ្មោះ" or "នាមត្រកូល និងនាមខ្លួន").
   - Extract 'nameEn' exactly as written in English/Latin script.
2. For Passports (e.g. Cambodian Passport or foreign passport):
   - Note that passports do NOT have the holder's name written in Khmer script on the personal data page. 
   - Determine if the passport belongs to a Foreigner (non-Cambodian nationality) or a Cambodian citizen.
   - If the passport belongs to a FOREIGNER, you MUST NOT transliterate the name into Khmer script. For 'nameKh', set it to the EXACT same English/Latin name as in 'nameEn' (e.g., "JOHN SMITH").
   - If the passport belongs to a CAMBODIAN citizen, you MUST phonetically transliterate/translate the English/Latin name into Khmer script (e.g. "HUN CHANPHYROM" -> "ហ៊ុន ចាន់ភិរ៉ុម", "SENG SOVANN" -> "សេង សុវណ្ណ").
   - For 'nameEn', extract the English/Latin name (Surname and Given Names combined).
   - Passports often have dates like "16 OCT 1988" or "16 OCT / OCT 1988". You MUST convert these to "DD/MM/YYYY" format (e.g., "16/10/1988").

Return ONLY a valid JSON object with the following keys, no markdown blocks, no other text:
- nameKh: Khmer name (transcribed from ID Card, phonetically transliterated from Cambodian Passport, or identical to English name if a Foreigner Passport)
- nameEn: English name
- gender: "Male" or "Female" (translate "M", "F", "ប្រុស", "ស្រី" accordingly)
- dob: Date of birth (format: MUST be DD/MM/YYYY)
- idNumber: ID card number or Passport number
- idIssueDate: Issue Date of the document (format: MUST be DD/MM/YYYY)
- idExpiryDate: Expiry Date of the document (format: MUST be DD/MM/YYYY)
- nationality: Nationality (e.g., "Cambodian", "Japanese", "Chinese" - MUST be demonym/nationality, NOT country names like "Cambodia" or "Japan")`
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
