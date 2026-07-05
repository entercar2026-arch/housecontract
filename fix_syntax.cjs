const fs = require('fs');
let code = fs.readFileSync('src/translations.tsx', 'utf8');

// I will just replace any double nested ones:
// `contract.carCompensation : '<span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span>'`

code = code.split("'<span className=\"font-bold\">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span>'").join("'_______________________'");

fs.writeFileSync('src/translations.tsx', code);
console.log("Fixed syntax");
