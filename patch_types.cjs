const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  'carColor?: string;',
  'carColorKh?: string;\n  carColorEn?: string;'
).replace(
  'carPlateNo?: string;',
  'carPlateNoKh?: string;\n  carPlateNoEn?: string;\n  carCompensation?: string;'
);

fs.writeFileSync('src/types.ts', code);
console.log("Patched types.ts");
