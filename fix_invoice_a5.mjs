import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceReceipt.tsx', 'utf-8');

content = content.replace(
  /<style>\{`@page \{ size: A5 landscape !important; margin: 0; \}`\}<\/style>\n    <div className="w-\[210mm\]/,
  `<>
      <style>{\`@page { size: A5 landscape !important; margin: 0; }\`}</style>
      <div className="w-[210mm]`
);

content = content.replace(
  /        <\/div>\n      <\/div>\n    <\/div>\n  \);\n\}/,
  `        </div>\n      </div>\n    </div>\n    </>\n  );\n}`
);

fs.writeFileSync('src/components/InvoiceReceipt.tsx', content);
