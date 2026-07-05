import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'flex items-center gap-4 mb-12 relative z-10',
  'flex items-center gap-4 mb-10 relative z-10'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
