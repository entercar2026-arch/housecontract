import fs from 'fs';
let content = fs.readFileSync('src/translations.tsx', 'utf-8');

// English
content = content.replace(
`      {
        title: "Article 3",
        content: (contract: any) => <p>Party (B) shall pay a security deposit of <span className="font-bold">{contract.depositAmount || '.....'}</span> USD to Party (A). This deposit shall cover any intentional or unintentional damage caused to the vehicle during the rental period. Party (A) shall refund the deposit to Party (B) upon termination of the contract, following a vehicle inspection and confirmation that no damage has occurred. In the event that Party (B) terminates the contract prematurely, the deposit shall be automatically forfeited to Party (A).</p>
      },
      {
        title: "Article 4",
        content: (contract: any) => <p>Party (B) shall pay the rental fee to Party (A) on the <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> of each month.</p>
      },`,
`      {
        title: "Article 3",
        content: (contract: any) => <div className="space-y-2"><p>Party (B) shall pay a security deposit of <span className="font-bold">{contract.depositAmount || '.....'}</span> USD to Party (A). This deposit shall cover any intentional or unintentional damage caused to the vehicle during the rental period. Party (A) shall refund the deposit to Party (B) upon termination of the contract, following a vehicle inspection and confirmation that no damage has occurred. In the event that Party (B) terminates the contract prematurely, the deposit shall be automatically forfeited to Party (A).</p><p>Party (B) shall pay the rental fee to Party (A) on the <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> of each month.</p></div>
      },`
);

// Chinese
content = content.replace(
`      {
        title: "第三条",
        content: (contract: any) => <p>乙方 (B) 须向甲方 (A) 支付 <span className="font-bold">{contract.depositAmount || '.....'}</span> 美元的保证金。此押金应涵盖租赁期间对车辆造成的任何有意或无意的损坏。在合同终止，并经车辆检查确认无损坏后，甲方 (A) 应将押金退还给乙方 (B)。若乙方 (B) 提前终止合同，押金将自动没收给甲方 (A)。</p>
      },
      {
        title: "第四条",
        content: (contract: any) => <p>乙方 (B) 须在每月 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> 日向甲方 (A) 支付租金。</p>
      },`,
`      {
        title: "第三条",
        content: (contract: any) => <div className="space-y-2"><p>乙方 (B) 须向甲方 (A) 支付 <span className="font-bold">{contract.depositAmount || '.....'}</span> 美元的保证金。此押金应涵盖租赁期间对车辆造成的任何有意或无意的损坏。在合同终止，并经车辆检查确认无损坏后，甲方 (A) 应将押金退还给乙方 (B)。若乙方 (B) 提前终止合同，押金将自动没收给甲方 (A)。</p><p>乙方 (B) 须在每月 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> 日向甲方 (A) 支付租金。</p></div>
      },`
);

// Japanese
content = content.replace(
`      {
        title: "第3条",
        content: (contract: any) => <p>乙(B)は甲(A)に保証金として<span className="font-bold">{contract.depositAmount || '.....'}</span>米ドルを支払うものとする。この保証金は、賃貸期間中に車両に生じた故意または過失による損害を補填するものである。甲(A)は、契約終了時に車両の検査を行い、損害がないことを確認した後、保証金を乙(B)に返還するものとする。乙(B)が契約を中途解約した場合、保証金は自動的に甲(A)に没収される。</p>
      },
      {
        title: "第4条",
        content: (contract: any) => <p>乙(B)は毎月<span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span>日に甲(A)にレンタル料を支払うものとする。</p>
      },`,
`      {
        title: "第3条",
        content: (contract: any) => <div className="space-y-2"><p>乙(B)は甲(A)に保証金として<span className="font-bold">{contract.depositAmount || '.....'}</span>米ドルを支払うものとする。この保証金は、賃貸期間中に車両に生じた故意または過失による損害を補填するものである。甲(A)は、契約終了時に車両の検査を行い、損害がないことを確認した後、保証金を乙(B)に返還するものとする。乙(B)が契約を中途解約した場合、保証金は自動的に甲(A)に没収される。</p><p>乙(B)は毎月<span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span>日に甲(A)にレンタル料を支払うものとする。</p></div>
      },`
);

// Korean
content = content.replace(
`      {
        title: "제3조",
        content: (contract: any) => <p>을(B)은 갑(A)에게 보증금으로 <span className="font-bold">{contract.depositAmount || '.....'}</span> USD를 지불해야 한다. 이 보증금은 임대 기간 동안 차량에 가해진 고의 또는 과실에 의한 손상에 대한 배상에 충당된다. 갑(A)은 계약 종료 시 차량 검사를 통해 손상이 없음을 확인한 후 을(B)에게 보증금을 환불해야 한다. 을(B)이 계약을 조기 종료할 경우 보증금은 자동으로 갑(A)에게 몰수된다.</p>
      },
      {
        title: "제4조",
        content: (contract: any) => <p>을(B)은 매월 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span>일에 갑(A)에게 임대료를 지불해야 한다.</p>
      },`,
`      {
        title: "제3조",
        content: (contract: any) => <div className="space-y-2"><p>을(B)은 갑(A)에게 보증금으로 <span className="font-bold">{contract.depositAmount || '.....'}</span> USD를 지불해야 한다. 이 보증금은 임대 기간 동안 차량에 가해진 고의 또는 과실에 의한 손상에 대한 배상에 충당된다. 갑(A)은 계약 종료 시 차량 검사를 통해 손상이 없음을 확인한 후 을(B)에게 보증금을 환불해야 연다. 을(B)이 계약을 조기 종료할 경우 보증금은 자동으로 갑(A)에게 몰수된다.</p><p>을(B)은 매월 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span>일에 갑(A)에게 임대료를 지불해야 한다.</p></div>
      },`
);

