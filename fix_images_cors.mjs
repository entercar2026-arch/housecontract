import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');
content = content.replace(/<img /g, '<img crossOrigin="anonymous" ');
fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
