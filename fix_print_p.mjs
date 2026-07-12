import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:w-[100%] print:h-[140mm] print:max-h-[145mm] print:min-h-0 print:overflow-hidden print:break-inside-avoid bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-4',
  'print:w-[100%] print:h-[135mm] print:max-h-[135mm] print:min-h-0 print:overflow-hidden print:break-inside-avoid bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-2'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
