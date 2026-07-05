import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Replace inline colors with a standard tailwind color or a more accurate hex
content = content.replace(/#4a154b/g, '#631633');

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
