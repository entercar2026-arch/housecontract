import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  `{activeTab === 'invoice' ? <InvoiceReceipt state={state} /> : <ContractPreview state={state} />}`,
  `{activeTab === 'invoice' ? <InvoiceReceipt /> : <ContractPreview state={state} />}`
);

fs.writeFileSync('src/App.tsx', content);
