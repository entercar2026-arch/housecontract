import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:scale-[0.93]',
  'print:scale-[0.90]'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
