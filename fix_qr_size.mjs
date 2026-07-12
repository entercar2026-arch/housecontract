import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'className="relative group w-[42px] h-[42px] rounded border-2 border-[#002f6c] bg-white overflow-hidden flex items-center justify-center shrink-0"',
  'className="relative group w-[84px] h-[84px] rounded border-2 border-[#002f6c] bg-white overflow-hidden flex items-center justify-center shrink-0"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
