import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Step 1: Remove the `hidden` class from the parent div
content = content.replace(
  /ring-1 ring-slate-200\/50 \$\{activeTab === 'invoice' \? 'hidden' : ''\}/g,
  'ring-1 ring-slate-200/50 '
);

// Step 2: Hide the Edit and Preview buttons if activeTab is invoice
content = content.replace(
  /<button \n               onClick=\{\(\) => \{\n                 setActiveTab\('form'\);\n                 setIsLangMenuOpen\(false\);\n               \}\}\n               className=\{`px-3 md:px-4 py-1\.5 text-\[10px\] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1\.5 \$\{activeTab === 'form' \? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900\/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200\/50'\}`\}/g,
  `<button \n               onClick={() => {\n                 setActiveTab('form');\n                 setIsLangMenuOpen(false);\n               }}\n               className={\`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 \${activeTab === 'form' ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'} \${activeTab === 'invoice' ? 'hidden' : ''}\`}`
);

content = content.replace(
  /<div className="relative">\n              <button \n                 onClick=\{\(\) => \{\n                   if \(activeTab === 'preview'\) \{\n                     setIsLangMenuOpen\(!isLangMenuOpen\);\n                   \} else \{\n                     setActiveTab\('preview'\);\n                     setIsLangMenuOpen\(true\);\n                   \}\n                 \}\}\n                 className=\{`px-3 md:px-4 py-1\.5 text-\[10px\] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1\.5 \$\{activeTab === 'preview' \? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900\/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200\/50'\}`\}/g,
  `<div className={\`relative \${activeTab === 'invoice' ? 'hidden' : ''}\`}>\n              <button \n                 onClick={() => {\n                   if (activeTab === 'preview') {\n                     setIsLangMenuOpen(!isLangMenuOpen);\n                   } else {\n                     setActiveTab('preview');\n                     setIsLangMenuOpen(true);\n                   }\n                 }}\n                 className={\`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 \${activeTab === 'preview' ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}\`}`
);

fs.writeFileSync('src/App.tsx', content);
