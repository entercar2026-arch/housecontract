const fs = require('fs');
let code = fs.readFileSync('src/components/ContractPreview.tsx', 'utf8');

const target1 = `ត្រូវជាម្ចាស់កម្មសិទ្ធិករលើរថយន្ដម៉ាក <span className="font-bold">{contract.carModel || '............................'}</span> ពណ៌ <span className="font-bold">{contract.carColor || '...............'}</span> ឆ្នាំផលិត <span className="font-bold">{contract.carYear || '...........'}</span> ស្លាកលេខ <span className="font-bold">{contract.carPlateNo || '..................'}</span>`;
const replacement1 = `ត្រូវជាម្ចាស់កម្មសិទ្ធិករលើរថយន្ដម៉ាក <span className="font-bold">{contract.carModel || '............................'}</span> ពណ៌ <span className="font-bold">{contract.carColorKh || contract.carColorEn || contract.carColor || '...............'}</span> ឆ្នាំផលិត <span className="font-bold">{contract.carYear || '...........'}</span> ស្លាកលេខ <span className="font-bold">{contract.carPlateNoKh || contract.carPlateNoEn || contract.carPlateNo || '..................'}</span>`;

const target2 = `Model <span className="font-bold">{contract.carModel || '............................'}</span>, Color <span className="font-bold">{contract.carColor || '...............'}</span>, Year <span className="font-bold">{contract.carYear || '...........'}</span>, Plate No <span className="font-bold">{contract.carPlateNo || '..................'}</span>`;
const replacement2 = `Model <span className="font-bold">{contract.carModel || '............................'}</span>, Color <span className="font-bold">{contract.carColorEn || contract.carColorKh || contract.carColor || '...............'}</span>, Year <span className="font-bold">{contract.carYear || '...........'}</span>, Plate No <span className="font-bold">{contract.carPlateNoEn || contract.carPlateNoKh || contract.carPlateNo || '..................'}</span>`;

const target3 = `ក្នុងតម្លៃ _______________________ លើតម្លៃរថយន្តសងមកភាគី(ក)។`;
const replacement3 = `ក្នុងតម្លៃ <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> លើតម្លៃរថយន្តសងមកភាគី(ក)។`;

if (code.includes(target1)) {
  code = code.replace(target1, replacement1);
  console.log("Patched target1");
} else { console.log("Failed target1"); }

if (code.includes(target2)) {
  code = code.replace(target2, replacement2);
  console.log("Patched target2");
} else { console.log("Failed target2"); }

if (code.includes(target3)) {
  code = code.replace(target3, replacement3);
  console.log("Patched target3");
} else { console.log("Failed target3"); }

fs.writeFileSync('src/components/ContractPreview.tsx', code);
