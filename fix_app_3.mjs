import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 3. Hide Preview button wrapper
content = content.replace(
  '<div className="relative">\n              <button \n                 onClick={() => {\n                   if (activeTab === \'preview\') {',
  '<div className="relative" style={{ display: activeTab === "invoice" ? "none" : "block" }}>\n              <button \n                 onClick={() => {\n                   if (activeTab === \'preview\') {'
);

fs.writeFileSync('src/App.tsx', content);
