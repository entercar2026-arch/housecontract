import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Route for ID Extraction
  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

  app.post('/api/extract-id', async (req, res) => {
    try {
      const { imageBase64, mimeType } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'No image provided' });
      }

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
                text: req.body.type === 'car' ? 
                `Extract the following information from this Cambodian Vehicle Registration Card (ID Card) image.
Return ONLY a valid JSON object with the following keys, no markdown blocks, no other text:
- carModel: The model/make of the car (e.g. "TOYOTA PRIUS", "LEXUS RX330", etc.)
- carColorKh: The color of the car in Khmer (e.g. "ស", "ខ្មៅ", "ប្រាក់", etc.)
- carColorEn: The color of the car translated to English (e.g. "WHITE", "BLACK", "SILVER", etc.)
- carYear: The year of manufacture (e.g. "2010").
- carPlateNoKh: The license plate number exactly as written in Khmer (e.g. "ភ្នំពេញ 2A-1234").
- carPlateNoEn: The license plate number translated/transliterated to English (e.g. "Phnom Penh 2A-1234").
- carFrameNo: The chassis number or frame number (e.g. "JTDKN36U...").
- carEngineNo: The engine number (e.g. "1NZ-1234...").` 
                : 
                `Extract the following information from this ID card or passport image with maximum speed and precision.

Handling instructions based on document type:
1. For Cambodian National ID Cards:
   - Extract 'nameKh' exactly as written in Khmer script on the card (do not include prefix labels like "ឈ្មោះ" or "នាមត្រកូល និងនាមខ្លួន").
   - Extract 'nameEn' exactly as written in English/Latin script.
2. For Passports (e.g. Cambodian Passport or foreign passport):
   - Determine if the passport belongs to a Foreigner (non-Cambodian nationality) or a Cambodian citizen.
   - If the passport belongs to a CHINESE, JAPANESE, or KOREAN citizen, and their native name (e.g., Chinese characters like "蒋永南", Kanji, or Hangul) is visible on the passport, you MUST extract their native character name into the 'nameKh' field.
   - If the passport belongs to another FOREIGNER, you MUST NOT transliterate the name into Khmer script. For 'nameKh', set it to the EXACT same English/Latin name as in 'nameEn' (e.g., "JOHN SMITH").
   - If the passport belongs to a CAMBODIAN citizen, you MUST phonetically transliterate/translate the English/Latin name into Khmer script (e.g. "HUN CHANPHYROM" -> "ហ៊ុន ចាន់ភិរ៉ុម").
   - For 'nameEn', extract the English/Latin name (Surname and Given Names combined).
   - Convert all dates to "DD/MM/YYYY" format.

Return ONLY a valid JSON object with the following keys, no markdown blocks, no other text:
- nameKh: Khmer name, or Native character name for Chinese/Japanese/Korean citizens (e.g., "蒋永南"), or identical to English name for other foreigners.
- nameEn: English name
- gender: "Male" or "Female" (translate "M", "F", "ប្រុស", "ស្រី" accordingly)
- dob: Date of birth (format: MUST be DD/MM/YYYY)
- idNumber: ID card number or Passport number
- idIssueDate: Issue Date of the document (format: MUST be DD/MM/YYYY)
- idExpiryDate: Expiry Date of the document (format: MUST be DD/MM/YYYY)
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
      
      let cleanText = resultText.trim();
      const jsonStart = cleanText.indexOf('{');
      const jsonEnd = cleanText.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanText = cleanText.substring(jsonStart, jsonEnd + 1);
      } else {
        cleanText = cleanText.replace(/```json/g, '').replace(/```/g, '').trim();
      }
      
      const extractedData = JSON.parse(cleanText);
      res.json(extractedData);
    } catch (error: any) {
      console.error('Extraction error:', error);
      res.status(500).json({ error: error.message || 'Failed to extract information from the image.', stack: error.stack, response: error.response });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
