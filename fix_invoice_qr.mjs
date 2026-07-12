import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Add qrUrl state
content = content.replace(
  "const [logoUrl, setLogoUrl] = useState<string>('');",
  "const [logoUrl, setLogoUrl] = useState<string>('');\n  const [qrUrl, setQrUrl] = useState<string>('');"
);

// Replace ABA section
const oldABA = `<div className="flex items-center gap-4 mb-1 relative z-10">
          <div className="bg-[#002f6c] text-white px-4 py-2 rounded-lg flex flex-col items-center justify-center font-bold">
            <div className="text-xs">ABA</div>
            <div className="text-[8px]">MOBILE</div>
          </div>
          <div className="bg-[#631633] text-white px-4 py-2 rounded-lg font-bold">
            <input type="text" className="text-lg leading-none bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-32 text-center" defaultValue="000 248 201" />
            <input type="text" className="text-xs bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-40 text-center uppercase" defaultValue="TOUCH CHANDARAHEANG" />
          </div>
        </div>`;

const newABA = `<div className="flex items-center gap-4 mb-1 relative z-10">
          <div className="flex items-center gap-2">
            <div className="bg-[#002f6c] text-white px-4 py-1.5 rounded-lg flex flex-col items-center justify-center font-bold h-[42px]">
              <div className="text-xs leading-none">ABA</div>
              <div className="text-[8px] leading-tight">MOBILE</div>
            </div>
            <div className="bg-[#631633] text-white px-4 py-1 rounded-lg font-bold flex flex-col justify-center h-[42px]">
              <input type="text" className="text-sm leading-none bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-32 text-center" defaultValue="000 248 201" />
              <input type="text" className="text-[9px] bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-40 text-center uppercase" defaultValue="TOUCH CHANDARAHEANG" />
            </div>
          </div>
          
          <div className="relative group w-[42px] h-[42px] rounded border-2 border-[#002f6c] bg-white overflow-hidden flex items-center justify-center shrink-0">
            {qrUrl ? (
              <img src={qrUrl} alt="QR Code" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            )}
            <label className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity print:hidden">
              <span className="text-[7px] font-semibold text-center leading-[1.1]">ប្តូរ QR<br/>(Change)</span>
              <input 
                 type="file" 
                 accept="image/*" 
                 className="hidden" 
                 onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setQrUrl(URL.createObjectURL(e.target.files[0]));
                  }
                }} 
              />
            </label>
          </div>
        </div>`;

content = content.replace(oldABA, newABA);

// Replace address
const oldAddress = `<div className="flex items-center gap-2">
          <svg className="w-4 h-4 " fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <input type="text" className="font-moul bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-full max-w-[350px]" defaultValue="ផ្ទះលេខ 128E0z ផ្លូវ136 សង្កាត់ផ្សារថ្មី2 ខណ្ឌដូនពេញ ភ្នំពេញ" />
        </div>`;

const newAddress = `<div className="flex items-start gap-1.5">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <div className="flex flex-col">
            <span className="font-moul">ផ្ទះលេខ128E0 ផ្លូវ136 សង្កាត់ផ្សារថ្មី2 ខណ្ឌដូនពេញ ភ្នំពេញ</span>
            <span className="text-[8px] opacity-90 mt-0.5">No. 128E0, St. 136, Phsar Thmey 2, Daun Penh, Phnom Penh</span>
          </div>
        </div>`;

content = content.replace(oldAddress, newAddress);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
