import React from 'react';
import { ContractDetails } from './types';

const getTranslatedValue = (val: string | undefined, type: 'purpose' | 'area', lang: string) => {
  if (!val) return '....................';
  const noSpace = val.toLowerCase().replace(/[^a-z0-9ក-៿]/g, "").trim();
  
  if (type === 'purpose') {
    const lowerMap: Record<string, string> = {
      'personaluse': 'Personal Use', 'personal': 'Personal Use', 'ប្រើប្រាស់ផ្ទាល់ខ្លួន': 'Personal Use',
      'companyuse': 'Company Use', 'company': 'Company Use', 'ប្រើប្រាស់ក្រុមហ៊ុន': 'Company Use',
      'trip': 'Trip', 'ដំណើរទស្សនកិច្ច': 'Trip', 'ដើរលេង': 'Trip'
    };
    const basePurp = lowerMap[noSpace] || val;
    if (lang === 'zh') {
      const zhMap: Record<string, string> = { 'Personal Use': '个人使用', 'Company Use': '公司使用', 'Trip': '旅行' };
      return zhMap[basePurp] || basePurp;
    } else if (lang === 'ja') {
      const jaMap: Record<string, string> = { 'Personal Use': '個人使用', 'Company Use': '会社使用', 'Trip': '旅行' };
      return jaMap[basePurp] || basePurp;
    } else if (lang === 'ko') {
      const koMap: Record<string, string> = { 'Personal Use': '개인 사용', 'Company Use': '회사 사용', 'Trip': '여행' };
      return koMap[basePurp] || basePurp;
    } else if (lang === 'ru') {
      const ruMap: Record<string, string> = { 'Personal Use': 'Личное пользование', 'Company Use': 'Служебное пользование', 'Trip': 'Поездка' };
      return ruMap[basePurp] || basePurp;
    }
    return basePurp;
  }
  
  if (type === 'area') {
    const lowerMap: Record<string, string> = {
      'phnompenh': 'Phnom Penh', 'ភ្នំពេញ': 'Phnom Penh',
      'phnompenhprovinces': 'Phnom Penh - Provinces', 'phnompenhprov': 'Phnom Penh - Provinces', 'ppprov': 'Phnom Penh - Provinces', 'ភ្នំពេញខេត្ត': 'Phnom Penh - Provinces', 'ភ្នំពេញបណ្តាខេត្ត': 'Phnom Penh - Provinces'
    };
    const baseArea = lowerMap[noSpace] || val;
    if (lang === 'zh') {
      const zhMap: Record<string, string> = { 'Phnom Penh': '金边', 'Phnom Penh - Provinces': '金边及外省' };
      return zhMap[baseArea] || baseArea;
    } else if (lang === 'ja') {
      const jaMap: Record<string, string> = { 'Phnom Penh': 'プノンペン', 'Phnom Penh - Provinces': 'プノンペン及び各州' };
      return jaMap[baseArea] || baseArea;
    } else if (lang === 'ko') {
      const koMap: Record<string, string> = { 'Phnom Penh': '프놈펜', 'Phnom Penh - Provinces': '프놈펜 및 지방' };
      return koMap[baseArea] || baseArea;
    } else if (lang === 'ru') {
      const ruMap: Record<string, string> = { 'Phnom Penh': 'Пномпень', 'Phnom Penh - Provinces': 'Пномпень и провинции' };
      return ruMap[baseArea] || baseArea;
    }
    return baseArea;
  }
  return val;
};


type Translation = {
  header: string;
  subHeader: string;
  owner: string;
  lessee: string;
  agreed: string;
  respects: string;
  leaseTitle: string;
  sex: string;
  nationality: string;
  dob: string;
  idNumber: string;
  ownerDesc: string;
  lesseeDesc: string;
  date: string;
  issueDate: string;
  expiryDate: string;
  presentAddress: string;
  landlord: string;
  agent: string;
  tenant: string;
  terms: {
    title: string;
    content: (contract: ContractDetails, endDate: string) => React.ReactNode;
  }[];
  carLeaseTitle: string;
  carOwner: string;
  carRenter: string;
  carOwnerDesc: string;
  carTerms: {
    title: string;
    content: (contract: ContractDetails, endDate: string) => React.ReactNode;
  }[];
  carModelLabel?: string;
  carColorLabel?: string;
  carYearLabel?: string;
  carPlateNoLabel?: string;
  carFrameNoLabel?: string;
  carEngineNoLabel?: string;
  herebyReferredToA?: string;
  herebyReferredToB?: string;
  carAgreed?: string;
};

