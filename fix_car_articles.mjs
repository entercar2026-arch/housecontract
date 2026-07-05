import fs from 'fs';

let content = fs.readFileSync('src/components/ContractPreview.tsx', 'utf-8');

// The replacement for Article 2 and 3:
const targetToReplace = `<TermRow khTitle="ប្រការ ២" termIndex={1} khContent={
              <p className="mb-1">កិច្ចសន្យានេះមានសុពលភាពរយៈពេល <span className="font-bold">{contract.durationMonths || '.....'}</span> ខែ ដោយគិតចាប់ពីថ្ងៃទី <span className="font-bold">{contract.startDate || '................'}</span> ដល់ថ្ងៃទី <span className="font-bold">{endDate}</span>។</p>
            } />
            <TermRow khTitle="ប្រការ ៣" termIndex={2} khContent={
              <p className="mb-1">រថយន្ដនេះជួលក្នុងតម្លៃ <span className="font-bold">{contract.rentAmount || '.....'}</span> ដុល្លារ/ខែ។</p>
            } />`;

const replacement = `<TermRow khTitle="ប្រការ ២" termIndex={1} khContent={
              <p className="mb-1">កិច្ចសន្យានេះមានសុពលភាពរយៈពេល <span className="font-bold">{contract.durationMonths || '.....'}</span> ខែ ដោយគិតចាប់ពីថ្ងៃទី <span className="font-bold">{contract.startDate || '................'}</span> ដល់ថ្ងៃទី <span className="font-bold">{endDate}</span>។ រថយន្ដនេះជួលក្នុងតម្លៃ <span className="font-bold">{contract.rentAmount || '.....'}</span> ដុល្លារ/ខែ។</p>
            } />`;

content = content.replace(targetToReplace, replacement);

// Also need to decrement the subsequent khTitle="ប្រការ ៤", etc. and their termIndex.
content = content.replace(/khTitle="ប្រការ ៤" termIndex=\{3\}/g, 'khTitle="ប្រការ ៣" termIndex={2}');
content = content.replace(/khTitle="ប្រការ ៥" termIndex=\{4\}/g, 'khTitle="ប្រការ ៤" termIndex={3}');
content = content.replace(/khTitle="ប្រការ ៦" termIndex=\{5\}/g, 'khTitle="ប្រការ ៥" termIndex={4}');
content = content.replace(/khTitle="ប្រការ ៧" termIndex=\{6\}/g, 'khTitle="ប្រការ ៦" termIndex={5}');
content = content.replace(/khTitle="ប្រការ ៨: ករណីខូចខាតរថយន្ត" termIndex=\{7\}/g, 'khTitle="ប្រការ ៧: ករណីខូចខាតរថយន្ត" termIndex={6}');
content = content.replace(/khTitle="ប្រការ ៩" termIndex=\{8\}/g, 'khTitle="ប្រការ ៨" termIndex={7}');
content = content.replace(/khTitle="ប្រការ ១០" termIndex=\{9\}/g, 'khTitle="ប្រការ ៩" termIndex={8}');
content = content.replace(/khTitle="ប្រការ ១១" termIndex=\{10\}/g, 'khTitle="ប្រការ ១០" termIndex={9}');
content = content.replace(/khTitle="ប្រការ ១២" termIndex=\{11\}/g, 'khTitle="ប្រការ ១១" termIndex={10}');
content = content.replace(/khTitle="ប្រការ ១៣" termIndex=\{12\}/g, 'khTitle="ប្រការ ១២" termIndex={11}');

// also replace numbers in text like ៨.១ -> ៧.១
content = content.replace(/<p>៨\.១/g, '<p>៧.១');
content = content.replace(/<p>៨\.២/g, '<p>៧.២');
content = content.replace(/<p>៨\.៣/g, '<p>៧.៣');

content = content.replace(/១២\.១/g, '១១.១');
content = content.replace(/១២\.២/g, '១១.២');
content = content.replace(/១២\.៣/g, '១១.៣');

content = content.replace(/១៣\.១/g, '១២.១');
content = content.replace(/១៣\.២/g, '១២.២');
content = content.replace(/១៣\.៣/g, '១២.៣');

fs.writeFileSync('src/components/ContractPreview.tsx', content);

