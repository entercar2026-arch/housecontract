import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Shrink logo
content = content.replace(
  'className="w-20 h-20',
  'className="w-16 h-16'
);
content = content.replace(
  'className="bg-[#4d0924] text-white rounded-xl shadow-lg border-b-4 border-slate-700 w-20 h-20 flex flex-col items-center justify-center shrink-0 overflow-hidden relative"',
  'className="bg-[#4d0924] text-white rounded-xl shadow-lg border-b-4 border-slate-700 w-16 h-16 flex flex-col items-center justify-center shrink-0 overflow-hidden relative"'
);

// Border box gap and padding
content = content.replace(
  'rounded-2xl p-2 mb-2 bg-white/50',
  'rounded-xl p-2 mb-2 bg-white/50'
);
content = content.replace(
  'flex flex-col gap-1.5',
  'flex flex-col gap-1'
);

// Payment is non-refundable
content = content.replace(
  'mb-2 px-2',
  'mb-1 px-2'
);

// ABA section
content = content.replace(
  'gap-4 mb-2',
  'gap-4 mb-1'
);

// Also remove `overflow-hidden` so that we can clearly see if it's overflowing.
// For A5 print, it's better to just ensure the content fits. 
content = content.replace(
  'className="flex flex-col w-[210mm] h-[148.5mm] md:min-h-0 bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-4 relative print:shadow-none overflow-hidden text-slate-800"',
  'className="flex flex-col w-[210mm] min-h-[148.5mm] md:min-h-[148.5mm] print:h-[148.5mm] print:min-h-0 bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-4 relative print:shadow-none text-slate-800"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
