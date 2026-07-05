const fs = require('fs');
let code = fs.readFileSync('src/translations.tsx', 'utf8');

const targetZh = `    carLeaseTitle: "Car Rental Contract",
    carOwner: "Car owner",
    carRenter: "Car renter",
    carOwnerDesc: "who is the legal owner of car",`;

const replaceZh = `    carLeaseTitle: "汽车租赁合同",
    carOwner: "车主",
    carRenter: "租客",
    carOwnerDesc: "汽车合法拥有者；",`;

// We only want to replace the first occurrence after zh:
let lines = code.split('\n');
let inZh = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('zh: {')) inZh = true;
  if (lines[i].includes('ja: {')) inZh = false;
  
  if (inZh && lines[i].includes('carLeaseTitle: "Car Rental Contract"')) {
    lines[i] = '    carLeaseTitle: "汽车租赁合同",';
    lines[i+1] = '    carOwner: "车主",';
    lines[i+2] = '    carRenter: "租客",';
    lines[i+3] = '    carOwnerDesc: "汽车合法拥有者；",';
    break;
  }
}

fs.writeFileSync('src/translations.tsx', lines.join('\n'));
console.log("Patched zh headers");
