import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  '<div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl ml-1 md:ml-4 relative ring-1 ring-slate-200/50">',
  '<div className={`flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl ml-1 md:ml-4 relative ring-1 ring-slate-200/50 ${activeTab === \'invoice\' ? \'hidden\' : \'\'}`}>'
);

fs.writeFileSync('src/App.tsx', content);
