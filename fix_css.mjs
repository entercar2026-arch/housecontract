import fs from 'fs';
let content = fs.readFileSync('src/index.css', 'utf-8');

if (!content.includes('print-color-adjust')) {
  content = content.replace(
    /background-color: white !important;/g,
    'background-color: white !important;\n    -webkit-print-color-adjust: exact !important;\n    print-color-adjust: exact !important;\n    color-adjust: exact !important;'
  );
  fs.writeFileSync('src/index.css', content);
}
