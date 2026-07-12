import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:w-[208mm] print:h-[146mm] print:max-h-[146mm] print:min-h-0 print:overflow-hidden print:break-inside-avoid print:m-0 print:p-0',
  'print:w-[200mm] print:h-[140mm] print:max-h-[140mm] print:min-h-[140mm] print:overflow-hidden print:break-inside-avoid print:m-0 print:p-0'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
