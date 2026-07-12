import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  'allowTaint: true,',
  '// allowTaint: true, (removed to prevent tainted canvas error)'
);

fs.writeFileSync('src/App.tsx', content);
