import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

// Replace the QR code container to remove the hover effect and input
const oldQRSection = `          <div className="relative group w-[84px] h-[84px] rounded border-2 border-[#002f6c] bg-white overflow-hidden flex items-center justify-center shrink-0">
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
          </div>`;

const newQRSection = `          <div className="relative w-[84px] h-[84px] rounded border-2 border-[#002f6c] bg-white overflow-hidden flex items-center justify-center shrink-0">
            <img src="/qr-code.png" alt="QR Code" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/qr-placeholder.svg'; }} />
          </div>`;

content = content.replace(oldQRSection, newQRSection);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
