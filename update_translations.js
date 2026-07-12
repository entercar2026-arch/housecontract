const fs = require('fs');

let content = fs.readFileSync('src/translations.tsx', 'utf8');

// Update getTranslatedValue for purpose
content = content.replace(
  `} else if (lang === 'ru') {
      const ruMap: Record<string, string> = { 'Personal Use': 'Личное пользование', 'Company Use': 'Служебное пользование', 'Trip': 'Поездка' };
      return ruMap[basePurp] || basePurp;
    }`,
  `} else if (lang === 'ru') {
      const ruMap: Record<string, string> = { 'Personal Use': 'Личное пользование', 'Company Use': 'Служебное пользование', 'Trip': 'Поездка' };
      return ruMap[basePurp] || basePurp;
    } else if (lang === 'vi') {
      const viMap: Record<string, string> = { 'Personal Use': 'Sử dụng cá nhân', 'Company Use': 'Sử dụng công ty', 'Trip': 'Chuyến đi' };
      return viMap[basePurp] || basePurp;
    } else if (lang === 'fr') {
      const frMap: Record<string, string> = { 'Personal Use': 'Usage personnel', 'Company Use': "Usage d'entreprise", 'Trip': 'Voyage' };
      return frMap[basePurp] || basePurp;
    }`
);

// Update getTranslatedValue for area
content = content.replace(
  `} else if (lang === 'ru') {
      const ruMap: Record<string, string> = { 'Phnom Penh': 'Пномпень', 'Phnom Penh - Provinces': 'Пномпень и провинции' };
      return ruMap[baseArea] || baseArea;
    }`,
  `} else if (lang === 'ru') {
      const ruMap: Record<string, string> = { 'Phnom Penh': 'Пномпень', 'Phnom Penh - Provinces': 'Пномпень и провинции' };
      return ruMap[baseArea] || baseArea;
    } else if (lang === 'vi') {
      const viMap: Record<string, string> = { 'Phnom Penh': 'Phnôm Pênh', 'Phnom Penh - Provinces': 'Phnôm Pênh - Các tỉnh' };
      return viMap[baseArea] || baseArea;
    } else if (lang === 'fr') {
      const frMap: Record<string, string> = { 'Phnom Penh': 'Phnom Penh', 'Phnom Penh - Provinces': 'Phnom Penh - Provinces' };
      return frMap[baseArea] || baseArea;
    }`
);

// Update translateUtilityValue
content = content.replace(
  `if (lang === 'ru') return 'нет';`,
  `if (lang === 'ru') return 'нет';
    if (lang === 'vi') return 'Không';
    if (lang === 'fr') return 'Aucun';`
);

content = content.replace(
  `if (lang === 'ru') return 'бесплатно';`,
  `if (lang === 'ru') return 'бесплатно';
    if (lang === 'vi') return 'Miễn phí';
    if (lang === 'fr') return 'Gratuit';`
);

content = content.replace(
  `else if (lang === 'ru') monthTrans = '/мес.';`,
  `else if (lang === 'ru') monthTrans = '/мес.';
    else if (lang === 'vi') monthTrans = '/tháng';
    else if (lang === 'fr') monthTrans = '/mois';`
);

content = content.replace(
  `else if (lang === 'ru') personTrans = '/чел.';`,
  `else if (lang === 'ru') personTrans = '/чел.';
    else if (lang === 'vi') personTrans = '/người';
    else if (lang === 'fr') personTrans = '/personne';`
);


