import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'w-[210mm] min-h-[148.5mm] md:min-h-[148.5mm] print:h-[148mm] print:min-h-0 print:overflow-hidden',
  'w-[210mm] min-h-[148.5mm] md:min-h-[148.5mm] print:w-full print:h-[98vh] print:min-h-0 print:overflow-hidden print:break-inside-avoid'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