export const translations: Record<string, Translation> = {
  en: {
    header: "KINGDOM OF CAMBODIA",
    subHeader: "Nation Religion King",
    owner: "OWNER:",
    lessee: "LESSEE:",
    agreed: "AGREED TO RENT A UNIT TO",
    respects: "Both Parties agree with the following respects:",
    leaseTitle: "HOUSE LEASE AGREEMENT",
    sex: "Sex:",
    nationality: "Nationality:",
    dob: "Date of Birth:",
    idNumber: "Holding ID/Passport No:",
    ownerDesc: "Who is the legal and lawful owner of Phnom Penh; hereby referred to as Party (A).",
    lesseeDesc: "hereby referred to as Party (B).",
    date: "Date:",
    issueDate: "Issue Date:",
    expiryDate: "Expiry Date:",
    presentAddress: "Having Present Address:",
    landlord: "LANDLORD",
    agent: "AGENT",
    tenant: "TENANT",
    terms: [
      {
        title: "ARTICLE 1: LEASE PERIOD",
        content: (contract, endDate) => <p>Lease duration: <span className="font-bold">{contract.durationMonths || '.....'}</span> months, from <span className="font-bold">{contract.startDate || '................'}</span> to <span className="font-bold">{endDate}</span>. Rent: <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/month.</p>
      },
      {
        title: "ARTICLE 2: PAYMENT",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>Party (B) pays a deposit of <span className="font-bold">{contract.depositAmount || '.....'}</span> USD and first month's rent of <span className="font-bold">{contract.rentAmount || '.....'}</span> USD.</li><li>Rent is due on the <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> of each month. Deposit is refundable at contract end (if no damage) but cannot be deducted for rent or utilities if terminated early.</li></ul>
      },
      {
        title: "ARTICLE 3: TAX",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Party (A) is responsible for the property tax.</li></ul>
      },
      {
        title: "ARTICLE 4: TERMINATION",
        content: (contract, endDate) => <ul className="list-disc pl-6 space-y-2"><li>Contract expires on <span className="font-bold">{endDate}</span>.</li><li>If Party (A) terminates early, a 30-day notice and full deposit refund are required.</li><li>If Party (B) terminates early, delays rent by &gt;7 days, or breaches the contract, Party (A) can terminate the contract, take back the property, and the deposit will not be refunded.</li></ul>
      },
      {
        title: "ARTICLE 5: UTILITIES",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>Party (A) ensures utilities are working before move-in.</li><li>Utility fees:<div className="space-y-1 mt-2"><div>- Water: <span className="font-bold">{contract.waterUtility || '.....'}</span></div><div>- Electricity: <span className="font-bold">{contract.electricityUtility || '.....'}</span></div><div>- Cable TV: <span className="font-bold">{contract.cableTvUtility || '.....'}</span></div><div>- Internet: <span className="font-bold">{contract.internetUtility || '.....'}</span></div>{(contract.otherUtility1Name || contract.otherUtility1Price) && (<div>- {contract.otherUtility1Name}: <span className="font-bold">{contract.otherUtility1Price}</span></div>)}{(contract.otherUtility2Name || contract.otherUtility2Price) && (<div>- {contract.otherUtility2Name}: <span className="font-bold">{contract.otherUtility2Price}</span></div>)}</div></li></ul>
      },
      {
        title: "ARTICLE 6: OTHER CONDITIONS",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Structural changes require Party (A)'s approval.</li><li>Natural disaster repairs are Party (A)'s responsibility.</li><li>Subletting is strictly prohibited without permission.</li><li>Residential use only. If used for illegal activities (gambling, trafficking, kidnapping, online scams), Party (B) faces legal consequences and immediate contract termination.</li></ul>
      },
      {
        title: "ARTICLE 7: RENEWAL",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>To renew, Party (B) must give a 1-month advance notice.</li></ul>
      },
      {
        title: "ARTICLE 8: FURNITURE & EQUIPMENT",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Upon termination, Party (B) must return the house and equipment in their original condition.</li></ul>
      },
      {
        title: "ARTICLE 9: RIGHT TO ENTER",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Party (A) can inspect the premises with a 24-hour advance notice.</li></ul>
      },
      {
        title: "ARTICLE 10: VALIDITY",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Both parties agree to the terms. Breaching parties face legal liability.</li><li>Contract is equally valid in Khmer and English upon signing. In case of any discrepancy or conflict in meaning, the Khmer version shall prevail as the base of interpretation.</li></ul>
      }
    ],
    carLeaseTitle: "Car Rental Contract",
    carOwner: "Car owner",
    carRenter: "Car renter",
    carOwnerDesc: "who is the legal owner of car",
    carTerms: [
      {
        title: "Article 1",
        content: (contract: any) => <p>Party (B) requests and agrees to rent the vehicle described above from Party (A) for <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'en')}</span>. Party (B) shall not use the vehicle for any purpose other than <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'en')}</span>. Any change to the purpose of this rental requires prior written agreement.</p>
      },
      {
        title: "Article 2",
        content: (contract: any, endDate: string) => <p>This contract is valid for a period of <span className="font-bold">{contract.durationMonths || '.....'}</span> months, from <span className="font-bold">{contract.startDate || '................'}</span> to <span className="font-bold">{endDate}</span>. This car is rented for <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/month.</p>
      },
      {
        title: "Article 3",
        content: (contract: any) => <div className="space-y-2"><p>Party (B) shall pay a security deposit of <span className="font-bold">{contract.depositAmount || '.....'}</span> USD to Party (A). This deposit will be refunded in full to Party (B) upon termination of the contract after inspection confirms that the vehicle is not damaged. In case of damage, Party (A) may deduct repair costs from the deposit, and the remaining deposit must be returned to Party (B). If the extent of the damage requires repair costs exceeding the deposit, Party (B) must pay additional funds to cover the repair costs.</p><p>Party (B) shall pay the rental fee to Party (A) regularly each month. Party (B) shall pay Party (A) on the <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> of each month.</p></div>
      },
      {
        title: "Article 4",
        content: () => <p>Party (B) may not sub-lease or conduct any business with the vehicle rented from Party (A) or transfer its use to a third party without the permission of Party (A), the owner of the vehicle.</p>
      },
      {
        title: "Article 5",
        content: () => <p>In the event that Party (B) acts in violation of the law by using the vehicle during the rental period, Party (B) shall be held legally responsible on its own, without involving Party (A), and Party (A) shall not be liable for any damage caused by Party (B)'s use of the rental vehicle.</p>
      },
      {
        title: "Article 6: VEHICLE DAMAGE CASE",
        content: (contract: any) => <div className="space-y-2"><p>6.1 In the event that the vehicle subject to the rental is slightly damaged or seriously damaged due to negligent use or fault of Party (B), the repair shall be the responsibility of Party (B), except in the case of wear and tear due to normal use, in which case the repair shall be the responsibility of Party (A).</p><p>6.2 Party (B) shall be fully responsible for any damage to the vehicle such as (collision, overturning, falling into water, theft, fire or other accidents) by paying compensation as agreed upon at a price of <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> of the vehicle price to Party (A).</p><p>6.3 In the event that Party (B) uses the vehicle with collisions, scratches or other damages, Party (A) must be notified without allowing Party (B) to conceal the information of taking the vehicle for repair without the consent of Party (A).</p><p>6.4 Maintenance and replacement of parts that have reached the end of their lifespan or are damaged by normal use is the responsibility of Party (A).</p></div>
      },
      {
        title: "Article 7",
        content: () => <p>During this rental period, any damage caused by the use of this vehicle, such as traffic accidents or transporting illegal goods, contraband, and other illegal activities, Party (B) shall be solely responsible for both criminal and civil liability.</p>
      },
      {
        title: "Article 8",
        content: () => <p>In the event that Party (B) fails to fulfill its obligation to pay the rent or pays the rent late by more than 7 days, or violates any of the terms of the contract, Party (A) has the right to terminate the contract and repossess the car without notice.</p>
      },
      {
        title: "Article 9",
        content: (contract: any) => <p>The rental car in this contract is allowed to be used by Party (B) in the area around <span className="font-bold">{getTranslatedValue(contract.carRentalArea, 'area', 'en')}</span>. In case Party (B) uses it for a wrong purpose or goes to other provinces, it must notify Party (A) for permission, and Party (B) must be fully responsible for all costs and damages without involving Party (A).</p>
      },
      {
        title: "Article 10",
        content: () => <div className="space-y-2"><p>10.1 This contract was made with the genuine and free consent of both parties to all the terms and conditions stated in this contract.</p><p>10.2 Any changes to the terms and conditions cannot be made unilaterally by either party unless both parties agree to do so. This contract shall be effective after both parties have signed (thumb print) and accepted this contract.</p><p>10.3 Both parties must perform their obligations as stipulated in the above contract fairly and equitably. In the event that either party has malicious intent by violating any of the provisions of the above contract, they will be held liable under applicable law.</p></div>
      },
      {
        title: "Article 11",
        content: () => <div className="space-y-2"><p>11.1 This contract shall be governed by and construed exclusively in accordance with the laws of Cambodia and subject to the jurisdiction of Cambodia.</p><p>11.2 This contract is effective and enforceable after both parties have signed and accepted this contract.</p><p>11.3 This contract is made in both Khmer and English with equal validity. If there is any discrepancy in meaning or interpretation between the versions, the Khmer version shall prevail.</p></div>
      }
    ],
    carModelLabel: "Model",
    carColorLabel: "Color",
    carYearLabel: "Year",
    carPlateNoLabel: "Plate No",
    carFrameNoLabel: "Frame No",
    carEngineNoLabel: "Engine No",
    herebyReferredToA: ", hereby referred to as Party (A).",
    herebyReferredToB: ", hereby referred to as Party (B).",
    carAgreed: "AGREED TO RENT A VEHICLE TO"
  }
