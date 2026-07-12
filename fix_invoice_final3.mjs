import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Replace the wrapper classes
content = content.replace(
  'print:w-[200mm] print:h-[140mm] print:max-h-[140mm] print:min-h-[140mm] print:overflow-hidden print:break-inside-avoid print:m-0 print:p-0 bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-2 relative print:shadow-none text-slate-800',
  'print:w-[210mm] print:h-[148mm] print:max-h-[148mm] print:overflow-hidden print:break-inside-avoid bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-3 md:p-5 print:p-4 relative print:shadow-none text-slate-800 print:text-[0.95rem]'
);

// Reduce some margins/paddings inside for print mode
content = content.replace(
  'className="flex flex-col gap-4 pt-2"',
  'className="flex flex-col gap-3 pt-1"'
);

// We need to fix the footer negative margins to match print:p-4
content = content.replace(
  'className="mt-auto -mx-3 md:-mx-5 print:-mx-4 -mb-3 md:-mb-5 print:-mb-4 bg-[#631633] text-white p-2.5 flex justify-between items-center text-[10px] sm:text-[11px]"',
  'className="mt-auto -mx-3 md:-mx-5 print:-mx-4 -mb-3 md:-mb-5 print:-mb-4 bg-[#631633] text-white p-2 flex justify-between items-center text-[10px] sm:text-[11px]"'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
