import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:w-[210mm] print:h-[148.5mm] print:min-h-0 print:overflow-hidden print:break-inside-avoid print:scale-[0.95] print:origin-top',
  'print:w-[100%] print:h-[140mm] print:max-h-[145mm] print:min-h-0 print:overflow-hidden print:break-inside-avoid'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