,

  zh: {
    header: "柬埔寨王国",
    subHeader: "国家 宗教 国王",
    owner: "出租方:",
    lessee: "承租方:",
    agreed: "同意将房屋出租给",
    respects: "双方同意以下条款:",
    leaseTitle: "房屋租赁合同",
    sex: "性别:",
    nationality: "国籍:",
    dob: "出生日期:",
    idNumber: "护照/身份证号:",
    ownerDesc: "金边的合法拥有者；以下简称甲方(A)。",
    lesseeDesc: "以下简称乙方(B)。",
    date: "日期: ",
    issueDate: "签发日期:",
    expiryDate: "有效期至:",
    presentAddress: "现居住址:",
    landlord: "房东 (甲方)",
    agent: "代理人",
    tenant: "租客 (乙方)",
    terms: [
      {
        title: "第一条: 租赁期限",
        content: (contract, endDate) => <p>租赁期限: <span className="font-bold">{contract.durationMonths || '.....'}</span> 个月, 从 <span className="font-bold">{contract.startDate || '................'}</span> 到 <span className="font-bold">{endDate}</span>. 租金: <span className="font-bold">{contract.rentAmount || '.....'}</span> 美元/月。</p>
      },
      {
        title: "第二条: 付款方式",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>乙方(B)支付押金 <span className="font-bold">{contract.depositAmount || '.....'}</span> 美元和首月租金 <span className="font-bold">{contract.rentAmount || '.....'}</span> 美元。</li><li>租金于每月 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> 日支付。合同结束时(若无损坏)全额退还押金，但提前终止合同不可抵扣租金或水电费。</li></ul>
      },
      {
        title: "第三条: 税费",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>甲方(A)负责缴纳房产税。</li></ul>
      },
      {
        title: "第三条: 合同终止",
        content: (contract, endDate) => <ul className="list-disc pl-6 space-y-2"><li>合同到期日 <span className="font-bold">{endDate}</span>。</li><li>若甲方(A)提前终止，需提前30天通知并全额退还押金。</li><li>若乙方(B)提前终止、拖欠租金超过7天或违反合同，甲方(A)有权终止合同收回房屋，押金不予退还。</li></ul>
      },
      {
        title: "第四条: 水电及其他服务",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>甲方(A)确保入住前设施正常。</li><li>费用:<div className="space-y-1 mt-2"><div>- 水费: <span className="font-bold">{contract.waterUtility || '.....'}</span></div><div>- 电费: <span className="font-bold">{contract.electricityUtility || '.....'}</span></div><div>- 有线电视: <span className="font-bold">{contract.cableTvUtility || '.....'}</span></div><div>- 网费: <span className="font-bold">{contract.internetUtility || '.....'}</span></div>{(contract.otherUtility1Name || contract.otherUtility1Price) && (<div>- {contract.otherUtility1Name}: <span className="font-bold">{contract.otherUtility1Price}</span></div>)}{(contract.otherUtility2Name || contract.otherUtility2Price) && (<div>- {contract.otherUtility2Name}: <span className="font-bold">{contract.otherUtility2Price}</span></div>)}</div></li></ul>
      },
      {
        title: "第四条: 其他条件",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>改变房屋结构需经甲方(A)批准。</li><li>自然灾害造成的维修由甲方(A)负责。</li><li>未经允许严禁转租。</li><li>仅供居住。如用于非法活动(赌博、贩卖人口、绑架、网络诈骗等)，乙方(B)将面临法律后果，合同立即终止。</li></ul>
      },
      {
        title: "第五条: 续签合同",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>乙方(B)如需续签，必须提前1个月通知。</li></ul>
      },
      {
        title: "第七条: 家具和设备",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>合同终止时，乙方(B)必须将房屋和设备按原状归还。</li></ul>
      },
      {
        title: "第七条: 入内权利",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>甲方(A)可提前24小时通知后进入检查房屋。</li></ul>
      },
      {
        title: "第八条: 效力",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>双方同意上述条款。违约方需承担法律责任。</li><li>合同签署后，高棉语和其他语言版本具有同等法律效力。若不同语言版本之间在含义或解释上存在分歧，应以高棉语版本为准。</li></ul>
      }
    ],
    carLeaseTitle: "汽车租赁合同",
    carOwner: "车主",
    carRenter: "租客",
    carOwnerDesc: "汽车合法拥有者；",
    carTerms: [
      {
        title: "第一条",
        content: (contract: any) => <p>乙方 (B) 要求并同意向甲方 (A) 租用上述车辆用于 <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'zh')}</span>。除 <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'zh')}</span> 外，乙方 (B) 不得将车辆用于任何其他目的。如需变更租赁用途，必须事先获得书面同意。</p>
      },
      {
        title: "第二条",
        content: (contract: any, endDate: string) => <p>本合同有效期为 <span className="font-bold">{contract.durationMonths || '.....'}</span> 个月，自 <span className="font-bold">{contract.startDate || '................'}</span> 至 <span className="font-bold">{endDate}</span>。此车辆租金为 <span className="font-bold">{contract.rentAmount || '.....'}</span> 美元/月。</p>
      },
      {
        title: "第三条",
        content: (contract: any) => <div className="space-y-2"><p>乙方 (B) 须向甲方 (A) 支付 <span className="font-bold">{contract.depositAmount || '.....'}</span> 美元的押金。在合同终止且经检查确认车辆无损坏后，此押金将全额退还给乙方 (B)。如遇车辆损坏，甲方 (A) 可从押金中扣除维修费用，剩余押金须退还给乙方 (B)。若损坏程度所需维修费用超过押金金额，乙方 (B) 必须支付额外款项以补足维修费用。</p><p>乙方 (B) 须每月按时向甲方 (A) 支付租金。乙方 (B) 须在每月 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> 日向甲方 (A) 支付租金。</p></div>
      },
      {
        title: "第四条",
        content: () => <p>未经车辆所有者甲方 (A) 的许可，乙方 (B) 不得转租或将从甲方 (A) 租来的车辆进行任何商业活动，也不得将其使用权转让给第三方。</p>
      },
      {
        title: "第五条",
        content: () => <p>如果乙方 (B) 在租赁期间使用车辆进行任何违法行为，乙方 (B) 应自行承担全部法律责任，与甲方 (A) 无关，甲方 (A) 对乙方 (B) 使用租赁车辆造成的任何损害不承担责任。</p>
      },
      {
        title: "第六条：车辆损坏情况",
        content: (contract: any) => <div className="space-y-2"><p>6.1 若租赁车辆因乙方 (B) 疏忽使用或过错导致轻微或严重损坏，由乙方 (B) 负责修理，但正常使用造成的磨损除外，此种情况下的修理责任归甲方 (A)。</p><p>6.2 乙方 (B) 必须对车辆的任何损坏（如碰撞、翻车、落水、被盗、火灾或其他事故）负全责，并按双方同意的车辆价值 <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> 赔偿甲方 (A)。</p><p>6.3 乙方 (B) 在使用车辆期间发生碰撞、划痕或其他损坏时，必须通知甲方 (A)，不允许乙方 (B) 隐瞒信息且未经甲方 (A) 同意私自维修车辆。</p><p>6.4 到达使用寿命或因正常使用损坏的零部件的维护和更换由甲方 (A) 负责。</p></div>
      },
      {
        title: "第七条",
        content: () => <p>在租赁期间，因使用本车辆造成的任何损坏（如交通事故或运输违禁品、走私及其他违法活动），乙方 (B) 应单独承担刑事和民事责任。</p>
      },
      {
        title: "第八条",
        content: () => <p>如果乙方 (B) 未履行支付租金义务或迟延支付租金超过7天，或违反合同任何条款，甲方 (A) 有权终止合同并在不事先通知的情况下收回车辆。</p>
      },
      {
        title: "第九条",
        content: (contract: any) => <p>本合同中的租赁车辆允许乙方 (B) 在 <span className="font-bold">{getTranslatedValue(contract.carRentalArea, 'area', 'zh')}</span> 区域内使用。若乙方 (B) 将车辆用于不当目的或前往其他省份，必须通知甲方 (A) 以获得许可，且乙方 (B) 必须对所有费用和损害承担全部责任，与甲方 (A) 无关。</p>
      },
      {
        title: "第十条",
        content: () => <div className="space-y-2"><p>10.1 本合同是双方在真实、自愿的情况下，就合同中所述所有条款和条件达成的协议。</p><p>10.2 除非双方同意，否则任何一方不得单方面对条款和条件进行修改。本合同自双方签字（按手印）并接受之日起生效。</p><p>10.3 双方必须公平公正地履行上述合同中规定的义务。若任何一方怀有恶意，违反本合同的任何规定，将依法追究责任。</p></div>
      },
      {
        title: "第十一条",
        content: () => <div className="space-y-2"><p>11.1 本合同完全受柬埔寨法律管辖，按柬埔寨法律解释，并受柬埔寨管辖权约束。</p><p>11.2 本合同自双方签字并接受之日起生效并具有执行力。</p><p>11.3 本合同采用高棉语和中文撰写，具有同等法律效力。若不同语言版本之间在含义或解释上存在分歧，应以高棉语版本为准。</p></div>
      }
    ],
    carModelLabel: "车型",
    carColorLabel: "颜色",
    carYearLabel: "生产年份",
    carPlateNoLabel: "车牌号",
    carFrameNoLabel: "车架号",
    carEngineNoLabel: "发动机号",
    herebyReferredToA: "，以下简称甲方(A)。",
    herebyReferredToB: "，以下简称乙方(B)。",
    carAgreed: "同意将车辆出租给"
  }
