import fs from 'fs';
let content = fs.readFileSync('src/translations.tsx', 'utf-8');

// Japanese
content = content.replace(
`      {
        title: "第2条",
        content: (contract: any, endDate: string) => <p>本契約は、<span className="font-bold">{contract.startDate || '................'}</span>から<span className="font-bold">{endDate}</span>までの<span className="font-bold">{contract.durationMonths || '.....'}</span>ヶ月間有効である。</p>
      },
      {
        title: "第3条",
        content: (contract: any) => <p>本車両は月額<span className="font-bold">{contract.rentAmount || '.....'}</span>米ドルで賃貸される。</p>
      },`,
`      {
        title: "第2条",
        content: (contract: any, endDate: string) => <p>本契約は、<span className="font-bold">{contract.startDate || '................'}</span>から<span className="font-bold">{endDate}</span>までの<span className="font-bold">{contract.durationMonths || '.....'}</span>ヶ月間有効である。本車両は月額<span className="font-bold">{contract.rentAmount || '.....'}</span>米ドルで賃貸される。</p>
      },`
);

// Korean
content = content.replace(
`      {
        title: "제2조",
        content: (contract: any, endDate: string) => <p>본 계약은 <span className="font-bold">{contract.startDate || '................'}</span>부터 <span className="font-bold">{endDate}</span>까지 <span className="font-bold">{contract.durationMonths || '.....'}</span>개월 동안 유효하다.</p>
      },
      {
        title: "제3조",
        content: (contract: any) => <p>본 차량의 임대료는 월 <span className="font-bold">{contract.rentAmount || '.....'}</span> USD이다.</p>
      },`,
`      {
        title: "제2조",
        content: (contract: any, endDate: string) => <p>본 계약은 <span className="font-bold">{contract.startDate || '................'}</span>부터 <span className="font-bold">{endDate}</span>까지 <span className="font-bold">{contract.durationMonths || '.....'}</span>개월 동안 유효하다. 본 차량의 임대료는 월 <span className="font-bold">{contract.rentAmount || '.....'}</span> USD이다.</p>
      },`
);

// Russian
content = content.replace(
`      {
        title: "Статья 2",
        content: (contract: any, endDate: string) => <p>Настоящий договор действителен сроком на <span className="font-bold">{contract.durationMonths || '.....'}</span> мес., с <span className="font-bold">{contract.startDate || '................'}</span> по <span className="font-bold">{endDate}</span>.</p>
      },
      {
        title: "Статья 3",
        content: (contract: any) => <p>Данный автомобиль сдается в аренду за <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/месяц.</p>
      },`,
`      {
        title: "Статья 2",
        content: (contract: any, endDate: string) => <p>Настоящий договор действителен сроком на <span className="font-bold">{contract.durationMonths || '.....'}</span> мес., с <span className="font-bold">{contract.startDate || '................'}</span> по <span className="font-bold">{endDate}</span>. Данный автомобиль сдается в аренду за <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/месяц.</p>
      },`
);

// Now let's replace "Article 4" with "Article 3" etc, and "8.1" to "7.1"
// Since the arrays of articles in translations.tsx don't have indexes explicitly in titles except the string "Article X",
// let's do global replacements but we need to be careful with other sections. 
// These translations only have "Article X" or "第X条" or "제X조" or "Статья X" for the car contract sections.

// English
content = content.replace(/Article 4/g, 'Article 3');
content = content.replace(/Article 5/g, 'Article 4');
content = content.replace(/Article 6/g, 'Article 5');
content = content.replace(/Article 7/g, 'Article 6');
content = content.replace(/Article 8: Vehicle Damage/g, 'Article 7: Vehicle Damage');
content = content.replace(/Article 9/g, 'Article 8');
content = content.replace(/Article 10/g, 'Article 9');
content = content.replace(/Article 11/g, 'Article 10');
content = content.replace(/Article 12/g, 'Article 11');
content = content.replace(/Article 13/g, 'Article 12');

// English content replacements
content = content.replace(/8\.1/g, '7.1');
content = content.replace(/8\.2/g, '7.2');
content = content.replace(/8\.3/g, '7.3');

content = content.replace(/12\.1/g, '11.1');
content = content.replace(/12\.2/g, '11.2');
content = content.replace(/12\.3/g, '11.3');

content = content.replace(/13\.1/g, '12.1');
content = content.replace(/13\.2/g, '12.2');
content = content.replace(/13\.3/g, '12.3');


// Chinese
content = content.replace(/第四条/g, '第三条');
content = content.replace(/第五条/g, '第四条');
content = content.replace(/第六条/g, '第五条');
content = content.replace(/第七条/g, '第六条');
content = content.replace(/第八条：车辆损坏/g, '第七条：车辆损坏');
content = content.replace(/第九条/g, '第八条');
content = content.replace(/第十条/g, '第九条');
content = content.replace(/第十一条/g, '第十条');
content = content.replace(/第十二条/g, '第十一条');
content = content.replace(/第十三条/g, '第十二条');


// Japanese
content = content.replace(/第4条/g, '第3条');
content = content.replace(/第5条/g, '第4条');
content = content.replace(/第6条/g, '第5条');
content = content.replace(/第7条/g, '第6条');
content = content.replace(/第8条：車両の損傷/g, '第7条：車両の損傷');
content = content.replace(/第9条/g, '第8条');
content = content.replace(/第10条/g, '第9条');
content = content.replace(/第11条/g, '第10条');
content = content.replace(/第12条/g, '第11条');
content = content.replace(/第13条/g, '第12条');

// Korean
content = content.replace(/제4조/g, '제3조');
content = content.replace(/제5조/g, '제4조');
content = content.replace(/제6조/g, '제5조');
content = content.replace(/제7조/g, '제6조');
content = content.replace(/제8조: 차량 파손/g, '제7조: 차량 파손');
content = content.replace(/제9조/g, '제8조');
content = content.replace(/제10조/g, '제9조');
content = content.replace(/제11조/g, '제10조');
content = content.replace(/제12조/g, '제11조');
content = content.replace(/제13조/g, '제12조');

// Russian
content = content.replace(/Статья 4/g, 'Статья 3');
content = content.replace(/Статья 5/g, 'Статья 4');
content = content.replace(/Статья 6/g, 'Статья 5');
content = content.replace(/Статья 7/g, 'Статья 6');
content = content.replace(/Статья 8: Повреждение транспортного средства/g, 'Статья 7: Повреждение транспортного средства');
content = content.replace(/Статья 9/g, 'Статья 8');
content = content.replace(/Статья 10/g, 'Статья 9');
content = content.replace(/Статья 11/g, 'Статья 10');
content = content.replace(/Статья 12/g, 'Статья 11');
content = content.replace(/Статья 13/g, 'Статья 12');

fs.writeFileSync('src/translations.tsx', content);
