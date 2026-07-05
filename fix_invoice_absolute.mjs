import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'className="mt-auto -mx-4 md:-mx-6 print:-mx-4 -mb-4 md:-mb-6 print:-mb-4 bg-[#631633] text-white p-3 flex justify-between items-center text-xs"',
  'className="absolute bottom-0 left-0 right-0 bg-[#631633] text-white p-3 flex justify-between items-center text-[10px] sm:text-xs"'
);

// We can remove `flex flex-col` from the main container if it was added, or leave it.
// Actually, flex flex-col is fine.
content = content.replace(
  'className="flex flex-col w-[210mm] h-[148mm]',
  'className="w-[210mm] h-[148mm]'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
