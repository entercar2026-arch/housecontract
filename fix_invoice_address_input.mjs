import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

const oldAddress = `<div className="flex items-start gap-1.5">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <div className="flex flex-col">
            <span className="font-moul">ផ្ទះលេខ128E0 ផ្លូវ136 សង្កាត់ផ្សារថ្មី2 ខណ្ឌដូនពេញ ភ្នំពេញ</span>
            <span className="text-[8px] opacity-90 mt-0.5">No. 128E0, St. 136, Phsar Thmey 2, Daun Penh, Phnom Penh</span>
          </div>
        </div>`;

const newAddress = `<div className="flex items-start gap-1.5 w-full">
          <svg className="w-4 h-4 mt-1 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <div className="flex flex-col w-full">
            <input type="text" className="font-moul bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-[350px] max-w-[350px]" defaultValue="ផ្ទះលេខ128E0 ផ្លូវ136 សង្កាត់ផ្សារថ្មី2 ខណ្ឌដូនពេញ ភ្នំពេញ" />
            <input type="text" className="text-[8px] opacity-90 mt-0.5 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-[350px] max-w-[350px]" defaultValue="No. 128E0, St. 136, Phsar Thmey 2, Daun Penh, Phnom Penh" />
          </div>
        </div>`;

content = content.replace(oldAddress, newAddress);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
