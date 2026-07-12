import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Replace the wrapper classes
content = content.replace(
  'print:w-[210mm] print:h-[148mm] print:max-h-[148mm] print:overflow-hidden print:break-inside-avoid bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-4 relative print:shadow-none text-slate-800 print:text-[0.95rem]',
  'print:w-[100%] print:h-[99vh] print:max-h-[99vh] print:overflow-hidden print:break-inside-avoid bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-4 relative print:shadow-none text-slate-800'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
