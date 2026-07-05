import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'className="flex flex-col gap-3"',
  'className="flex flex-col gap-2"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
