import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:min-h-0 bg-slate-50',
  'print:min-h-0 print:overflow-hidden bg-slate-50'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
