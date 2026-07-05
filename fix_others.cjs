const fs = require('fs');
let code = fs.readFileSync('src/translations.tsx', 'utf8');

// Fix the nested spans in en:
code = code.replace(
  `at a price of <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '<span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span>'}</span> of the vehicle`,
  `at a price of <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> of the vehicle`
);

// Fix ja, ko, ru which use "at a price of the vehicle price"
const target = `content: () => <div className="space-y-2"><p>9.1 In the event that the vehicle subject to the rental is slightly damaged or seriously damaged due to negligent use or fault of Party (B), the repair shall be the responsibility of Party (B), except in the case of wear and tear due to normal use, in which case the repair shall be the responsibility of Party (A).</p><p>9.2 Party (B) shall be fully responsible for any damage to the vehicle such as (collision, overturning, falling into water, theft, fire or other accidents) by paying compensation as agreed upon at a price of the vehicle price to Party (A).</p><p>9.3 In the event that Party (B) uses the vehicle with collisions, scratches or other damages, Party (A) must be notified without allowing Party (B) to conceal the information of taking the vehicle for repair without the consent of Party (A).</p></div>`;
const replacement = `content: (contract: any) => <div className="space-y-2"><p>9.1 In the event that the vehicle subject to the rental is slightly damaged or seriously damaged due to negligent use or fault of Party (B), the repair shall be the responsibility of Party (B), except in the case of wear and tear due to normal use, in which case the repair shall be the responsibility of Party (A).</p><p>9.2 Party (B) shall be fully responsible for any damage to the vehicle such as (collision, overturning, falling into water, theft, fire or other accidents) by paying compensation as agreed upon at a price of <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> of the vehicle price to Party (A).</p><p>9.3 In the event that Party (B) uses the vehicle with collisions, scratches or other damages, Party (A) must be notified without allowing Party (B) to conceal the information of taking the vehicle for repair without the consent of Party (A).</p></div>`;

code = code.split(target).join(replacement);

fs.writeFileSync('src/translations.tsx', code);
console.log("Fixed other languages");
