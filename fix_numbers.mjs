import fs from 'fs';
let preview = fs.readFileSync('src/components/ContractPreview.tsx', 'utf-8');
preview = preview.replace(/១៣\.១/g, '១២.១');
preview = preview.replace(/១៣\.២/g, '១២.២');
preview = preview.replace(/១៣\.៣/g, '១២.៣');

preview = preview.replace(/១៤\.១/g, '១៣.១');
preview = preview.replace(/១៤\.២/g, '១៣.២');
preview = preview.replace(/១៤\.៣/g, '១៣.៣');
fs.writeFileSync('src/components/ContractPreview.tsx', preview);

let trans = fs.readFileSync('src/translations.tsx', 'utf-8');
trans = trans.replace(/>13\.1/g, '>12.1');
trans = trans.replace(/>13\.2/g, '>12.2');
trans = trans.replace(/>13\.3/g, '>12.3');

trans = trans.replace(/>14\.1/g, '>13.1');
trans = trans.replace(/>14\.2/g, '>13.2');
trans = trans.replace(/>14\.3/g, '>13.3');
fs.writeFileSync('src/translations.tsx', trans);
