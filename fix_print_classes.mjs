import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Replace specific print overrides that change colors
content = content.replace(/print:border-slate-800/g, '');
content = content.replace(/print:bg-transparent/g, '');
content = content.replace(/print:text-black/g, '');
content = content.replace(/print:text-slate-800/g, '');
content = content.replace(/print:border-t/g, '');
content = content.replace(/print:bottom-auto/g, '');
content = content.replace(/print:relative/g, '');
content = content.replace(/print:mt-10/g, '');

// The opacity one: print:opacity-[0.03]
content = content.replace(/print:opacity-\[0\.03\]/g, '');

// Let's also check App.tsx just in case there are print color overrides
fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);

let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
appContent = appContent.replace(/print:bg-transparent/g, '');
appContent = appContent.replace(/print:text-black/g, '');
fs.writeFileSync('src/App.tsx', appContent);
