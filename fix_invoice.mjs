import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:p-0 print:shadow-none print:w-full print:m-0  overflow-hidden',
  'print:shadow-none overflow-hidden'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
