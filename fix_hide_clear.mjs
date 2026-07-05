import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  '${activeTab === \\\'invoice\\\' ? \\\'hidden\\\' : \\\'\\\'}`}',
  '${activeTab === \'invoice\' ? \'hidden\' : \'\'}`}'
);

fs.writeFileSync('src/App.tsx', content);
