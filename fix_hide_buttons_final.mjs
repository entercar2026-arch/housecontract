import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// I need to extract the Clear All and Print to PDF buttons out of the wrapper.
// Actually, I can just remove the `hidden` class from the wrapper, and instead add `hidden` specifically to the Edit, Preview buttons!

content = content.replace(
  '${activeTab === \\\'invoice\\\' ? \\\'hidden\\\' : \\\'\\\'}',
  ''
);

fs.writeFileSync('src/App.tsx', content);
