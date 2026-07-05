import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'className="w-[210mm] h-[148mm] md:min-h-0',
  'className="flex flex-col w-[210mm] h-[148mm] md:min-h-0'
);

content = content.replace(
  'className="absolute bottom-0 left-0 right-0 bg-[#631633] text-white p-3 flex justify-between items-center text-xs       "',
  'className="mt-auto -mx-4 md:-mx-6 print:-mx-4 -mb-4 md:-mb-6 print:-mb-4 bg-[#631633] text-white p-3 flex justify-between items-center text-xs"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
