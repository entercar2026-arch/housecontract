import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:w-[210mm] print:h-[148.5mm] print:min-h-[148.5mm] print:max-h-[148.5mm] print:overflow-hidden print:break-inside-avoid print:scale-[0.92] print:origin-top-left',
  'print:w-[210mm] print:h-[148.5mm] print:min-h-[148.5mm] print:max-h-[148.5mm] print:overflow-hidden print:break-inside-avoid print:scale-[0.92] print:origin-top'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
