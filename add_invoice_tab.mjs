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

const previewDivEndIndex = content.indexOf('</button>', content.indexOf('title="Bilingual"'));
// Actually it's easier to find the end of the relative div.
// Let's replace the button for "Clear All" to insert it before that.

content = content.replace(
  `            <button
               type="button"
               onClick={() => setShowClearConfirm(true)}
               className="ml-1 md:ml-4 flex bg-white/50 text-red-600 p-1.5 rounded-2xl px-3 md:px-4 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 hover:bg-red-50 ring-1 ring-red-100"
               title="Clear All"
            >`,
  invoiceTabHtml.trim() + `
            </div>
            
            <button
               type="button"
               onClick={() => setShowClearConfirm(true)}
               className="ml-1 md:ml-4 flex bg-white/50 text-red-600 p-1.5 rounded-2xl px-3 md:px-4 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 hover:bg-red-50 ring-1 ring-red-100"
               title="Clear All"
            >`
);

fs.writeFileSync('src/App.tsx', content);
