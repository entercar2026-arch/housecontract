import fs from 'fs';
let code = fs.readFileSync('src/translations.tsx', 'utf-8');

// Replace en
const en_old1 = `<p>Party (B) requests to rent the vehicle as specified in the above paragraph that belongs to Party (A).</p>`;
const en_old2 = `<p>Party (B) agrees to rent the vehicle described above from Party (A) for <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'en')}</span>. Party (B) shall not use the vehicle for any purpose other than <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'en')}</span>. Any change to the purpose of this rental requires prior written agreement.</p>`;
const en_new = `<p>Party (B) requests and agrees to rent the vehicle described above from Party (A) for <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'en')}</span>. Party (B) shall not use the vehicle for any purpose other than <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'en')}</span>. Any change to the purpose of this rental requires prior written agreement.</p>`;
code = code.replace(
  /[\s\S]*?(content: \(\) => <p>Party \(B\) requests to rent the vehicle as specified in the above paragraph that belongs to Party \(A\)\.<\/p>[\s\S]*?\}),[\s\S]*?\{[\s\S]*?title: "RESPECT 2",[\s\S]*?content: \(contract: any\) => <p>Party \(B\) agrees to rent the vehicle described above from Party \(A\) for <span className="font-bold">\{getTranslatedValue\(contract\.carPurpose, 'purpose', 'en'\)\}<\/span>\. Party \(B\) shall not use the vehicle for any purpose other than <span className="font-bold">\{getTranslatedValue\(contract\.carPurpose, 'purpose', 'en'\)\}<\/span>\. Any change to the purpose of this rental requires prior written agreement\.<\/p>[\s\S]*?\}/,
  (match) => {
    // wait this regex is too broad, let's just do targeted replace for the array elements.
    return match;
  }
);