// Russian
content = content.replace(
`      {
        title: "Статья 3",
        content: (contract: any) => <p>Сторона (B) обязуется выплатить Стороне (A) страховой залог в размере <span className="font-bold">{contract.depositAmount || '.....'}</span> USD. Данный залог покрывает любой преднамеренный или непреднамеренный ущерб, причиненный транспортному средству в течение срока аренды. Сторона (A) обязуется вернуть залог Стороне (B) при расторжении договора после осмотра транспортного средства и подтверждения отсутствия повреждений. В случае если Сторона (B) досрочно расторгает договор, залог автоматически конфискуется в пользу Стороны (A).</p>
      },
      {
        title: "Статья 4",
        content: (contract: any) => <p>Сторона (B) обязуется выплачивать арендную плату Стороне (A) <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> числа каждого месяца.</p>
      },`,
`      {
        title: "Статья 3",
        content: (contract: any) => <div className="space-y-2"><p>Сторона (B) обязуется выплатить Стороне (A) страховой залог в размере <span className="font-bold">{contract.depositAmount || '.....'}</span> USD. Данный залог покрывает любой преднамеренный или непреднамеренный ущерб, причиненный транспортному средству в течение срока аренды. Сторона (A) обязуется вернуть залог Стороне (B) при расторжении договора после осмотра транспортного средства и подтверждения отсутствия повреждений. В случае если Сторона (B) досрочно расторгает договор, залог автоматически конфискуется в пользу Стороны (A).</p><p>Сторона (B) обязуется выплачивать арендную плату Стороне (A) <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> числа каждого месяца.</p></div>
      },`
);


// English titles
content = content.replace(/Article 5/g, 'Article 4');
content = content.replace(/Article 6/g, 'Article 5');
content = content.replace(/Article 7: Vehicle Damage/g, 'Article 6: Vehicle Damage');
content = content.replace(/Article 8/g, 'Article 7');
content = content.replace(/Article 9/g, 'Article 8');
content = content.replace(/Article 10/g, 'Article 9');
content = content.replace(/Article 11/g, 'Article 10');
content = content.replace(/Article 12/g, 'Article 11');

// English content replacements
content = content.replace(/7\.1/g, '6.1');
content = content.replace(/7\.2/g, '6.2');
content = content.replace(/7\.3/g, '6.3');

content = content.replace(/11\.1/g, '10.1');
content = content.replace(/11\.2/g, '10.2');
content = content.replace(/11\.3/g, '10.3');

content = content.replace(/12\.1/g, '11.1');
content = content.replace(/12\.2/g, '11.2');
content = content.replace(/12\.3/g, '11.3');


// Chinese
content = content.replace(/第五条/g, '第四条');
content = content.replace(/第六条/g, '第五条');
content = content.replace(/第七条：车辆损坏/g, '第六条：车辆损坏');
content = content.replace(/第八条/g, '第七条');
content = content.replace(/第九条/g, '第八条');
content = content.replace(/第十条/g, '第九条');
content = content.replace(/第十一条/g, '第十条');
content = content.replace(/第十二条/g, '第十一条');


// Japanese
content = content.replace(/第5条/g, '第4条');
content = content.replace(/第6条/g, '第5条');
content = content.replace(/第7条：車両の損傷/g, '第6条：車両の損傷');
content = content.replace(/第8条/g, '第7条');
content = content.replace(/第9条/g, '第8条');
content = content.replace(/第10条/g, '第9条');
content = content.replace(/第11条/g, '第10条');
content = content.replace(/第12条/g, '第11条');

// Korean
content = content.replace(/제5조/g, '제4조');
content = content.replace(/제6조/g, '제5조');
content = content.replace(/제7조: 차량 파손/g, '제6조: 차량 파손');
content = content.replace(/제8조/g, '제7조');
content = content.replace(/제9조/g, '제8조');
content = content.replace(/제10조/g, '제9조');
content = content.replace(/제11조/g, '제10조');
content = content.replace(/제12조/g, '제11조');

// Russian
content = content.replace(/Статья 5/g, 'Статья 4');
content = content.replace(/Статья 6/g, 'Статья 5');
content = content.replace(/Статья 7: Повреждение транспортного средства/g, 'Статья 6: Повреждение транспортного средства');
content = content.replace(/Статья 8/g, 'Статья 7');
content = content.replace(/Статья 9/g, 'Статья 8');
content = content.replace(/Статья 10/g, 'Статья 9');
content = content.replace(/Статья 11/g, 'Статья 10');
content = content.replace(/Статья 12/g, 'Статья 11');

fs.writeFileSync('src/translations.tsx', content);
