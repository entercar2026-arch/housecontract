import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'className="w-[210mm] h-[148.5mm] md:min-h-0 bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-4 md:p-6 print:p-4 relative print:shadow-none overflow-hidden text-slate-800"',
  'className="flex flex-col w-[210mm] h-[148.5mm] md:min-h-0 bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-4 relative print:shadow-none overflow-hidden text-slate-800"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
