import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'print:text-[0.9rem]',
  'print:text-[0.85rem]'
);

content = content.replace(
  'className="flex flex-col gap-3 pt-1"',
  'className="flex flex-col gap-2 pt-1"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
