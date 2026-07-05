import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove `hidden` from the wrapper div
content = content.replace(
  /className=\{`flex bg-slate-100\/80 backdrop-blur-sm p-1 rounded-2xl ml-1 md:ml-4 relative ring-1 ring-slate-200\/50 \$\{activeTab === 'invoice' \? 'hidden' : ''\}`\}/,
  'className={`flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl ml-1 md:ml-4 relative ring-1 ring-slate-200/50`}'
);

// 2. Hide Edit button
content = content.replace(
  /title="កែសម្រួល \/ Edit"\n            >/,
  'title="កែសម្រួល / Edit"\n               style={{ display: activeTab === "invoice" ? "none" : "flex" }}\n            >'
);

// 3. Hide Preview button wrapper
content = content.replace(
  /<div className="relative">\n              <button \n                 onClick=\{\(\) => \{\n                   if \(activeTab === 'preview'\) \{/,
  '<div className="relative" style={{ display: activeTab === "invoice" ? "none" : "block" }}>\n              <button \n                 onClick={() => {\n                   if (activeTab === \'preview\') {'
);

fs.writeFileSync('src/App.tsx', content);
