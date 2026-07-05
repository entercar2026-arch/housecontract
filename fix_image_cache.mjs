import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'src="/car_logo.png"',
  'src="/car_logo.png?v=2"'
);

content = content.replace(
  'src="/house_logo-1.jpg"',
  'src="/house_logo-1.jpg?v=2"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
