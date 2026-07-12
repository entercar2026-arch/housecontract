import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  'className="mt-auto -mx-4 md:-mx-5 print:-mx-4 -mb-4 md:-mb-5 print:-mb-4 bg-[#631633] text-white p-2.5 flex justify-between items-center text-[10px] sm:text-[11px]"',
  'className="mt-auto -mx-3 md:-mx-5 print:-mx-4 -mb-3 md:-mb-5 print:-mb-4 bg-[#631633] text-white p-2.5 flex justify-between items-center text-[10px] sm:text-[11px]"'
);

content = content.replace(
  '<span className="font-moul">ផ្ទះលេខ 128E0z ផ្លូវ136 សង្កាត់ផ្សារថ្មី2 ខណ្ឌដូនពេញ ភ្នំពេញ</span>',
  '<span className="font-moul text-left">ផ្ទះលេខ 128E0z ផ្លូវ136 សង្កាត់ផ្សារថ្មី2 ខណ្ឌដូនពេញ ភ្នំពេញ</span>'
);

// I had changed the texts to inputs! The user said "I lost the previous address/phone". 
// I should probably change the inputs back to spans, OR make the inputs have `contentEditable` like behavior.
// Let's change the footer inputs back to spans if they were inputs, wait, let me check what they are now.

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
