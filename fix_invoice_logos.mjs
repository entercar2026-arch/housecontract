import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

const newLogoHtml = `{serviceType === 'car' ? (
                     <img src="/car_logo.png" alt="Car Rental Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }} />
                  ) : (
                     <img src="/house_logo.png" alt="Property Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }} />
                  )}
                  {serviceType === 'car' ? (
                     <div className="hidden flex-col items-center justify-center w-full h-full p-2">
                        <div className="relative w-12 h-8 bg-white rounded-md shadow-sm border-b-2 border-slate-300 flex items-center justify-center mb-1">
                          <span className="font-bold text-[10px] italic text-[#4d0924]">Enter</span>
                          <svg className="absolute top-1 left-1 w-2 h-2 text-[#4d0924]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 10 4 15 9 20"></polyline>
                            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                          </svg>
                        </div>
                        <span className="font-bold text-[8px] tracking-widest text-white mt-1">CAR RENTAL</span>
                     </div>
                  ) : (
                     <div className="hidden flex-col items-center justify-center w-full h-full p-2">
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
                  )}`;

content = content.replace(
  /\{serviceType === 'car' \? \([\s\S]*?<\/svg>\s*<span className="text-\[7px\] tracking-\[0\.25em\] font-medium mt-1">PROPERTY<\/span>\s*<\/div>\s*\)\}/,
  newLogoHtml
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
