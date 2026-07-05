const fs = require('fs');
let code = fs.readFileSync('src/translations.tsx', 'utf8');

// I will extract the zh carTerms section.
// Actually I can just write a script that replaces the 'zh' object's carTerms.

const newZhCarTerms = `carTerms: [
      {
        title: "第一条",
        content: () => <p>乙方 (B) 要求向甲方 (A) 租用上述车辆。</p>
      },
      {
        title: "第二条",
        content: (contract: any) => <p>乙方 (B) 同意向甲方 (A) 租用上述车辆用于 <span className="font-bold">{contract.carPurpose || '....................'}</span>。除 <span className="font-bold">{contract.carPurpose || '....................'}</span> 外，乙方 (B) 不得将车辆用于任何其他目的。如需变更租赁用途，必须事先获得书面同意。</p>
      },
      {
        title: "第三条",
        content: (contract: any, endDate: string) => <p>本合同有效期为 <span className="font-bold">{contract.durationMonths || '.....'}</span> 个月，自 <span className="font-bold">{contract.startDate || '................'}</span> 至 <span className="font-bold">{endDate}</span>。</p>
      },
      {
        title: "第四条",
        content: (contract: any) => <p>此车辆租金为 <span className="font-bold">{contract.rentAmount || '.....'}</span> 美元/月。</p>
      },
      {
        title: "第五条",
        content: (contract: any) => <p>乙方 (B) 应向甲方 (A) 支付押金 <span className="font-bold">{contract.depositAmount || '.....'}</span> 美元。此押金涵盖租赁期间对车辆造成的任何有意或无意的损坏。甲方 (A) 应在合同终止并在车辆检查确认无损坏后，将押金退还给乙方 (B)。如果乙方 (B) 提前终止合同，押金将自动归甲方 (A) 所有。</p>
      },
      {
        title: "第六条",
        content: (contract: any) => <p>乙方 (B) 应于每月 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> 日向甲方 (A) 支付租金。</p>
      },
      {
        title: "第七条",
        content: () => <p>未经车辆所有者甲方 (A) 的许可，乙方 (B) 不得转租或将从甲方 (A) 租来的车辆进行任何商业活动，也不得将其使用权转让给第三方。</p>
      },
      {
        title: "第八条",
        content: () => <p>如果乙方 (B) 在租赁期间使用车辆进行任何违法行为，乙方 (B) 应自行承担全部法律责任，与甲方 (A) 无关，甲方 (A) 对乙方 (B) 使用租赁车辆造成的任何损害不承担责任。</p>
      },
      {
        title: "第九条：车辆损坏情况",
        content: (contract: any) => <div className="space-y-2"><p>9.1 若租赁车辆因乙方 (B) 疏忽使用或过错导致轻微或严重损坏，由乙方 (B) 负责修理，但正常使用造成的磨损除外，此种情况下的修理责任归甲方 (A)。</p><p>9.2 乙方 (B) 必须对车辆的任何损坏（如碰撞、翻车、落水、被盗、火灾或其他事故）负全责，并按双方同意的车辆价值 <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> 赔偿甲方 (A)。</p><p>9.3 乙方 (B) 在使用车辆期间发生碰撞、划痕或其他损坏时，必须通知甲方 (A)，不允许乙方 (B) 隐瞒信息且未经甲方 (A) 同意私自维修车辆。</p></div>
      },
      {
        title: "第十条",
        content: () => <p>在租赁期间，因使用本车辆造成的任何损坏（如交通事故或运输违禁品、走私及其他违法活动），乙方 (B) 应单独承担刑事和民事责任。</p>
      },
      {
        title: "第十一条",
        content: () => <p>如果乙方 (B) 未履行支付租金义务或迟延支付租金超过7天，或违反合同任何条款，甲方 (A) 有权终止合同并在不事先通知的情况下收回车辆。</p>
      },
      {
        title: "第十二条",
        content: (contract: any) => <p>本合同中的租赁车辆允许乙方 (B) 在 <span className="font-bold">{contract.carRentalArea || '....................'}</span> 区域内使用。若乙方 (B) 将车辆用于不当目的或前往其他省份，必须通知甲方 (A) 以获得许可，且乙方 (B) 必须对所有费用和损害承担全部责任，与甲方 (A) 无关。</p>
      },
      {
        title: "第十三条",
        content: () => <div className="space-y-2"><p>13.1 本合同是双方在真实、自愿的情况下，就合同中所述所有条款和条件达成的协议。</p><p>13.2 除非双方同意，否则任何一方不得单方面对条款和条件进行修改。本合同自双方签字（按手印）并接受之日起生效。</p><p>13.3 双方必须公平公正地履行上述合同中规定的义务。若任何一方怀有恶意，违反本合同的任何规定，将依法追究责任。</p></div>
      },
      {
        title: "第十四条",
        content: () => <div className="space-y-2"><p>14.1 本合同完全受柬埔寨法律管辖，按柬埔寨法律解释，并受柬埔寨管辖权约束。</p><p>14.2 本合同自双方签字并接受之日起生效并具有执行力。</p></div>
      }
    ]`;

const zhMatch = code.match(/zh: \{[\s\S]*?carTerms: \[([\s\S]*?)\]\n  \},/);
if (zhMatch) {
  const fullZh = zhMatch[0];
  const replacedZh = fullZh.replace(/carTerms: \[[\s\S]*?\]/, newZhCarTerms);
  code = code.replace(fullZh, replacedZh);
  fs.writeFileSync('src/translations.tsx', code);
  console.log("Patched zh carTerms");
} else {
  console.log("Failed to find zh carTerms");
}

