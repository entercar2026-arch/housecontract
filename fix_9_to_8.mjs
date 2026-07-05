import fs from 'fs';
let preview = fs.readFileSync('src/components/ContractPreview.tsx', 'utf-8');
preview = preview.replace('<p>៩.១ ករណី', '<p>៨.១ ករណី');
preview = preview.replace('<p>៩.២ ភាគី(ខ)', '<p>៨.២ ភាគី(ខ)');
preview = preview.replace('<p>៩.៣ ករណីភាគី(ខ)', '<p>៨.៣ ករណីភាគី(ខ)');
fs.writeFileSync('src/components/ContractPreview.tsx', preview);

let trans = fs.readFileSync('src/translations.tsx', 'utf-8');
trans = trans.replace(/>9\.1/g, '>8.1');
trans = trans.replace(/>9\.2/g, '>8.2');
trans = trans.replace(/>9\.3/g, '>8.3');
fs.writeFileSync('src/translations.tsx', trans);
