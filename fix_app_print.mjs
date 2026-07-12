import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  '<div id="printable-area" className="w-full flex justify-center">',
  '<div id="printable-area" className="w-full flex justify-center print:block print:w-auto print:m-0 print:p-0">'
);

content = content.replace(
  '<div className={`w-full flex justify-center overflow-x-auto md:overflow-x-visible ${printMode ? \'py-0\' : \'py-2 md:py-4\'} print:p-0 print:block`}>',
  '<div className={`w-full flex justify-center overflow-x-auto md:overflow-x-visible ${printMode ? \'py-0\' : \'py-2 md:py-4\'} print:m-0 print:p-0 print:block`}>'
);

fs.writeFileSync('src/App.tsx', content);
