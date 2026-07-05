import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Change outer padding
content = content.replace(
  'mx-auto p-8 relative print:shadow-none overflow-hidden text-slate-800"',
  'mx-auto p-6 relative print:shadow-none overflow-hidden text-slate-800"'
);

// Reduce margin below border box
content = content.replace(
  'rounded-2xl p-4 mb-4 bg-white/50',
  'rounded-2xl p-3 mb-2 bg-white/50'
);

// Reduce margin below 'Payment is non-refundable'
content = content.replace(
  'flex justify-between items-start mb-8 px-2 relative z-10',
  'flex justify-between items-start mb-4 px-2 relative z-10'
);

// Reduce margin below 'ABA'
content = content.replace(
  'flex items-center gap-4 mb-6 relative z-10',
  'flex items-center gap-4 mb-2 relative z-10'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
