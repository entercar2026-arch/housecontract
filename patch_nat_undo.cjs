const fs = require('fs');
let code = fs.readFileSync('src/components/ContractPreview.tsx', 'utf8');

code = code.replace(
  'const lowerVal = khmerPart.toLowerCase().replace(/[^a-z0-9\\u1780-\\u17FF]/g, "").trim();',
  'const lowerVal = khmerPart.toLowerCase().trim();'
);
code = code.replace(
  'const lowerVal = englishPart.toLowerCase().replace(/[^a-z0-9\\u1780-\\u17FF]/g, "").trim();',
  'const lowerVal = englishPart.toLowerCase().trim();'
);

fs.writeFileSync('src/components/ContractPreview.tsx', code);
