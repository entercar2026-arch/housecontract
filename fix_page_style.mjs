import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  "@page { size: A5 landscape !important; margin: 0mm !important; }",
  "@page { size: A5 landscape; margin: 0; }"
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
