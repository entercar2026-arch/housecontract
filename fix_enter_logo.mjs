import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

const newLogoHtml = `<div className="flex flex-col items-center justify-center w-full h-full p-2">
                        <div className="relative w-12 h-8 bg-white rounded-md shadow-sm border-b-2 border-slate-300 flex items-center justify-center mb-1">
                          <span className="font-bold text-[10px] italic text-[#4d0924]">Enter</span>
                          <svg className="absolute top-1 left-1 w-2 h-2 text-[#4d0924]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 10 4 15 9 20"></polyline>
                            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                          </svg>
                        </div>
                        <span className="font-bold text-[8px] tracking-widest text-white mt-1">CAR RENTAL</span>
                     </div>`;

content = content.replace(
  /<div className="flex flex-col items-center justify-center w-full h-full p-2">\s*<svg viewBox="0 0 100 80"[\s\S]*?<\/svg>\s*<span className="font-bold text-\[8px\] tracking-widest mt-0\.5">CAR RENTAL<\/span>\s*<\/div>/,
  newLogoHtml
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
