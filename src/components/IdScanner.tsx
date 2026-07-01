import React, { useRef, useState } from 'react';
import { Camera, Upload, Loader2, CheckCircle } from 'lucide-react';
import { PersonDetails } from '../types';

interface IdScannerProps {
  onDataExtracted: (data: Partial<PersonDetails>) => void;
  label: string;
}

export default function IdScanner({ onDataExtracted, label }: IdScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setError(null);
    setSuccess(false);

    try {
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const response = await fetch('/api/extract-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: file.type,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        let errorMessage = 'ការទាញយកទិន្នន័យបរាជ័យ (Failed to extract data)';
        if (typeof errData.error === 'string') {
          errorMessage = errData.error;
          try {
            const parsed = JSON.parse(errData.error);
            if (parsed.error && parsed.error.message) {
              errorMessage = parsed.error.message;
            }
          } catch(e) {}
        } else if (errData.error && errData.error.message) {
          errorMessage = errData.error.message;
        } else if (errData.details) {
          errorMessage = errData.details;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      onDataExtracted(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while scanning.');
    } finally {
      setIsScanning(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="mt-2">
      {isScanning && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white transition-opacity">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">កំពុងទាញយកទិន្នន័យ...</h2>
          <p className="text-indigo-200">Please wait while extracting data...</p>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isScanning}
        className="w-full bg-indigo-600 text-white text-sm py-2 rounded-lg font-medium shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-colors hover:bg-indigo-700 disabled:opacity-50"
      >
        <Camera className="w-5 h-5" />
        <span>ស្កេនឯកសារ ({label})</span>
      </button>
      
      {success && (
        <p className="text-emerald-600 text-sm mt-2 font-medium bg-emerald-50 p-2 rounded border border-emerald-100 flex items-center gap-1">
          <CheckCircle className="w-4 h-4" /> ទាញយកទិន្នន័យបានជោគជ័យ (Extracted successfully)
        </p>
      )}
      {error && <p className="text-red-500 text-sm mt-2 font-medium bg-red-50 p-2 rounded border border-red-100">{error}</p>}
    </div>
  );
}
