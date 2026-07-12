import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:w-[210mm] print:h-[148.5mm] print:min-h-[148.5mm] print:max-h-[148.5mm] print:overflow-hidden print:break-inside-avoid print:scale-[0.92] print:origin-top',
  'print:w-[208mm] print:h-[146mm] print:max-h-[146mm] print:min-h-0 print:overflow-hidden print:break-inside-avoid print:m-0 print:p-0'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
