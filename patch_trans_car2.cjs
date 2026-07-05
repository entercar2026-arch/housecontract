const fs = require('fs');
let code = fs.readFileSync('src/translations.tsx', 'utf8');

const targetEn = `content: () => <div className="space-y-2"><p>9.1 In the event that the vehicle subject to the rental is slightly damaged or seriously damaged due to negligent use or fault of Party (B), the repair shall be the responsibility of Party (B), except in the case of wear and tear due to normal use, in which case the repair shall be the responsibility of Party (A).</p><p>9.2 Party (B) shall be fully responsible for any damage to the vehicle such as (collision, overturning, falling into water, theft, fire or other accidents) by paying compensation as agreed upon at a price of <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> of the vehicle price to Party (A).</p>`;
const replaceEn = `content: (contract: any) => <div className="space-y-2"><p>9.1 In the event that the vehicle subject to the rental is slightly damaged or seriously damaged due to negligent use or fault of Party (B), the repair shall be the responsibility of Party (B), except in the case of wear and tear due to normal use, in which case the repair shall be the responsibility of Party (A).</p><p>9.2 Party (B) shall be fully responsible for any damage to the vehicle such as (collision, overturning, falling into water, theft, fire or other accidents) by paying compensation as agreed upon at a price of <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> of the vehicle price to Party (A).</p>`;

if (code.includes(targetEn)) {
  code = code.replace(targetEn, replaceEn);
  console.log("Patched translation En target 2");
} else {
  console.log("Failed to patch English translation 2");
}

fs.writeFileSync('src/translations.tsx', code);