// Now for appending the translation blocks for vi and fr
const frAndViBlocks = `
,
  vi: {
    header: "VƯƠNG QUỐC CAMPUCHIA",
    subHeader: "Quốc gia Tôn giáo Quốc vương",
    owner: "CHỦ NHÀ:",
    lessee: "NGƯỜI THUÊ:",
    agreed: "ĐỒNG Ý CHO THUÊ NHÀ",
    respects: "Hai bên thống nhất các điều khoản sau:",
    leaseTitle: "HỢP ĐỒNG THUÊ NHÀ",
    sex: "Giới tính:",
    nationality: "Quốc tịch:",
    dob: "Ngày sinh:",
    idNumber: "Số CMND/Hộ chiếu:",
    ownerDesc: "Là chủ sở hữu hợp pháp tại Phnôm Pênh; sau đây gọi là Bên (A).",
    lesseeDesc: "sau đây gọi là Bên (B).",
    date: "Ngày: ",
    issueDate: "Ngày cấp:",
    expiryDate: "Ngày hết hạn:",
    presentAddress: "Địa chỉ hiện tại:",
    landlord: "CHỦ NHÀ",
    agent: "ĐẠI LÝ",
    tenant: "NGƯỜI THUÊ",
    terms: [
      {
        title: "ĐIỀU 1: THỜI HẠN THUÊ",
        content: (contract, endDate) => <p>Thời hạn thuê: <span className="font-bold">{contract.durationMonths || '.....'}</span> tháng, từ <span className="font-bold">{contract.startDate || '................'}</span> đến <span className="font-bold">{endDate}</span>. Tiền thuê: <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/tháng.</p>
      },
      {
        title: "ĐIỀU 2: THANH TOÁN",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>Bên (B) đặt cọc <span className="font-bold">{contract.depositAmount || '.....'}</span> USD và trả tiền thuê tháng đầu tiên là <span className="font-bold">{contract.rentAmount || '.....'}</span> USD.</li><li>Tiền thuê nhà phải trả vào ngày <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> mỗi tháng. Tiền đặt cọc sẽ được hoàn lại khi kết thúc hợp đồng (nếu không có hư hỏng) nhưng không được trừ vào tiền thuê hoặc điện nước nếu chấm dứt sớm.</li></ul>
      },
      {
        title: "ĐIỀU 3: THUẾ",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Bên (A) chịu trách nhiệm đóng thuế tài sản.</li></ul>
      },
      {
        title: "ĐIỀU 4: CHẤM DỨT",
        content: (contract, endDate) => <ul className="list-disc pl-6 space-y-2"><li>Hợp đồng hết hạn vào ngày <span className="font-bold">{endDate}</span>.</li><li>Nếu Bên (A) chấm dứt hợp đồng sớm, phải thông báo trước 30 ngày và hoàn trả toàn bộ tiền cọc.</li><li>Nếu Bên (B) chấm dứt hợp đồng sớm, trả chậm tiền thuê quá 7 ngày, hoặc vi phạm hợp đồng, Bên (A) có quyền chấm dứt hợp đồng, lấy lại nhà và không hoàn trả tiền cọc.</li></ul>
      },
      {
        title: "ĐIỀU 5: ĐIỆN NƯỚC",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>Bên (A) đảm bảo điện nước hoạt động tốt trước khi dọn vào.</li><li>Chi phí:<div className="space-y-1 mt-2"><div>- Nước: <span className="font-bold">{translateUtilityValue(contract.waterUtility, 'vi') || '.....'}</span></div><div>- Điện: <span className="font-bold">{translateUtilityValue(contract.electricityUtility, 'vi') || '.....'}</span></div><div>- Truyền hình cáp: <span className="font-bold">{translateUtilityValue(contract.cableTvUtility, 'vi') || '.....'}</span></div><div>- Internet: <span className="font-bold">{translateUtilityValue(contract.internetUtility, 'vi') || '.....'}</span></div>{(contract.otherUtility1Name || contract.otherUtility1Price) && (<div>- {contract.otherUtility1Name || '.....'}: <span className="font-bold">{translateUtilityValue(contract.otherUtility1Price, 'vi') || '.....'}</span></div>)}{(contract.otherUtility2Name || contract.otherUtility2Price) && (<div>- {contract.otherUtility2Name || '.....'}: <span className="font-bold">{translateUtilityValue(contract.otherUtility2Price, 'vi') || '.....'}</span></div>)}</div></li></ul>
      },
      {
        title: "ĐIỀU 6: ĐIỀU KIỆN KHÁC",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Thay đổi cấu trúc nhà phải được sự đồng ý của Bên (A).</li><li>Bên (A) chịu trách nhiệm sửa chữa do thiên tai.</li><li>Nghiêm cấm cho thuê lại nếu không có sự cho phép.</li><li>Chỉ dùng để ở. Nếu sử dụng cho các hoạt động phi pháp (cờ bạc, buôn người, bắt cóc, lừa đảo qua mạng), Bên (B) sẽ chịu hậu quả pháp lý và hợp đồng sẽ bị chấm dứt ngay lập tức.</li></ul>
      },
      {
        title: "ĐIỀU 7: GIA HẠN",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Để gia hạn, Bên (B) phải thông báo trước 1 tháng.</li></ul>
      },
      {
        title: "ĐIỀU 8: NỘI THẤT VÀ THIẾT BỊ",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Khi chấm dứt, Bên (B) phải trả lại nhà và thiết bị nguyên trạng như ban đầu.</li></ul>
      },
      {
        title: "ĐIỀU 9: QUYỀN VÀO NHÀ",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Bên (A) có thể kiểm tra nhà nhưng phải thông báo trước 24 giờ.</li></ul>
      },
      {
        title: "ĐIỀU 10: HIỆU LỰC",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Hai bên đồng ý với các điều khoản. Bên vi phạm sẽ chịu trách nhiệm pháp lý.</li><li>Hợp đồng có giá trị như nhau bằng tiếng Khmer và tiếng Việt khi ký. Trong trường hợp có bất kỳ sự khác biệt hoặc mâu thuẫn nào về ý nghĩa, bản tiếng Khmer sẽ được ưu tiên.</li></ul>
      }
    ],
    carLeaseTitle: "Hợp đồng thuê ô tô",
    carOwner: "Chủ xe",
    carRenter: "Người thuê xe",
    carOwnerDesc: "là chủ sở hữu hợp pháp của chiếc xe",
    carTerms: [
      {
        title: "Điều 1",
        content: (contract: any) => <p>Bên (B) yêu cầu và đồng ý thuê phương tiện được mô tả ở trên từ Bên (A) cho mục đích <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'vi')}</span>. Bên (B) không được sử dụng phương tiện cho bất kỳ mục đích nào khác ngoài <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'vi')}</span>. Bất kỳ thay đổi nào về mục đích của việc thuê xe này đều cần có sự đồng ý trước bằng văn bản.</p>
      },
      {
        title: "Điều 2",
        content: (contract: any, endDate: string) => <p>Hợp đồng này có giá trị trong thời gian <span className="font-bold">{contract.durationMonths || '.....'}</span> tháng, từ <span className="font-bold">{contract.startDate || '................'}</span> đến <span className="font-bold">{endDate}</span>. Xe này được thuê với giá <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/tháng.</p>
      },
      {
        title: "Điều 3",
        content: (contract: any) => <div className="space-y-2"><p>Bên (B) phải trả tiền đặt cọc là <span className="font-bold">{contract.depositAmount || '.....'}</span> USD cho Bên (A). Khoản tiền gửi này sẽ được hoàn trả đầy đủ cho Bên (B) khi chấm dứt hợp đồng sau khi kiểm tra xác nhận rằng xe không bị hư hỏng. Trong trường hợp hư hỏng, Bên (A) có thể khấu trừ chi phí sửa chữa từ tiền đặt cọc, và phần tiền đặt cọc còn lại phải được trả lại cho Bên (B). Nếu mức độ thiệt hại đòi hỏi chi phí sửa chữa vượt quá số tiền đặt cọc, Bên (B) phải trả thêm tiền để trang trải chi phí sửa chữa.</p><p>Bên (B) phải trả phí thuê xe cho Bên (A) thường xuyên mỗi tháng. Bên (B) phải trả cho Bên (A) vào ngày <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> hàng tháng.</p></div>
      },
      {
        title: "Điều 4",
        content: () => <p>Bên (B) không được cho thuê lại hoặc tiến hành bất kỳ hoạt động kinh doanh nào với phương tiện thuê từ Bên (A) hoặc chuyển quyền sử dụng cho bên thứ ba mà không có sự cho phép của Bên (A), chủ sở hữu xe.</p>
      },
      {
        title: "Điều 5",
        content: () => <p>Trong trường hợp Bên (B) hành động vi phạm pháp luật bằng cách sử dụng xe trong thời gian thuê, Bên (B) sẽ tự chịu trách nhiệm pháp lý, không liên quan đến Bên (A) và Bên (A) sẽ không chịu trách nhiệm về bất kỳ thiệt hại nào do Bên (B) sử dụng xe thuê.</p>
      },
      {
        title: "Điều 6: TRƯỜNG HỢP HƯ HỎNG XE",
        content: (contract: any) => <div className="space-y-2"><p>6.1 Trong trường hợp phương tiện thuê bị hư hỏng nhẹ hoặc nghiêm trọng do sơ suất hoặc lỗi của Bên (B), việc sửa chữa sẽ do Bên (B) chịu trách nhiệm, ngoại trừ trường hợp hao mòn do sử dụng bình thường, trong trường hợp này, việc sửa chữa sẽ do Bên (A) chịu trách nhiệm.</p><p>6.2 Bên (B) sẽ hoàn toàn chịu trách nhiệm về bất kỳ thiệt hại nào đối với xe như (va chạm, lật, rơi xuống nước, mất cắp, cháy hoặc tai nạn khác) bằng cách bồi thường theo thỏa thuận với mức giá bằng <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> giá xe cho Bên (A).</p><p>6.3 Trong trường hợp Bên (B) sử dụng xe bị va chạm, trầy xước hoặc các hư hỏng khác, phải thông báo cho Bên (A) mà không cho phép Bên (B) che giấu thông tin mang xe đi sửa chữa mà không có sự đồng ý của Bên (A).</p><p>6.4 Bảo dưỡng và thay thế các bộ phận đã hết tuổi thọ hoặc bị hư hỏng do sử dụng bình thường là trách nhiệm của Bên (A).</p></div>
      },
      {
        title: "Điều 7",
        content: () => <p>Trong thời gian thuê xe này, mọi thiệt hại do việc sử dụng xe này gây ra, chẳng hạn như tai nạn giao thông hoặc vận chuyển hàng hóa bất hợp pháp, hàng lậu và các hoạt động bất hợp pháp khác, Bên (B) sẽ chịu hoàn toàn trách nhiệm cả về hình sự và dân sự.</p>
      },
      {
        title: "Điều 8",
        content: () => <p>Trong trường hợp Bên (B) không thực hiện nghĩa vụ trả tiền thuê hoặc trả chậm quá 7 ngày, hoặc vi phạm bất kỳ điều khoản nào của hợp đồng, Bên (A) có quyền chấm dứt hợp đồng và lấy lại xe mà không cần báo trước.</p>
      },
      {
        title: "Điều 9",
        content: (contract: any) => <p>Xe thuê trong hợp đồng này được Bên (B) phép sử dụng trong khu vực xung quanh <span className="font-bold">{getTranslatedValue(contract.carRentalArea, 'area', 'vi')}</span>. Trường hợp Bên (B) sử dụng sai mục đích hoặc đi tỉnh khác phải thông báo cho Bên (A) xin phép, và Bên (B) phải hoàn toàn chịu trách nhiệm về mọi chi phí và thiệt hại mà không liên quan đến Bên (A).</p>
      },
      {
        title: "Điều 10",
        content: () => <div className="space-y-2"><p>10.1 Hợp đồng này được lập ra với sự đồng ý thực sự và tự nguyện của cả hai bên đối với tất cả các điều khoản và điều kiện ghi trong hợp đồng này.</p><p>10.2 Bất kỳ thay đổi nào đối với các điều khoản và điều kiện không thể được thực hiện đơn phương bởi một bên trừ khi cả hai bên đồng ý làm như vậy. Hợp đồng này sẽ có hiệu lực sau khi cả hai bên đã ký (lăn tay) và chấp nhận hợp đồng này.</p><p>10.3 Cả hai bên phải thực hiện nghĩa vụ của mình theo quy định trong hợp đồng trên một cách công bằng và bình đẳng. Trong trường hợp một bên có ý đồ xấu bằng cách vi phạm bất kỳ điều khoản nào của hợp đồng trên, họ sẽ phải chịu trách nhiệm theo luật hiện hành.</p></div>
      },
      {
        title: "Điều 11",
        content: () => <div className="space-y-2"><p>11.1 Hợp đồng này sẽ được điều chỉnh và giải thích riêng theo luật pháp của Campuchia và chịu sự tài phán của Campuchia.</p><p>11.2 Hợp đồng này có hiệu lực và có thể thi hành sau khi cả hai bên đã ký và chấp nhận hợp đồng này.</p><p>11.3 Hợp đồng này được lập bằng cả tiếng Khmer và tiếng Việt có giá trị như nhau. Nếu có bất kỳ sự khác biệt nào về ý nghĩa hoặc cách giải thích giữa các phiên bản, phiên bản tiếng Khmer sẽ được ưu tiên.</p></div>
      }
    ],
    carModelLabel: "Mẫu xe",
    carColorLabel: "Màu sắc",
    carYearLabel: "Năm",
    carPlateNoLabel: "Biển số",
    carFrameNoLabel: "Số khung",
    carEngineNoLabel: "Số máy",
    herebyReferredToA: ", sau đây gọi là Bên (A).",
    herebyReferredToB: ", sau đây gọi là Bên (B).",
    carAgreed: "ĐỒNG Ý CHO THUÊ PHƯƠNG TIỆN"
  },

  fr: {
    header: "ROYAUME DU CAMBODGE",
    subHeader: "Nation Religion Roi",
    owner: "PROPRIÉTAIRE :",
    lessee: "LOCATAIRE :",
    agreed: "A CONVENU DE LOUER UNE PROPRIÉTÉ À",
    respects: "Les deux parties conviennent des points suivants :",
    leaseTitle: "CONTRAT DE LOCATION DE MAISON",
    sex: "Sexe :",
    nationality: "Nationalité :",
    dob: "Date de naissance :",
    idNumber: "Numéro de passeport/ID :",
    ownerDesc: "Le propriétaire légal et légitime à Phnom Penh; ci-après dénommé la Partie (A).",
    lesseeDesc: "ci-après dénommée la Partie (B).",
    date: "Date :",
    issueDate: "Date de délivrance :",
    expiryDate: "Date d'expiration :",
    presentAddress: "Adresse actuelle :",
    landlord: "PROPRIÉTAIRE",
    agent: "AGENT",
    tenant: "LOCATAIRE",
    terms: [
      {
        title: "ARTICLE 1 : DURÉE DE LOCATION",
        content: (contract, endDate) => <p>Durée du bail : <span className="font-bold">{contract.durationMonths || '.....'}</span> mois, du <span className="font-bold">{contract.startDate || '................'}</span> au <span className="font-bold">{endDate}</span>. Loyer : <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/mois.</p>
      },
      {
        title: "ARTICLE 2 : PAIEMENT",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>La Partie (B) paie une caution de <span className="font-bold">{contract.depositAmount || '.....'}</span> USD et le premier mois de loyer de <span className="font-bold">{contract.rentAmount || '.....'}</span> USD.</li><li>Le loyer est dû le <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> de chaque mois. La caution est remboursable à la fin du contrat (s'il n'y a pas de dégâts) mais ne peut être déduite du loyer ou des charges en cas de résiliation anticipée.</li></ul>
      },
      {
        title: "ARTICLE 3 : TAXES",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>La Partie (A) est responsable de la taxe foncière.</li></ul>
      },
      {
        title: "ARTICLE 4 : RÉSILIATION",
        content: (contract, endDate) => <ul className="list-disc pl-6 space-y-2"><li>Le contrat expire le <span className="font-bold">{endDate}</span>.</li><li>Si la Partie (A) résilie par anticipation, un préavis de 30 jours et le remboursement intégral de la caution sont requis.</li><li>Si la Partie (B) résilie par anticipation, retarde le loyer de plus de 7 jours ou viole le contrat, la Partie (A) peut résilier le contrat, reprendre la propriété et la caution ne sera pas remboursée.</li></ul>
      },
      {
        title: "ARTICLE 5 : SERVICES PUBLICS",
        content: (contract) => <ul className="list-disc pl-6 space-y-2"><li>La Partie (A) s'assure que les services publics fonctionnent avant l'emménagement.</li><li>Frais :<div className="space-y-1 mt-2"><div>- Eau : <span className="font-bold">{translateUtilityValue(contract.waterUtility, 'fr') || '.....'}</span></div><div>- Électricité : <span className="font-bold">{translateUtilityValue(contract.electricityUtility, 'fr') || '.....'}</span></div><div>- TV par câble : <span className="font-bold">{translateUtilityValue(contract.cableTvUtility, 'fr') || '.....'}</span></div><div>- Internet : <span className="font-bold">{translateUtilityValue(contract.internetUtility, 'fr') || '.....'}</span></div>{(contract.otherUtility1Name || contract.otherUtility1Price) && (<div>- {contract.otherUtility1Name || '.....'} : <span className="font-bold">{translateUtilityValue(contract.otherUtility1Price, 'fr') || '.....'}</span></div>)}{(contract.otherUtility2Name || contract.otherUtility2Price) && (<div>- {contract.otherUtility2Name || '.....'} : <span className="font-bold">{translateUtilityValue(contract.otherUtility2Price, 'fr') || '.....'}</span></div>)}</div></li></ul>
      },
      {
        title: "ARTICLE 6 : AUTRES CONDITIONS",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Les modifications structurelles nécessitent l'approbation de la Partie (A).</li><li>Les réparations suite aux catastrophes naturelles incombent à la Partie (A).</li><li>La sous-location est strictement interdite sans autorisation.</li><li>Usage résidentiel uniquement. En cas d'utilisation pour des activités illégales (jeux de hasard, trafic, enlèvement, escroquerie en ligne), la Partie (B) s'expose à des conséquences juridiques et à la résiliation immédiate du contrat.</li></ul>
      },
      {
        title: "ARTICLE 7 : RENOUVELLEMENT",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Pour renouveler, la Partie (B) doit donner un préavis d'un mois.</li></ul>
      },
      {
        title: "ARTICLE 8 : MEUBLES ET ÉQUIPEMENTS",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>À la résiliation, la Partie (B) doit restituer la maison et les équipements dans leur état d'origine.</li></ul>
      },
      {
        title: "ARTICLE 9 : DROIT D'ENTRÉE",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>La Partie (A) peut inspecter les lieux avec un préavis de 24 heures.</li></ul>
      },
      {
        title: "ARTICLE 10 : VALIDITÉ",
        content: () => <ul className="list-disc pl-6 space-y-2"><li>Les deux parties acceptent les conditions. Les parties en infraction s'exposent à des poursuites judiciaires.</li><li>Le contrat est également valable en khmer et en français dès sa signature. En cas de divergence ou de conflit de sens, la version khmère prévaudra.</li></ul>
      }
    ],
    carLeaseTitle: "Contrat de location de voiture",
    carOwner: "Propriétaire",
    carRenter: "Locataire",
    carOwnerDesc: "qui est le propriétaire légal du véhicule",
    carTerms: [
      {
        title: "Article 1",
        content: (contract: any) => <p>La Partie (B) demande et accepte de louer le véhicule décrit ci-dessus auprès de la Partie (A) pour <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'fr')}</span>. La Partie (B) ne doit pas utiliser le véhicule à d'autres fins que <span className="font-bold">{getTranslatedValue(contract.carPurpose, 'purpose', 'fr')}</span>. Toute modification de l'objectif de cette location nécessite un accord écrit préalable.</p>
      },
      {
        title: "Article 2",
        content: (contract: any, endDate: string) => <p>Ce contrat est valable pour une période de <span className="font-bold">{contract.durationMonths || '.....'}</span> mois, du <span className="font-bold">{contract.startDate || '................'}</span> au <span className="font-bold">{endDate}</span>. Cette voiture est louée pour <span className="font-bold">{contract.rentAmount || '.....'}</span> USD/mois.</p>
      },
      {
        title: "Article 3",
        content: (contract: any) => <div className="space-y-2"><p>La Partie (B) doit payer une caution de <span className="font-bold">{contract.depositAmount || '.....'}</span> USD à la Partie (A). Cette caution sera intégralement remboursée à la Partie (B) à la résiliation du contrat après inspection confirmant que le véhicule n'est pas endommagé. En cas de dommage, la Partie (A) peut déduire les frais de réparation de la caution, et le reste de la caution doit être retourné à la Partie (B). Si l'étendue des dommages nécessite des coûts de réparation dépassant le montant de la caution, la Partie (B) doit payer des fonds supplémentaires pour couvrir les frais de réparation.</p><p>La Partie (B) doit payer régulièrement les frais de location à la Partie (A) chaque mois. La Partie (B) doit payer la Partie (A) le <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> de chaque mois.</p></div>
      },
      {
        title: "Article 4",
        content: () => <p>La Partie (B) ne peut pas sous-louer ou mener des activités commerciales avec le véhicule loué à la Partie (A) ni transférer son utilisation à un tiers sans l'autorisation de la Partie (A), le propriétaire du véhicule.</p>
      },
      {
        title: "Article 5",
        content: () => <p>Dans le cas où la Partie (B) agit en violation de la loi en utilisant le véhicule pendant la période de location, la Partie (B) sera tenue légalement responsable par elle-même, sans impliquer la Partie (A), et la Partie (A) ne sera pas responsable de tout dommage causé par l'utilisation du véhicule de location par la Partie (B).</p>
      },
      {
        title: "Article 6 : CAS DE DOMMAGES AU VÉHICULE",
        content: (contract: any) => <div className="space-y-2"><p>6.1 Dans le cas où le véhicule faisant l'objet de la location est légèrement endommagé ou gravement endommagé en raison d'une utilisation négligente ou d'une faute de la Partie (B), la réparation sera à la charge de la Partie (B), sauf en cas d'usure due à une utilisation normale, auquel cas la réparation sera à la charge de la Partie (A).</p><p>6.2 La Partie (B) sera entièrement responsable de tout dommage causé au véhicule (tel que collision, renversement, chute dans l'eau, vol, incendie ou autres accidents) en versant à la Partie (A) une indemnité convenue à un prix équivalant à <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> du prix du véhicule.</p><p>6.3 Dans le cas où la Partie (B) utilise le véhicule avec des collisions, des rayures ou d'autres dommages, la Partie (A) doit en être informée sans permettre à la Partie (B) de dissimuler l'information en emmenant le véhicule en réparation sans le consentement de la Partie (A).</p><p>6.4 L'entretien et le remplacement des pièces ayant atteint la fin de leur durée de vie ou endommagées par une utilisation normale incombent à la Partie (A).</p></div>
      },
      {
        title: "Article 7",
        content: () => <p>Pendant cette période de location, pour tout dommage causé par l'utilisation de ce véhicule, comme les accidents de la circulation ou le transport de marchandises illégales, de contrebande et autres activités illégales, la Partie (B) sera seule responsable, tant sur le plan pénal que civil.</p>
      },
      {
        title: "Article 8",
        content: () => <p>Dans le cas où la Partie (B) ne remplit pas son obligation de payer le loyer ou paie le loyer avec plus de 7 jours de retard, ou viole l'une des clauses du contrat, la Partie (A) a le droit de résilier le contrat et de reprendre possession de la voiture sans préavis.</p>
      },
      {
        title: "Article 9",
        content: (contract: any) => <p>La voiture de location visée dans ce contrat est autorisée à être utilisée par la Partie (B) dans la région autour de <span className="font-bold">{getTranslatedValue(contract.carRentalArea, 'area', 'fr')}</span>. Dans le cas où la Partie (B) l'utilise dans un but erroné ou se rend dans d'autres provinces, elle doit en informer la Partie (A) pour autorisation, et la Partie (B) devra être entièrement responsable de tous les coûts et dommages sans impliquer la Partie (A).</p>
      },
      {
        title: "Article 10",
        content: () => <div className="space-y-2"><p>10.1 Ce contrat a été conclu avec le consentement véritable et libre des deux parties à toutes les conditions énoncées dans le présent contrat.</p><p>10.2 Toute modification des conditions ne peut être effectuée unilatéralement par l'une des parties, sauf accord des deux parties. Ce contrat prendra effet après que les deux parties l'auront signé (empreinte digitale) et accepté.</p><p>10.3 Les deux parties doivent remplir leurs obligations telles que stipulées dans le contrat ci-dessus de manière juste et équitable. Dans le cas où l'une des parties a une intention malveillante en violant l'une des dispositions du contrat ci-dessus, elle sera tenue responsable en vertu de la loi applicable.</p></div>
      },
      {
        title: "Article 11",
        content: () => <div className="space-y-2"><p>11.1 Ce contrat sera régi et interprété exclusivement conformément aux lois du Cambodge et soumis à la juridiction du Cambodge.</p><p>11.2 Ce contrat est valide et exécutoire après que les deux parties l'ont signé et accepté.</p><p>11.3 Ce contrat est rédigé en khmer et en français avec la même validité. En cas de divergence de sens ou d'interprétation entre les versions, la version khmère prévaudra.</p></div>
      }
    ],
    carModelLabel: "Modèle",
    carColorLabel: "Couleur",
    carYearLabel: "Année",
    carPlateNoLabel: "Numéro d'immatriculation",
    carFrameNoLabel: "Numéro de châssis",
    carEngineNoLabel: "Numéro de moteur",
    herebyReferredToA: ", ci-après dénommée la Partie (A).",
    herebyReferredToB: ", ci-après dénommée la Partie (B).",
    carAgreed: "A CONVENU DE LOUER UN VÉHICULE À"
  }
`;

content = content.replace(
  `}
};`,
  `}${frAndViBlocks}\n};`
);

fs.writeFileSync('src/translations.tsx', content);

console.log("Translations updated successfully.");
