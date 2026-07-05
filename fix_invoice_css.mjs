import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  '<style>{`@page { size: A5 landscape !important; margin: 0; }`}</style>',
  '<style>{`@page { size: A5 landscape !important; margin: 0mm !important; }`}</style>'
);

content = content.replace(
  'h-[148.5mm]',
  'h-[148mm]'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
