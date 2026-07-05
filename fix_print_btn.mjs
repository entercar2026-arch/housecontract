import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  "{activeTab === 'preview' && (",
  "{(activeTab === 'preview' || activeTab === 'invoice') && ("
);

fs.writeFileSync('src/App.tsx', content);
