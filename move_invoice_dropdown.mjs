import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// First, remove the old Invoice button from the tabs.
content = content.replace(
  /\s*<button\s*onClick=\{\(\) => \{\s*setActiveTab\('invoice'\);\s*setIsLangMenuOpen\(false\);\s*\}\}\s*className=\{`[^`]+`\}\s*title="វិក្កយបត្រ \/ Invoice"\s*>\s*<Receipt className="w-4 h-4" \/>\s*<\/button>/g,
  ''
);

// Second, update the Type Menu button to show Invoice if activeTab === 'invoice'
const typeButtonOld = `<button
              onClick={() => setIsTypeMenuOpen(!isTypeMenuOpen)}
              className="flex bg-white p-1.5 rounded-xl px-2 md:px-3 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
              title={state.contractType === 'car' ? 'កិច្ចសន្យាជួលរថយន្ដ (Car)' : 'កិច្ចសន្យាជួលផ្ទះ (House)'}
            >
              {state.contractType === 'car' ? <Car className="w-4 h-4 text-indigo-600" /> : <Home className="w-4 h-4 text-indigo-600" />}
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>`;

const typeButtonNew = `<button
              onClick={() => setIsTypeMenuOpen(!isTypeMenuOpen)}
              className="flex bg-white p-1.5 rounded-xl px-2 md:px-3 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
              title={activeTab === 'invoice' ? 'វិក្កយបត្រ (Invoice)' : state.contractType === 'car' ? 'កិច្ចសន្យាជួលរថយន្ដ (Car)' : 'កិច្ចសន្យាជួលផ្ទះ (House)'}
            >
              {activeTab === 'invoice' ? <Receipt className="w-4 h-4 text-indigo-600" /> : state.contractType === 'car' ? <Car className="w-4 h-4 text-indigo-600" /> : <Home className="w-4 h-4 text-indigo-600" />}
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>`;

content = content.replace(typeButtonOld, typeButtonNew);

// Third, add the Invoice option to the dropdown
const dropdownOptionsOld = `<div className="absolute top-full left-0 mt-2 min-w-[160px] bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 flex flex-col">
                <button 
                  onClick={() => { setState(prev => ({...prev, contractType: 'house'})); setIsTypeMenuOpen(false); }}
                  className={\`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 \${state.contractType === 'house' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}\`}
                >
                  <Home className="w-4 h-4" /> កិច្ចសន្យាជួលផ្ទះ
                </button>
                <button 
                  onClick={() => { setState(prev => ({...prev, contractType: 'car'})); setIsTypeMenuOpen(false); }}
                  className={\`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 \${state.contractType === 'car' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}\`}
                >
                  <Car className="w-4 h-4" /> កិច្ចសន្យាជួលរថយន្ដ
                </button>
              </div>`;

const dropdownOptionsNew = `<div className="absolute top-full left-0 mt-2 min-w-[160px] bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 flex flex-col">
                <button 
                  onClick={() => { setState(prev => ({...prev, contractType: 'house'})); if (activeTab === 'invoice') setActiveTab('form'); setIsTypeMenuOpen(false); }}
                  className={\`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 \${state.contractType === 'house' && activeTab !== 'invoice' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}\`}
                >
                  <Home className="w-4 h-4" /> កិច្ចសន្យាជួលផ្ទះ
                </button>
                <button 
                  onClick={() => { setState(prev => ({...prev, contractType: 'car'})); if (activeTab === 'invoice') setActiveTab('form'); setIsTypeMenuOpen(false); }}
                  className={\`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 \${state.contractType === 'car' && activeTab !== 'invoice' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}\`}
                >
                  <Car className="w-4 h-4" /> កិច្ចសន្យាជួលរថយន្ដ
                </button>
                <div className="h-px bg-slate-200 my-1 mx-2"></div>
                <button 
                  onClick={() => { setActiveTab('invoice'); setIsTypeMenuOpen(false); }}
                  className={\`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 \${activeTab === 'invoice' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}\`}
                >
                  <Receipt className="w-4 h-4" /> វិក្កយបត្រ (Invoice)
                </button>
              </div>`;

content = content.replace(dropdownOptionsOld, dropdownOptionsNew);

fs.writeFileSync('src/App.tsx', content);
