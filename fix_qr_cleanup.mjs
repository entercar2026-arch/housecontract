import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  "  const [qrUrl, setQrUrl] = useState<string>('/qr-placeholder.svg');",
  ""
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
