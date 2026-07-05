const fs = require('fs');
let code = fs.readFileSync('src/components/ContractPreview.tsx', 'utf8');

code = code.replace(/contract\.carColor \|\|/g, '');
code = code.replace(/contract\.carPlateNo \|\|/g, '');

fs.writeFileSync('src/components/ContractPreview.tsx', code);
console.log("Fixed TS errors");
