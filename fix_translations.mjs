import fs from 'fs';
let content = fs.readFileSync('src/translations.tsx', 'utf-8');

// English
content = content.replace(
`      {
        title: "Article 2",
        content: (contract: any, endDate: string) => <p>This contract is valid for a period of <span className="font-bold">{contract.durationMonths || '.....'}</span> months, from <span className="font-bold">{contract.startDate || '................'}</span> to <span className="font-bold">{endDate}</span>.</p>
      },
      {
        title: "Article 3",
        content: (contract: any) => <p>This car is rented for <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/month.</p>
      },`,
`      {
        title: "Article 2",
        content: (contract: any, endDate: string) => <p>This contract is valid for a period of <span className="font-bold">{contract.durationMonths || '.....'}</span> months, from <span className="font-bold">{contract.startDate || '................'}</span> to <span className="font-bold">{endDate}</span>. This car is rented for <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/month.</p>
      },`
);

// Chinese
content = content.replace(
`      {
        title: "第二条",
        content: (contract: any, endDate: string) => <p>本合同有效期为 <span className="font-bold">{contract.durationMonths || '.....'}</span> 个月，自 <span className="font-bold">{contract.startDate || '................'}</span> 至 <span className="font-bold">{endDate}</span>。</p>
      },
      {
        title: "第三条",
        content: (contract: any) => <p>此车辆租金为 <span className="font-bold">{contract.rentAmount || '.....'}</span> 美元/月。</p>
      },`,
`      {
        title: "第二条",
        content: (contract: any, endDate: string) => <p>本合同有效期为 <span className="font-bold">{contract.durationMonths || '.....'}</span> 个月，自 <span className="font-bold">{contract.startDate || '................'}</span> 至 <span className="font-bold">{endDate}</span>。此车辆租金为 <span className="font-bold">{contract.rentAmount || '.....'}</span> 美元/月。</p>
      },`
);

fs.writeFileSync('src/translations.tsx', content);
