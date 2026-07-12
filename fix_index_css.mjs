import fs from 'fs';
let content = fs.readFileSync('src/index.css', 'utf-8');

content = content.replace(
  'width: 100%;\n    margin: 0;\n    padding: 0;',
  'width: 100%;\n    height: 100vh;\n    overflow: hidden;\n    margin: 0;\n    padding: 0;'
);

fs.writeFileSync('src/index.css', content);
