import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'mx-auto p-6 relative print:shadow-none overflow-hidden text-slate-800"',
  'mx-auto p-4 md:p-8 print:p-6 relative print:shadow-none overflow-hidden text-slate-800"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
