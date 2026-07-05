import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

const newLogoBlock = `
            <div className="relative group shrink-0">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-24 h-24 object-contain rounded-xl shadow-sm" />
              ) : (
                <div className="bg-[#4d0924] text-white rounded-xl shadow-lg border-b-4 border-slate-700 w-24 h-24 flex flex-col items-center justify-center shrink-0 overflow-hidden relative">
                  {serviceType === 'car' ? (
                     <div className="flex flex-col items-center justify-center w-full h-full p-2">
                        <svg viewBox="0 0 100 80" className="w-14 h-12 drop-shadow-md mb-1 relative left-[-2px]">
                          <path d="M 12 15 L 85 10 L 92 65 L 18 72 Z" fill="white" stroke="#333" strokeWidth="1" strokeLinejoin="round" />
                          <path d="M 20 22 L 78 17 L 83 58 L 25 63 Z" fill="none" stroke="#ccc" strokeWidth="1" />
                          <text x="49" y="47" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="900" fontStyle="italic" fill="#4d0924" textAnchor="middle" transform="rotate(-5, 50, 40)">Enter</text>
                        </svg>
                        <span className="font-bold text-[8px] tracking-widest mt-0.5">CAR RENTAL</span>
                     </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center w-full h-full p-2">
                        <svg viewBox="0 0 200 90" className="w-16 h-10 drop-shadow-sm">
                          <text x="15" y="60" fontFamily="sans-serif" fontSize="38" fontWeight="bold" fill="white" letterSpacing="2">L</text>
                          <text x="45" y="60" fontFamily="sans-serif" fontSize="38" fontWeight="bold" fill="white" letterSpacing="2">E</text>
                          <text x="135" y="60" fontFamily="sans-serif" fontSize="38" fontWeight="bold" fill="white" letterSpacing="2">N</text>
                          <text x="165" y="60" fontFamily="sans-serif" fontSize="38" fontWeight="bold" fill="white" letterSpacing="2">G</text>
                          
                          {/* House forming A */}
                          <path d="M 72 60 L 72 50 L 90 28 L 110 50 L 110 60" fill="none" stroke="white" strokeWidth="5" strokeLinejoin="round" />
                          <path d="M 82 60 L 82 45 L 90 35 L 100 45 L 100 60" fill="none" stroke="white" strokeWidth="3" />
                          
                          {/* Tall building forming I */}
                          <path d="M 108 50 L 112 20 L 128 30 L 128 60" fill="none" stroke="white" strokeWidth="5" strokeLinejoin="round" />
                          <line x1="118" y1="25" x2="118" y2="60" stroke="white" strokeWidth="4" />
                        </svg>
                        <span className="text-[7px] tracking-[0.25em] font-medium mt-1">PROPERTY</span>
                     </div>
                  )}
                </div>
              )}
              
              <label className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl cursor-pointer transition-opacity print:hidden">
                <span className="text-xs font-semibold text-center px-1">ប្តូរ Logo<br/>(Change Logo)</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setLogoUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }} 
                />
              </label>
            </div>
`;

content = content.replace(
  /<div className="relative group shrink-0">[\s\S]*?<\/label>\s*<\/div>/,
  newLogoBlock.trim()
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
