const fs = require('fs');
let code = fs.readFileSync('src/translations.tsx', 'utf8');

const targetEn = `<p>9.2 Party (B) shall be fully responsible for any damage to the vehicle such as (collision, overturning, falling into water, theft, fire or other accidents) by paying compensation as agreed upon at a price of the vehicle price to Party (A).</p>`;
const replaceEn = `<p>9.2 Party (B) shall be fully responsible for any damage to the vehicle such as (collision, overturning, falling into water, theft, fire or other accidents) by paying compensation as agreed upon at a price of <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> of the vehicle price to Party (A).</p>`;

// Replace for English (which is the only one since it's the en object)
if (code.includes(targetEn)) {
  code = code.replace(targetEn, replaceEn);
  console.log("Patched translation En target");
} else {
  console.log("Failed to patch English translation");
}

fs.writeFileSync('src/translations.tsx', code);
