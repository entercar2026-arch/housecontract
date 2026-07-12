import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Container
content = content.replace(
  'className="w-[210mm] h-[148mm] md:min-h-0 bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-4 md:p-6 print:p-4 relative print:shadow-none overflow-hidden text-slate-800"',
  'className="flex flex-col w-[210mm] h-[148mm] md:min-h-0 bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-4 md:p-5 print:p-4 relative print:shadow-none overflow-hidden text-slate-800"'
);

// Header elements
content = content.replace(
  'className="w-24 h-24',
  'className="w-20 h-20'
);
content = content.replace(
  'className="bg-[#4d0924] text-white rounded-xl shadow-lg border-b-4 border-slate-700 w-24 h-24 flex flex-col items-center justify-center shrink-0 overflow-hidden relative"',
  'className="bg-[#4d0924] text-white rounded-xl shadow-lg border-b-4 border-slate-700 w-20 h-20 flex flex-col items-center justify-center shrink-0 overflow-hidden relative"'
);

content = content.replace(
  'text-3xl font-moul text-slate-800 mb-1',
  'text-2xl font-moul text-slate-800 mb-0.5'
);
content = content.replace(
  'text-xl font-bold uppercase',
  'text-lg font-bold uppercase'
);

content = content.replace(
  'mb-2 px-2',
  'mb-1 px-2'
);

// Border box
content = content.replace(
  'rounded-2xl p-3 mb-2 bg-white/50',
  'rounded-2xl p-2 mb-2 bg-white/50'
);
content = content.replace(
  'flex flex-col gap-2',
  'flex flex-col gap-1.5'
);

// Payment is non-refundable
content = content.replace(
  'mb-4 px-2',
  'mb-2 px-2'
);

// ABA section
content = content.replace(
  'gap-4 mb-10',
  'gap-4 mb-2'
);

// Footer
content = content.replace(
  'absolute bottom-0 left-0 right-0 bg-[#631633] text-white p-3 flex justify-between items-center text-[10px] sm:text-xs',
  'mt-auto -mx-4 md:-mx-5 print:-mx-4 -mb-4 md:-mb-5 print:-mb-4 bg-[#631633] text-white p-2.5 flex justify-between items-center text-[10px] sm:text-[11px]'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
