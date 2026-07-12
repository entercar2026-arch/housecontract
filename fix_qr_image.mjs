import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  '<img src="/qr-code.png"',
  '<img src="/qr-code.png.jpg"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
