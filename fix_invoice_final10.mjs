import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Use safe printable area for A5
content = content.replace(
  'className="flex flex-col w-[210mm] h-[148.5mm] print:w-[100%] print:h-[138mm] print:max-h-[138mm] print:overflow-hidden print:break-inside-avoid bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-4 relative print:shadow-none text-slate-800"',
  'className="flex flex-col w-[210mm] h-[148.5mm] print:w-[190mm] print:h-[128mm] print:max-h-[128mm] print:overflow-hidden print:break-inside-avoid bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-3 relative print:shadow-none text-slate-800 print:text-[0.9rem]"'
);

// We need to fix the footer negative margins to match print:p-3
content = content.replace(
  'className="mt-auto -mx-3 md:-mx-5 print:-mx-4 -mb-3 md:-mb-5 print:-mb-4 bg-[#631633] text-white p-2 flex justify-between items-center text-[10px] sm:text-[11px]"',
  'className="mt-auto -mx-3 md:-mx-5 print:-mx-3 -mb-3 md:-mb-5 print:-mb-3 bg-[#631633] text-white p-2 flex justify-between items-center text-[10px] sm:text-[11px]"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
