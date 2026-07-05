import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'h-[148mm]',
  'h-[148.5mm]'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
