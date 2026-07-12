import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'className="mt-auto -mx-3 md:-mx-5 print:-mx-4 -mb-3 md:-mb-5 print:-mb-4 bg-[#631633] text-white p-2 flex justify-between items-center text-[10px] sm:text-[11px]"',
  'className="mt-auto -mx-3 md:-mx-5 print:-mx-1 -mb-3 md:-mb-5 print:-mb-1 bg-[#631633] text-white p-2 flex justify-between items-center text-[10px] sm:text-[11px]"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
