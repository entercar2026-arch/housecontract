import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:h-[148.5mm]',
  'print:h-[148mm]'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