,

  ja: {
    header: "カンボジア王国",
    subHeader: "国家・宗教・国王",
    owner: "貸主:",
    lessee: "借主:",
    agreed: "物件の賃貸に合意する",
    respects: "両当事者は以下の事項に同意する:",
    leaseTitle: "住宅賃貸借契約書",
    sex: "性別:",
    nationality: "国籍:",
    dob: "生年月日:",
    idNumber: "ID/パスポート番号:",
    ownerDesc: "プノンペンの適法な所有者。以下、甲(A)と称する。",
    lesseeDesc: "以下、乙(B)と称する。",
    date: "日付: ",
    issueDate: "発行日:",
    expiryDate: "有効期限:",
    presentAddress: "現住所:",
    landlord: "貸主",
    agent: "代理人",
    tenant: "借主",
    terms: [
      {
        title: "第1条: 賃貸期間",
        content: (contract, endDate) => <p>賃貸期間: <span className="font-bold">{contract.durationMonths || '.....'}</span> ヶ月。 <span className="font-bold">{contract.startDate || '................'}</span> から <span className="font-bold">{endDate}</span> まで。 賃料: 月額 <span className="font-bold">{contract.rentAmount || '.....'}</span> USD。</p>
      },
      {
        title: "第2条: 支払い",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>乙(B)は、デポジット <span className="font-bold">{contract.depositAmount || '.....'}</span> USD および初月賃料 <span className="font-bold">{contract.rentAmount || '.....'}</span> USD を支払う。</li><li>賃料は毎月 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> 日に支払う。デポジットは契約終了時に（破損がない場合）全額返金されるが、早期解約の場合は賃料や光熱費に充当することはできない。</li></ul>
      },
      {
        title: "第3条: 税金",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>甲(A)は固定資産税を負担する。</li></ul>
      },
      {
        title: "第3条: 契約解除",
        content: (contract, endDate) => <ul className="list-disc pl-6 space-y-2"><li>契約は <span className="font-bold">{endDate}</span> に満了する。</li><li>甲(A)が早期に解約する場合、30日前の通知とデポジットの全額返金が必要である。</li><li>乙(B)が早期に解約した場合、賃料の支払いが7日以上遅延した場合、または契約に違反した場合、甲(A)は契約を解除し物件を回収することができ、デポジットは返金されない。</li></ul>
      },
      {
        title: "第4条: 公共料金等",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>甲(A)は入居前に設備が正常に動作することを保証する。</li><li>料金:<div className="space-y-1 mt-2"><div>- 水道: <span className="font-bold">{contract.waterUtility || '.....'}</span></div><div>- 電気: <span className="font-bold">{contract.electricityUtility || '.....'}</span></div><div>- ケーブルTV: <span className="font-bold">{contract.cableTvUtility || '.....'}</span></div><div>- インターネット: <span className="font-bold">{contract.internetUtility || '.....'}</span></div>{(contract.otherUtility1Name || contract.otherUtility1Price) && (<div>- {contract.otherUtility1Name}: <span className="font-bold">{contract.otherUtility1Price}</span></div>)}{(contract.otherUtility2Name || contract.otherUtility2Price) && (<div>- {contract.otherUtility2Name}: <span className="font-bold">{contract.otherUtility2Price}</span></div>)}</div></li></ul>
      },
      {
        title: "第4条: その他の条件",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>建物の構造変更には甲(A)の承認が必要である。</li><li>自然災害による修繕は甲(A)の責任となる。</li><li>許可のない転貸は固く禁じられる。</li><li>居住目的のみ。違法行為（ギャンブル、人身売買、誘拐、オンライン詐欺など）に使用した場合、乙(B)は法的責任を負い、契約は即時解除される。</li></ul>
      },
      {
        title: "第5条: 契約更新",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>更新する場合、乙(B)は1ヶ月前までに通知しなければならない。</li></ul>
      },
      {
        title: "第7条: 家具および設備",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>契約終了時、乙(B)は家屋および設備を原状のまま返還しなければならない。</li></ul>
      },
      {
        title: "第7条: 立ち入り権",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>甲(A)は24時間前に通知した上で、物件の立ち入り検査を行うことができる。</li></ul>
      },
      {
        title: "第8条: 有効性",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>双方は上記条件に同意する。違反した当事者は法的責任を負う。</li><li>契約は署名時に、クメール語と他言語で同等の効力を持つ。解釈や意味に相違がある場合は、クメール語版が優先される。</li></ul>
      }
    ],
    carLeaseTitle: "自動車賃貸借契約書",
    carOwner: "車両所有者",
    carRenter: "車両借受人",
    carOwnerDesc: "車両の法的な所有者である",
    carTerms: [
      {
        title: "第1条",
        content: (contract: any) => <p>乙(B)は、甲(A)が所有する上記の車両を<span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'ja')}</span>を目的として賃借することを申し入れ、同意する。乙(B)は、車両を<span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'ja')}</span>以外の目的で使用してはならない。本賃貸の目的を変更する場合は、事前の書面による合意を必要とする。</p>
      },
      {
        title: "第2条",
        content: (contract: any, endDate: string) => <p>本契約は、<span className="font-bold">{contract.startDate || '................'}</span>から<span className="font-bold">{endDate}</span>までの<span className="font-bold">{contract.durationMonths || '.....'}</span>ヶ月間有効である。本車両は月額<span className="font-bold">{contract.rentAmount || '.....'}</span>米ドルで賃貸される。</p>
      },
      {
        title: "第3条",
        content: (contract: any) => <div className="space-y-2"><p>乙(B)は甲(A)に保証金として<span className="font-bold">{contract.depositAmount || '.....'}</span>米ドルを支払うものとする。この保証金は、契約終了時に車両の検査を行い、損害がないことを確認した後、乙(B)に全額返還される。損害がある場合、甲(A)は保証金から修理費用を差し引くことができ、残りの保証金は乙(B)に返還しなければならない。損害の程度により修理費用が保証金を超える場合、乙(B)は修理費用を補うために追加料金を支払わなければならない。</p><p>乙(B)は毎月定期的に甲(A)にレンタル料を支払うものとする。乙(B)は毎月<span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span>日に甲(A)に支払うものとする。</p></div>
      },
      {
        title: "第4条",
        content: () => <p>乙(B)は、車両の所有者である甲(A)の許可なく、甲(A)から賃借した車両を転貸したり、当該車両を用いて事業を行ったり、第三者に使用を譲渡したりしてはならない。</p>
      },
      {
        title: "第5条",
        content: () => <p>賃貸期間中に乙(B)が車両を使用することにより法律に違反する行為を行った場合、乙(B)は甲(A)を巻き込むことなく単独で法的責任を負うものとし、甲(A)は乙(B)による賃借車両の使用によって生じたいかなる損害についても責任を負わないものとする。</p>
      },
      {
        title: "第6条: 車両破損時の対応",
        content: (contract: any) => <div className="space-y-2"><p>6.1 賃貸対象の車両が乙(B)の過失または責任により軽微または深刻な損傷を受けた場合、修理の責任は乙(B)が負うものとする。ただし、通常の使用による摩耗や劣化の場合の修理は甲(A)の責任とする。</p><p>6.2 乙(B)は、合意された車両価格の <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> に相当する賠償金を甲(A)に支払うことにより、車両へのあらゆる損害（衝突、横転、水没、盗難、火災、その他の事故など）に対して全責任を負うものとする。</p><p>6.3 衝突、傷、その他の損傷がある状態で乙(B)が車両を使用する場合、甲(A)に通知しなければならず、乙(B)が甲(A)の同意なしに車両を修理に出した情報を隠蔽することは許されない。</p><p>6.4 寿命に達した部品または通常の使用により損傷した部品のメンテナンスおよび交換は甲(A)の責任とする。</p></div>
      },
      {
        title: "第7条",
        content: () => <p>本賃貸期間中、交通事故や違法物品の輸送、密輸、その他の違法行為など、本車両の使用に起因して生じたいかなる損害についても、乙(B)が刑事上および民事上のすべての責任を単独で負うものとする。</p>
      },
      {
        title: "第8条",
        content: () => <p>乙(B)が賃貸料金を支払う義務を履行しない場合、または賃貸料金の支払いを7日以上遅延した場合、あるいは本契約のいずれかの条項に違反した場合、甲(A)は予告なしに本契約を解除し、車両を回収する権利を有する。</p>
      },
      {
        title: "第9条",
        content: (contract: any) => <p>本契約における賃貸車両は、乙(B)により <span className="font-bold">{getTranslatedValue(contract.carRentalArea, 'area', 'ja')}</span> の周辺地域での使用が許可されている。乙(B)がこれを誤った目的で使用する場合、または他の州に移動する場合は、甲(A)に通知して許可を得なければならず、甲(A)を巻き込むことなくすべての費用および損害について乙(B)が全責任を负わなければならない。</p>
      },
      {
        title: "第10条",
        content: () => <div className="space-y-2"><p>10.1 本契約は、本契約に記載されたすべての諸条件に対する両当事者の真実かつ自由な同意のもとに作成された。</p><p>10.2 諸条件のいかなる変更も、両当事者が合意しない限り、いずれか一方の当事者によって一方的に行うことはできない。本契約は、両当事者が本契約に署名（拇印）し、受諾した後に発効するものとする。</p><p>10.3 両当事者は、上記契約に規定された義務を公正かつ公平に履行しなければならない。いずれかの当事者が上記契約の規定のいずれかに違反する悪意を持っていた場合、適用法に基づいて責任を問われるものとする。</p></div>
      },
      {
        title: "第11条",
        content: () => <div className="space-y-2"><p>11.1 本契約はカンボジアの法律にのみ準拠して解釈され、カンボジアの管轄権に服するものとする。</p><p>11.2 本契約は、両当事者が本契約に署名し、受諾した後に有効となり、法的拘束力を持つ。</p><p>11.3 本契約はクメール語と日本語で作成され、同等の効力を有する。ただし、翻訳や意味の解釈に不一致がある場合は、クメール語版が優先される。</p></div>
      }
    ],
    carModelLabel: "車種",
    carColorLabel: "色",
    carYearLabel: "年式",
    carPlateNoLabel: "登録番号",
    carFrameNoLabel: "車台番号",
    carEngineNoLabel: "原動機の型式",
    herebyReferredToA: "、以下「甲(A)」という。",
    herebyReferredToB: "、以下「乙(B)」という。",
    carAgreed: "車両の賃貸に合意する"
  },

  ko: {
    header: "캄보디아 왕국",
    subHeader: "국가 종교 국왕",
    owner: "임대인:",
    lessee: "임차인:",
    agreed: "다음에 대한 임대에 동의함",
    respects: "양 당사자는 다음 사항에 동의한다:",
    leaseTitle: "주택 임대차 계약서",
    sex: "성별:",
    nationality: "국적:",
    dob: "생년월일:",
    idNumber: "ID/여권 번호:",
    ownerDesc: "프놈펜의 합법적인 소유자. 이하 '갑(A)'이라 칭함.",
    lesseeDesc: "이하 '을(B)'이라 칭함.",
    date: "날짜: ",
    issueDate: "발급일:",
    expiryDate: "만료일:",
    presentAddress: "현재 주소:",
    landlord: "임대인",
    agent: "대리인",
    tenant: "임차인",
    terms: [
      {
        title: "제1조: 임대 기간",
        content: (contract, endDate) => <p>임대 기간: <span className="font-bold">{contract.durationMonths || '.....'}</span>개월. <span className="font-bold">{contract.startDate || '................'}</span> 부터 <span className="font-bold">{endDate}</span> 까지. 임대료: 월 <span className="font-bold">{contract.rentAmount || '.....'}</span> USD.</p>
      },
      {
        title: "제2조: 지불",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>을(B)은 보증금 <span className="font-bold">{contract.depositAmount || '.....'}</span> USD 및 첫 달 임대료 <span className="font-bold">{contract.rentAmount || '.....'}</span> USD를 지불한다.</li><li>임대료는 매월 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> 일에 지불한다. 계약 종료 시(파손이 없는 경우) 보증금은 전액 환불되지만, 조기 해지 시 임대료나 공과금으로 공제할 수 없다.</li></ul>
      },
      {
        title: "제3조: 세금",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>재산세는 갑(A)이 책임진다.</li></ul>
      },
      {
        title: "제3조: 계약 해지",
        content: (contract, endDate) => <ul className="list-disc pl-6 space-y-2"><li>계약은 <span className="font-bold">{endDate}</span> 에 만료된다.</li><li>갑(A)이 조기 해지할 경우 30일 전 통지 및 보증금 전액 환불이 필요하다.</li><li>을(B)이 조기 해지하거나 임대료를 7일 이상 연체하거나 계약을 위반할 경우, 갑(A)은 계약을 해지하고 건물을 회수할 수 있으며 보증금은 환불되지 않는다.</li></ul>
      },
      {
        title: "제4조: 공과금",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>갑(A)은 입주 전 시설이 정상 작동함을 보장한다.</li><li>요금:<div className="space-y-1 mt-2"><div>- 수도: <span className="font-bold">{contract.waterUtility || '.....'}</span></div><div>- 전기: <span className="font-bold">{contract.electricityUtility || '.....'}</span></div><div>- 케이블 TV: <span className="font-bold">{contract.cableTvUtility || '.....'}</span></div><div>- 인터넷: <span className="font-bold">{contract.internetUtility || '.....'}</span></div>{(contract.otherUtility1Name || contract.otherUtility1Price) && (<div>- {contract.otherUtility1Name}: <span className="font-bold">{contract.otherUtility1Price}</span></div>)}{(contract.otherUtility2Name || contract.otherUtility2Price) && (<div>- {contract.otherUtility2Name}: <span className="font-bold">{contract.otherUtility2Price}</span></div>)}</div></li></ul>
      },
      {
        title: "제4조: 기타 조건",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>건물 구조 변경 시 갑(A)의 승인이 필요하다.</li><li>자연재해로 인한 수리는 갑(A)의 책임이다.</li><li>허가 없는 전대는 엄격히 금지된다.</li><li>주거 목적으로만 사용한다. 불법 활동(도박, 인신매매, 납치, 온라인 사기 등)에 사용할 경우 을(B)은 법적 책임을 지며 계약은 즉시 해지된다.</li></ul>
      },
      {
        title: "제5조: 갱신",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>갱신하려면 을(B)은 1개월 전에 통지해야 한다.</li></ul>
      },
      {
        title: "제7조: 가구 및 장비",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>계약 종료 시 을(B)은 집과 장비를 원래 상태로 반환해야 한다.</li></ul>
      },
      {
        title: "제7조: 출입 권한",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>갑(A)은 24시간 전 통지 후 건물을 점검할 수 있다.</li></ul>
      },
      {
        title: "제8조: 유효성",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>양 당사자는 조건에 동의한다. 위반한 당사자는 법적 책임을 진다.</li><li>계약은 서명 시 크메르어와 다른 언어로 동등한 효력을 갖는다. 해석이나 의미에 차이가 있을 경우 크메르어 본이 우선한다.</li></ul>
      }
    ],
    carLeaseTitle: "차량 임대 계약서",
    carOwner: "차량 소유자",
    carRenter: "차량 임차인",
    carOwnerDesc: "차량의 합법적인 소유자",
    carTerms: [
      {
        title: "제1조",
        content: (contract: any) => <p>을(B)은 갑(A)의 소유인 명시된 차량을 <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'ko')}</span>을(를) 목적으로 임대할 것을 요청하고 동의한다. 을(B)은 <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'ko')}</span> 이외의 목적으로 차량을 사용해서는 안 된다. 본 임대 목적을 변경하려면 사전 서면 동의가 필요하다.</p>
      },
      {
        title: "제2조",
        content: (contract: any, endDate: string) => <p>본 계약은 <span className="font-bold">{contract.startDate || '................'}</span>부터 <span className="font-bold">{endDate}</span>까지 <span className="font-bold">{contract.durationMonths || '.....'}</span>개월 동안 유효하다. 본 차량의 임대료는 월 <span className="font-bold">{contract.rentAmount || '.....'}</span> USD이다.</p>
      },
      {
        title: "제3조",
        content: (contract: any) => <div className="space-y-2"><p>을(B)은 갑(A)에게 보증금으로 <span className="font-bold">{contract.depositAmount || '.....'}</span> USD를 지불해야 한다. 이 보증금은 계약 종료 시 차량 검사를 통해 손상이 없음을 확인한 후 을(B)에게 전액 환불된다. 차량에 손상이 있는 경우 갑(A)은 보증금에서 수리비를 공제할 수 있으며, 남은 보증금은 을(B)에게 반환해야 한다. 차량 파손 정도에 따른 수리비가 보증금을 초과할 경우, 을(B)은 수리비를 충당하기 위해 추가 금액을 지불해야 한다.</p><p>을(B)은 매월 정기적으로 갑(A)에게 임대료를 지불해야 한다. 을(B)은 매월 <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span>일에 갑(A)에게 임대료를 지불해야 한다.</p></div>
      },
      {
        title: "제4조",
        content: () => <p>을(B)은 차량 소유자인 갑(A)의 허가 없이 갑(A)로부터 임대한 차량을 전대하거나 해당 차량으로 사업을 영위하거나 제3자에게 사용을 양도할 수 없다.</p>
      },
      {
        title: "제5조",
        content: () => <p>임대 기간 동안 을(B)이 차량을 사용하여 법을 위반하는 행위를 한 경우, 을(B)은 갑(A)을 개입시키지 않고 독자적으로 법적 책임을 져야 하며, 갑(A)은 을(B)의 임대 차량 사용으로 인해 발생한 어떠한 손해에 대해서도 책임을 지지 않는다.</p>
      },
      {
        title: "제6조: 차량 파손의 경우",
        content: (contract: any) => <div className="space-y-2"><p>6.1 임대 대상 차량이 을(B)의 부주의한 사용이나 과실로 인해 경미하거나 심각한 손상을 입은 경우, 정상적인 사용으로 인한 마모 및 훼손의 경우는 갑(A)이 수리 책임을 지는 것을 제외하고는 을(B)이 수리 책임을 져야 한다.</p><p>6.2 을(B)은 합의된 차량 가격의 <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span>에 해당하는 보상금을 갑(A)에게 지불함으로써 (충돌, 전복, 침수, 도난, 화재 또는 기타 사고) 등 차량의 모든 손상에 대해 전적인 책임을 져야 한다.</p><p>6.3 을(B)이 충돌, 긁힘 또는 기타 손상이 있는 상태로 차량을 사용하는 경우 갑(A)에게 통지해야 하며, 을(B)이 갑(A)의 동의 없이 차량을 수리한 사실을 숨겨서는 안 된다.</p><p>6.4 수명이 다하거나 정상적인 사용으로 인해 손상된 부품의 유지보수 및 교체는 갑(A)의 책임이다.</p></div>
      },
      {
        title: "제7조",
        content: () => <p>본 임대 기간 동안 교통사고, 불법 물품 및 금수품 운송, 기타 불법 행위 등 본 차량의 사용으로 인해 발생하는 모든 피해에 대해 을(B)은 민형사상 책임을 전적으로 부담한다.</p>
      },
      {
        title: "제8조",
        content: () => <p>을(B)이 임대료 지불 의무를 이행하지 않거나 임대료 지불을 7일 이상 지연하는 경우, 또는 본 계약의 조항을 위반하는 경우, 갑(A)은 사전 통지 없이 계약을 해지하고 차량을 회수할 권리가 있다.</p>
      },
      {
        title: "제9조",
        content: (contract: any) => <p>본 계약에 따른 임대 차량은 을(B)이 <span className="font-bold">{getTranslatedValue(contract.carRentalArea, 'area', 'ko')}</span> 주변 지역에서 사용할 수 있도록 허용된다. 을(B)이 차량을 잘못된 목적으로 사용하거나 타 주로 이동하는 경우 갑(A)에게 통지하여 허가를 받아야 하며, 갑(A)을 개입시키지 않고 모든 비용과 손해에 대해 전적으로 을(B)이 책임을 져야 한다.</p>
      },
      {
        title: "제10조",
        content: () => <div className="space-y-2"><p>10.1 본 계약은 본 계약에 명시된 모든 이용 약관에 대한 양 당사자의 진실하고 자유로운 동의에 의해 작성되었다.</p><p>10.2 이용 약관의 어떠한 변경도 양 당사자가 동의하지 않는 한 어느 한 당사자가 일방적으로 변경할 수 없다. 본 계약은 양 당사자가 서명(무인)하고 수락한 후 효력이 발생한다.</p><p>10.3 양 당사자는 위 계약에 규정된 의무를 공정하고 형평성 있게 이행해야 한다. 어느 한 당사자가 위 계약의 조항을 위반하여 악의적인 의도를 가진 경우 적용되는 법률에 따라 책임을 져야 한다.</p></div>
      },
      {
        title: "제11조",
        content: () => <div className="space-y-2"><p>11.1 본 계약은 캄보디아 법률의 적용을 받고 독점적으로 해석되며 캄보디아의 관할권에 따른다.</p><p>11.2 본 계약은 양 당사자가 서명하고 수락한 후에 유효하며 집행 가능하다.</p><p>11.3 본 계약은 크메르어와 한국어로 작성되었으며 동등한 법적 효력을 가집니다. 해석이나 의미에 차이가 있을 경우 크메르어 본이 우선한다.</p></div>
      }
    ],
    carModelLabel: "차종",
    carColorLabel: "색상",
    carYearLabel: "연식",
    carPlateNoLabel: "차량 번호",
    carFrameNoLabel: "차대 번호",
    carEngineNoLabel: "엔진 번호",
    herebyReferredToA: ", 이하 '갑(A)'이라 칭함.",
    herebyReferredToB: ", 이하 '을(B)'이라 칭함.",
    carAgreed: "다음에 대한 차량 임대에 동의함"
  },

  ru: {
    header: "КОРОЛЕВСТВО КАМБОДЖА",
    subHeader: "Нация Религия Король",
    owner: "ВЛАДЕЛЕЦ:",
    lessee: "АРЕНДАТОР:",
    agreed: "СОГЛАСЕН СДАТЬ В АРЕНДУ ПОМЕЩЕНИЕ",
    respects: "Обе стороны согласны со следующими условиями:",
    leaseTitle: "ДОГОВОР АРЕНДЫ ЖИЛОГО ПОМЕЩЕНИЯ",
    sex: "Пол:",
    nationality: "Гражданство:",
    dob: "Дата рождения:",
    idNumber: "Номер ID/паспорта:",
    ownerDesc: "Законный владелец объекта в Пномпене; далее именуемый Сторона (А).",
    lesseeDesc: "далее именуемый Сторона (Б).",
    date: "Дата: ",
    issueDate: "Дата выдачи:",
    expiryDate: "Срок действия:",
    presentAddress: "Текущий адрес:",
    landlord: "ВЛАДЕЛЕЦ",
    agent: "АГЕНТ",
    tenant: "АРЕНДАТОР",
    terms: [
      {
        title: "СТАТЬЯ 1: СРОК АРЕНДЫ",
        content: (contract, endDate) => <p>Срок аренды: <span className="font-bold">{contract.durationMonths || '.....'}</span> мес., с <span className="font-bold">{contract.startDate || '................'}</span> по <span className="font-bold">{endDate}</span>. Арендная плата: <span className="font-bold">{contract.rentAmount || '.....'}</span> USD в месяц.</p>
      },
      {
        title: "СТАТЬЯ 2: ОПЛАТА",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>Сторона (Б) вносит депозит в размере <span className="font-bold">{contract.depositAmount || '.....'}</span> USD и плату за первый месяц в размере <span className="font-bold">{contract.rentAmount || '.....'}</span> USD.</li><li>Арендная плата вносится <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> числа каждого месяца. Депозит возвращается в конце срока аренды (при отсутствии повреждений), но не может быть удержан в счет аренды или коммунальных услуг при досрочном расторжении.</li></ul>
      },
      {
        title: "СТАТЬЯ 3: НАЛОГИ",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Сторона (А) несет ответственность за налог на недвижимость.</li></ul>
      },
      {
        title: "СТАТЬЯ 4: РАСТОРЖЕНИЕ",
        content: (contract, endDate) => <ul className="list-disc pl-6 space-y-2"><li>Срок действия договора истекает <span className="font-bold">{endDate}</span>.</li><li>Если Сторона (А) расторгает договор досрочно, требуется уведомление за 30 дней и полный возврат депозита.</li><li>Если Сторона (Б) расторгает договор досрочно, задерживает оплату более чем на 7 дней или нарушает договор, Сторона (А) может расторгнуть договор, вернуть объект, и депозит не возвращается.</li></ul>
      },
      {
        title: "СТАТЬЯ 5: КОММУНАЛЬНЫЕ УСЛУГИ",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>Сторона (А) гарантирует исправность коммуникаций перед въездом.</li><li>Тарифы:<div className="space-y-1 mt-2"><div>- Вода: <span className="font-bold">{contract.waterUtility || '.....'}</span></div><div>- Электричество: <span className="font-bold">{contract.electricityUtility || '.....'}</span></div><div>- Кабельное ТВ: <span className="font-bold">{contract.cableTvUtility || '.....'}</span></div><div>- Интернет: <span className="font-bold">{contract.internetUtility || '.....'}</span></div>{(contract.otherUtility1Name || contract.otherUtility1Price) && (<div>- {contract.otherUtility1Name}: <span className="font-bold">{contract.otherUtility1Price}</span></div>)}{(contract.otherUtility2Name || contract.otherUtility2Price) && (<div>- {contract.otherUtility2Name}: <span className="font-bold">{contract.otherUtility2Price}</span></div>)}</div></li></ul>
      },
      {
        title: "СТАТЬЯ 6: ДРУГИЕ УСЛОВИЯ",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Конструктивные изменения требуют согласия Стороны (А).</li><li>Ремонт после стихийных бедствий — ответственность Стороны (А).</li><li>Субаренда строго запрещена без разрешения.</li><li>Только для проживания. В случае использования для незаконной деятельности (азартные игры, торговля людьми, похищения, онлайн-мошенничество) Сторона (Б) несет правовую ответственность, а договор немедленно расторгается.</li></ul>
      },
      {
        title: "СТАТЬЯ 7: ПРОДЛЕНИЕ",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Для продления Сторона (Б) должна уведомить об этом за 1 месяц.</li></ul>
      },
      {
        title: "СТАТЬЯ 8: МЕБЕЛЬ И ОБОРУДОВАНИЕ",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>При расторжении Сторона (Б) должна вернуть дом и оборудование в первоначальном состоянии.</li></ul>
      },
      {
        title: "СТАТЬЯ 9: ПРАВО НА ВХОД",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Сторона (А) может инспектировать помещение с уведомлением за 24 часа.</li></ul>
      },
      {
        title: "СТАТЬЯ 10: ДЕЙСТВИТЕЛЬНОСТЬ",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Обе стороны согласны с условиями. Нарушившая сторона несет юридическую ответственность.</li><li>Договор имеет равную юридическую силу на кхмерском и других языках после подписания. В случае расхождений в толковании или значении версий преимущественную силу имеет версия на кхмерском языке.</li></ul>
      }
    ],
    carLeaseTitle: "Договор аренды автомобиля",
    carOwner: "Владелец автомобиля",
    carRenter: "Арендатор автомобиля",
    carOwnerDesc: "являющийся законным владельцем автомобиля",
    carTerms: [
      {
        title: "Статья 1",
        content: (contract: any) => <p>Сторона (Б) просит и соглашается арендовать транспортное средство, описанное выше, у Стороны (A) для <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'ru')}</span>. Сторона (Б) не должна использовать транспортное средство для каких-либо иных целей, кроме <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'ru')}</span>. Любое изменение цели данной аренды требует предварительного письменного согласия.</p>
      },
      {
        title: "Статья 2",
        content: (contract: any, endDate: string) => <p>Настоящий договор действителен сроком на <span className="font-bold">{contract.durationMonths || '.....'}</span> мес., с <span className="font-bold">{contract.startDate || '................'}</span> по <span className="font-bold">{endDate}</span>. Данный автомобиль сдается в аренду за <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/месяц.</p>
      },
      {
        title: "Статья 3",
        content: (contract: any) => <div className="space-y-2"><p>Сторона (B) обязуется выплатить Стороне (A) страховой залог в размере <span className="font-bold">{contract.depositAmount || '.....'}</span> USD. Этот залог будет полностью возвращен Стороне (B) при расторжении договора после осмотра, подтверждающего отсутствие повреждений транспортного средства. В случае повреждения Сторона (A) может вычесть стоимость ремонта из залога, а оставшаяся часть залога должна быть возвращена Стороне (B). Если размер повреждений требует затрат на ремонт, превышающих сумму залога, Сторона (B) должна доплатить дополнительные средства для покрытия стоимости ремонта.</p><p>Сторона (B) обязуется регулярно выплачивать арендную плату Стороне (A) каждый месяц. Сторона (B) обязуется выплачивать арендную плату Стороне (A) <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> числа каждого месяца.</p></div>
      },
      {
        title: "Статья 4",
        content: () => <p>Сторона (B) не имеет права сдавать в субаренду, осуществлять какую-либо коммерческую деятельность с автомобилем, арендованным у Стороны (A), или передавать право пользования им третьему лицу без разрешения Стороны (A), владельца транспортного средства.</p>
      },
      {
        title: "Статья 5",
        content: () => <p>В случае если Сторона (B) совершает противоправные действия при использовании транспортного средства в период аренды, Сторона (B) несет самостоятельную юридическую ответственность без привлечения Стороны (A), и Сторона (A) не несет ответственности за любой ущерб, причиненный в результате использования арендованного автомобиля Стороной (B).</p>
      },
      {
        title: "Статья 6: Повреждение транспортного средства",
        content: (contract: any) => <div className="space-y-2"><p>6.1 В случае если арендуемое транспортное средство получило легкие или серьезные повреждения из-за небрежного использования или по вине Стороны (B), ответственность за ремонт несет Сторона (B), за исключением случаев износа в результате нормального использования, когда ответственность за ремонт несет Сторона (A).</p><p>6.2 Сторона (B) несет полную ответственность за любой ущерб транспортному средству (столкновение, опрокидывание, падение в воду, кража, пожар или другие несчастные случаи), выплатив Стороне (A) согласованную компенсацию в размере <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> от стоимости автомобиля.</p><p>6.3 В случае если Сторона (B) использует автомобиль со следами столкновений, царапинами или другими повреждениями, Сторона (A) должна быть об этом уведомлена; Стороне (B) не разрешается скрывать информацию о передаче автомобиля в ремонт без согласия Стороны (A).</p><p>6.4 Обслуживание и замена деталей, срок службы которых истек или которые повреждены в результате нормального использования, является обязанностью Стороны (A).</p></div>
      },
      {
        title: "Статья 7",
        content: () => <p>В течение данного периода аренды Сторона (B) несет исключительную уголовную и гражданскую ответственность за любой ущерб, вызванный использованием данного транспортного средства, например, в результате дорожно-транспортных происшествий, перевозки незаконных или контрабандных товаров и другой незаконной деятельности.</p>
      },
      {
        title: "Статья 8",
        content: () => <p>В случае если Сторона (B) не выполняет свои обязательства по оплате аренды, задерживает арендную плату более чем на 7 дней или нарушает любые условия договора, Сторона (A) имеет право расторгнуть договор и вернуть автомобиль без предварительного уведомления.</p>
      },
      {
        title: "Статья 9",
        content: (contract: any) => <p>В рамках данного договора арендованный автомобиль разрешен к использованию Стороной (B) в районе <span className="font-bold">{getTranslatedValue(contract.carRentalArea, 'area', 'ru')}</span>. Если Сторона (B) использует его не по назначению или выезжает в другие провинции, она должна уведомить Сторону (A) для получения разрешения, и Сторона (B) должна нести полную ответственность за все расходы и ущерб без привлечения Стороны (A).</p>
      },
      {
        title: "Статья 10",
        content: () => <div className="space-y-2"><p>10.1 Настоящий договор составлен при подлинном и свободном согласии обеих сторон со всеми положениями и условиями, изложенными в нем.</p><p>10.2 Любые изменения положений и условий не могут быть внесены в одностороннем порядке ни одной из сторон, если только обе стороны не договорятся об этом. Настоящий договор вступает в силу после того, как обе стороны подпишут (поставят отпечаток пальца) и примут его.</p><p>10.3 Обе стороны должны выполнять свои обязательства, предусмотренные вышеуказанным договором, честно и справедливо. Если какая-либо из сторон имеет злой умысел, нарушая любые положения вышеуказанного договора, она будет привлечена к ответственности в соответствии с применимым законодательством.</p></div>
      },
      {
        title: "Статья 11",
        content: () => <div className="space-y-2"><p>11.1 Настоящий договор регулируется и толкуется исключительно в соответствии с законодательством Камбоджи и подпадает под юрисдикцию Камбоджи.</p><p>11.2 Настоящий договор вступает в силу и подлежит исполнению после того, как обе стороны подпишут и примут его.</p><p>11.3 Настоящий договор составлен на кхмерском и русском языках, оба текста имеют одинаковую юридическую силу. В случае каких-либо расхождений в толковании или значении версий преимущественную силу имеет версия на кхмерском языке.</p></div>
      }
    ],
    carModelLabel: "Модель автомобиля",
    carColorLabel: "Цвет",
    carYearLabel: "Год выпуска",
    carPlateNoLabel: "Номерной знак",
    carFrameNoLabel: "Номер кузова/рамы",
    carEngineNoLabel: "Номер двигателя",
    herebyReferredToA: ", в дальнейшем именуемый Сторона (А).",
    herebyReferredToB: ", в дальнейшем именуемый Сторона (Б).",
    carAgreed: "СОГЛАСЕН СДАТЬ В АРЕНДУ ТРАНСПОРТНОЕ СРЕДСТВО"
  }
};
