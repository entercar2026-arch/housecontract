import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const invoiceTabHtml = `
            <button
               onClick={() => {
                 setActiveTab('invoice');
                 setIsLangMenuOpen(false);
               }}
               className={\`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 \${activeTab === 'invoice' ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}\`}
               title="វិក្កយបត្រ / Invoice"
            >
              <Receipt className="w-4 h-4" />
            </button>
`;

content = content.replace(
  `                </div>
              )}
            </div>`,
  `                </div>
              )}
            </div>
${invoiceTabHtml}`
);

fs.writeFileSync('src/App.tsx', content);
