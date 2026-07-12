import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Replace the wrapper classes
content = content.replace(
  'className="flex flex-col w-[210mm] min-h-[148.5mm] md:min-h-[148.5mm] print:w-[100%] print:h-[99vh] print:max-h-[99vh] print:overflow-hidden print:break-inside-avoid bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-4 relative print:shadow-none text-slate-800"',
  'className="flex flex-col w-[210mm] min-h-[148.5mm] md:min-h-[148.5mm] print:w-[100%] print:h-[125mm] print:max-h-[125mm] print:min-h-0 print:overflow-hidden print:break-inside-avoid bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-1 relative print:shadow-none text-slate-800 print:text-sm"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
