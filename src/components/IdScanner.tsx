import React, { useRef, useState } from 'react';
import { Camera, Upload, Loader2, CheckCircle, X, Image as ImageIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PersonDetails } from '../types';

interface IdScannerProps {
  type?: 'person' | 'car';
  isSuccess?: boolean;
  onDataExtracted: (data: any) => void;
  label: string;
}

export default function IdScanner({ onDataExtracted, label, isSuccess = false, type = 'person' }: IdScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setIsScanning(true);
    setError(null);
    setSuccess(false);

    try {
      const base64Data = await new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1200;
          
          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round(height * (MAX_SIZE / width));
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round(width * (MAX_SIZE / height));
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            resolve(dataUrl.split(',')[1]);
          } else {
            reject(new Error("Could not get canvas context"));
          }
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });

      const response = await fetch('/api/extract-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: 'image/jpeg',
          type,
        }),
      });

      if (!response.ok) {
        let errData = {};
        try {
          errData = await response.json();
        } catch (e) {
          // Not JSON (e.g. 413 Payload Too Large, 502 Bad Gateway)
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        
        let errorMessage = 'ការទាញយកទិន្នន័យបរាជ័យ (Failed to extract data)';
        if (typeof (errData as any).error === 'string') {
          errorMessage = (errData as any).error;
          try {
            const parsed = JSON.parse((errData as any).error);
            if (parsed.error && parsed.error.message) {
              errorMessage = parsed.error.message;
            }
          } catch(e) {}
        } else if ((errData as any).error && (errData as any).error.message) {
          errorMessage = (errData as any).error.message;
        } else if ((errData as any).details) {
          errorMessage = (errData as any).details;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      onDataExtracted(data);
      setSuccess(true);
      
    } catch (err: any) {
      let errorMsg = err.message || 'An error occurred while scanning.';
      if (errorMsg.includes('Quota exceeded') || errorMsg.includes('429')) {
        errorMsg = 'អធ្យាស្រ័យ! ការប្រើប្រាស់បានដល់ដែនកំណត់ (API Quota Exceeded)។ សូមរង់ចាំបន្តិចសិន ឬប្រើប្រាស់ Paid API Key ដើម្បីដោះស្រាយបញ្ហានេះ។';
      } else if (errorMsg.toLowerCase().includes('high demand') || errorMsg.includes('503') || errorMsg.toLowerCase().includes('temporarily overloaded')) {
        errorMsg = 'ម៉ាស៊ីន AI កំពុងមានអ្នកប្រើប្រាស់ច្រើន (High Demand)។ សូមសាកល្បងម្ដងទៀតនៅបន្តិចទៀត ឬប្រើប្រាស់គណនីបង់ប្រាក់ (Paid API Key) ដើម្បីទទួលបានភាពរលូន។';
      }
      setError(errorMsg);
    } finally {
      setIsScanning(false);
      // Reset inputs
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (cameraInputRef.current) {
        cameraInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setShowOptionsModal(false);
      await processFile(file);
    }
  };

  return (
    <div 
      className="mt-2 relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isScanning && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-55 flex flex-col items-center justify-center text-white transition-opacity">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">កំពុងទាញយកទិន្នន័យ...</h2>
          <p className="text-indigo-200">Please wait while extracting data...</p>
        </div>
      )}

      {/* Camera Only input */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={cameraInputRef}
        onChange={handleFileChange}
      />

      {/* File Browse input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      <button
        type="button"
        onClick={() => setShowOptionsModal(true)}
        disabled={isScanning}
        className={`w-full text-sm py-4 rounded-xl font-medium flex flex-col items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer border-2 border-dashed
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50/90 scale-[1.02]' 
            : (success || isSuccess)
              ? 'border-emerald-300 bg-emerald-50/40 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400'
              : 'border-indigo-300 bg-indigo-50/40 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400'
          }`}
      >
        {(success || isSuccess) ? (
          <>
            <div className="p-2 rounded-full bg-emerald-100">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-center">
              <span className="block font-bold">ស្កេនបានសម្រេច</span>
              <span className="block text-xs text-emerald-500 mt-0.5 font-normal">Scanned successfully</span>
            </div>
          </>
        ) : (
          <>
            <div className={`p-2 rounded-full ${isDragging ? 'bg-indigo-200 animate-bounce' : 'bg-indigo-100'}`}>
              <Camera className={`w-5 h-5 ${isDragging ? 'text-indigo-700' : 'text-indigo-600'}`} />
            </div>
            <div className="text-center">
              <span className="block font-bold">ស្កេនឯកសារ ឬទម្លាក់រូបភាព</span>
              <span className="block text-xs text-indigo-500 mt-0.5 font-normal">Scan or drop {label} ID here</span>
            </div>
          </>
        )}
      </button>

      {/* Beautiful Modal for Scan Options */}
      <AnimatePresence>
        {showOptionsModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptionsModal(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border p-6 flex flex-col gap-4 z-10 transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100'}`}
            >
              {isDragging && (
                <div className="absolute inset-0 bg-indigo-50/90 z-50 flex flex-col items-center justify-center backdrop-blur-sm border-2 border-dashed border-indigo-400 rounded-2xl pointer-events-none">
                  <Upload className="w-10 h-10 text-indigo-500 mb-2 animate-bounce" />
                  <p className="text-indigo-700 font-bold">ទម្លាក់រូបភាពទីនេះ</p>
                  <p className="text-indigo-500 text-sm">Drop image here</p>
                </div>
              )}
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">ស្កេនឯកសារ / Scan ID</h3>
                  <p className="text-xs text-slate-500 mt-0.5">ជ្រើសរើសវិធីសាស្ត្រស្កេន ({label})</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOptionsModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {/* Camera option */}
                <button
                  type="button"
                  onClick={() => {
                    setShowOptionsModal(false);
                    cameraInputRef.current?.click();
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 hover:bg-indigo-50 hover:border-indigo-200 transition-all text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">ថតរូបភាពផ្ទាល់ / Open Camera</h4>
                    <p className="text-xs text-slate-500 mt-0.5">បើកកាមេរ៉ាឧបករណ៍ដើម្បីថតរូបភាព</p>
                  </div>
                </button>

                {/* Upload option */}
                <button
                  type="button"
                  onClick={() => {
                    setShowOptionsModal(false);
                    fileInputRef.current?.click();
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 transition-all text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">ជ្រើសរើសឯកសារ / Browse File</h4>
                    <p className="text-xs text-slate-500 mt-0.5">ជ្រើសរើសរូបភាពពីម៉ាស៊ីន ឬវិចិត្រសាល</p>
                  </div>
                </button>
              </div>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => setShowOptionsModal(false)}
                className="w-full text-center py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100/60 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                បោះបង់ / Cancel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      
      {error && <p className="text-red-500 text-sm mt-2 font-medium bg-red-50 p-2 rounded border border-red-100">{error}</p>}
    </div>
  );
}
