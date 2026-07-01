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
