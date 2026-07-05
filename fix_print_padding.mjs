import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'p-4 md:p-8 print:p-6 relative',
  'p-4 md:p-6 print:p-4 relative'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
