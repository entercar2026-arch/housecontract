import fs from 'fs';
let content = fs.readFileSync('src/translations.tsx', 'utf-8');

// Chinese
content = content.replace(
`      {
        title: "第三条",
        content: (contract: any) => <p>乙方 (B) 应向甲方 (A) 支付押金 <span className="font-bold">{contract.depositAmount || '.....'}</span> 美元。此押金涵盖租赁期间对车辆造成的任何有意或无意的损坏。甲方 (A) 应在合同终止并在车辆检查确认无损坏后，将押金退还给乙方 (B)。如果乙方 (B) 提前终止合同，押金将自动归甲方 (A) 所有。</p>
      },
      {
        title: "第四条",
        content: (contract: any) => <p>乙方 (B) 应于每月 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> 日向甲方 (A) 支付租金。</p>
      },`,
`      {
        title: "第三条",
        content: (contract: any) => <div className="space-y-2"><p>乙方 (B) 须向甲方 (A) 支付 <span className="font-bold">{contract.depositAmount || '.....'}</span> 美元的押金。在合同终止且经检查确认车辆无损坏后，此押金将全额退还给乙方 (B)。如遇车辆损坏，甲方 (A) 可从押金中扣除维修费用，剩余押金须退还给乙方 (B)。若损坏程度所需维修费用超过押金金额，乙方 (B) 必须支付额外款项以补足维修费用。</p><p>乙方 (B) 须每月按时向甲方 (A) 支付租金。乙方 (B) 须在每月 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> 日向甲方 (A) 支付租金。</p></div>
      },`
);

// Japanese
content = content.replace(
`      {
        title: "第3条",
        content: (contract: any) => <p>乙(B)は、保証金として<span className="font-bold">{contract.depositAmount || '.....'}</span>米ドルを甲(A)に支払うものとする。この保証金は、賃貸期間中に車両に生じた意図的または無意図的な損害を補填するものである。甲(A)は、契約終了時に車両検査を実施し、損傷がないことを確認した後、保証金を乙(B)に返還するものとする。乙(B)が本契約を中途解約した場合、保証金は自動的に甲(A)に没収されるものとする。</p>
      },
      {
        title: "第4条",
        content: (contract: any) => <p>乙(B)は、毎月の<span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span>日に賃貸料金を甲(A)に支払うものとする。</p>
      },`,
`      {
        title: "第3条",
        content: (contract: any) => <div className="space-y-2"><p>乙(B)は甲(A)に保証金として<span className="font-bold">{contract.depositAmount || '.....'}</span>米ドルを支払うものとする。この保証金は、契約終了時に車両の検査を行い、損害がないことを確認した後、乙(B)に全額返還される。損害がある場合、甲(A)は保証金から修理費用を差し引くことができ、残りの保証金は乙(B)に返還しなければならない。損害の程度により修理費用が保証金を超える場合、乙(B)は修理費用を補うために追加料金を支払わなければならない。</p><p>乙(B)は毎月定期的に甲(A)にレンタル料を支払うものとする。乙(B)は毎月<span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span>日に甲(A)に支払うものとする。</p></div>
      },`
);

// Korean
content = content.replace(
`      {
        title: "제3조",
        content: (contract: any) => <p>을(B)은 갑(A)에게 <span className="font-bold">{contract.depositAmount || '.....'}</span> USD의 보증금을 지불해야 한다. 이 보증금은 임대 기간 동안 차량에 발생한 고의 또는 과실에 의한 손해를 보상하는 데 사용된다. 갑(A)은 계약 종료 시 차량 검사를 실시하고 손상이 없음을 확인한 후 을(B)에게 보증금을 환불해야 한다. 을(B)이 계약을 조기 종료하는 경우, 보증금은 자동으로 갑(A)에게 귀속된다.</p>
      },
      {
        title: "제4조",
        content: (contract: any) => <p>을(B)은 매월 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span>일에 갑(A)에게 임대료를 지불해야 한다.</p>
      },`,
`      {
        title: "제3조",
        content: (contract: any) => <div className="space-y-2"><p>을(B)은 갑(A)에게 보증금으로 <span className="font-bold">{contract.depositAmount || '.....'}</span> USD를 지불해야 한다. 이 보증금은 계약 종료 시 차량 검사를 통해 손상이 없음을 확인한 후 을(B)에게 전액 환불된다. 차량에 손상이 있는 경우 갑(A)은 보증금에서 수리비를 공제할 수 있으며, 남은 보증금은 을(B)에게 반환해야 한다. 차량 파손 정도에 따른 수리비가 보증금을 초과할 경우, 을(B)은 수리비를 충당하기 위해 추가 금액을 지불해야 한다.</p><p>을(B)은 매월 정기적으로 갑(A)에게 임대료를 지불해야 한다. 을(B)은 매월 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span>일에 갑(A)에게 임대료를 지불해야 한다.</p></div>
      },`
);

// Russian
content = content.replace(
`      {
        title: "Статья 3",
        content: (contract: any) => <p>Сторона (B) выплачивает Стороне (A) страховой депозит в размере <span className="font-bold">{contract.depositAmount || '.....'}</span> USD. Этот депозит покрывает любой преднамеренный или непреднамеренный ущерб, причиненный транспортному средству в течение периода аренды. Сторона (A) должна вернуть депозит Стороне (B) при расторжении договора, после осмотра транспортного средства и подтверждения отсутствия повреждений. В случае преждевременного расторжения договора Стороной (B) депозит автоматически удерживается в пользу Стороны (A).</p>
      },
      {
        title: "Статья 4",
        content: (contract: any) => <p>Сторона (B) обязуется выплачивать арендную плату Стороне (A) <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> числа каждого месяца.</p>
      },`,
`      {
        title: "Статья 3",
        content: (contract: any) => <div className="space-y-2"><p>Сторона (B) обязуется выплатить Стороне (A) страховой залог в размере <span className="font-bold">{contract.depositAmount || '.....'}</span> USD. Этот залог будет полностью возвращен Стороне (B) при расторжении договора после осмотра, подтверждающего отсутствие повреждений транспортного средства. В случае повреждения Сторона (A) может вычесть стоимость ремонта из залога, а оставшаяся часть залога должна быть возвращена Стороне (B). Если размер повреждений требует затрат на ремонт, превышающих сумму залога, Сторона (B) должна доплатить дополнительные средства для покрытия стоимости ремонта.</p><p>Сторона (B) обязуется регулярно выплачивать арендную плату Стороне (A) каждый месяц. Сторона (B) обязуется выплачивать арендную плату Стороне (A) <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> числа каждого месяца.</p></div>
      },`
);

fs.writeFileSync('src/translations.tsx', content);
