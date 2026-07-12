import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Use exact A5 dimensions with a 0.95 scale and top-center origin so it stays centered
content = content.replace(
  'print:scale-[0.98] print:origin-top-left',
  'print:scale-[0.96] print:origin-top'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
