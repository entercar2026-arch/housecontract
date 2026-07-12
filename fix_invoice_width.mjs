import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:w-full print:h-[98vh]',
  'print:w-[210mm] print:h-[99vh] print:max-h-[148mm]'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
