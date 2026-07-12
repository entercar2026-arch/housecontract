import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  '<span className="font-moul">ផ្ទះលេខ 128E0z ផ្លូវ136 សង្កាត់ផ្សារថ្មី2 ខណ្ឌដូនពេញ ភ្នំពេញ</span>',
  '<input type="text" className="font-moul bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-full max-w-[350px]" defaultValue="ផ្ទះលេខ 128E0z ផ្លូវ136 សង្កាត់ផ្សារថ្មី2 ខណ្ឌដូនពេញ ភ្នំពេញ" />'
);

content = content.replace(
  '<span>096 671 4442</span>',
  '<input type="text" className="bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-32" defaultValue="096 671 4442" />'
);

content = content.replace(
  '<div className="text-lg leading-none">000 248 201</div>',
  '<input type="text" className="text-lg leading-none bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-32 text-center" defaultValue="000 248 201" />'
);

content = content.replace(
  '<div className="text-xs">TOUCH CHANDARAHEANG</div>',
  '<input type="text" className="text-xs bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-40 text-center uppercase" defaultValue="TOUCH CHANDARAHEANG" />'
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
