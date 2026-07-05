import fs from 'fs';
let content = fs.readFileSync('src/translations.tsx', 'utf-8');

// English
content = content.replace(
`      {
        title: "Article 6: Vehicle Damage",
        content: (contract: any) => <div className="space-y-2"><p>6.1 In the event that the vehicle subject to the rental is slightly damaged or seriously damaged due to negligent use or fault of Party (B), the repair shall be the responsibility of Party (B), except in the case of wear and tear due to normal use, in which case the repair shall be the responsibility of Party (A).</p><p>6.2 Party (B) shall be fully responsible for any damage to the vehicle such as (collision, overturning, falling into water, theft, fire or other accidents) by paying compensation as agreed upon at a price of <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> of the vehicle price to Party (A).</p><p>6.3 In the event that Party (B) uses the vehicle with collisions, scratches or other damages, Party (A) must be notified without allowing Party (B) to conceal the information of taking the vehicle for repair without the consent of Party (A).</p></div>
      },`,
`      {
        title: "Article 6: Vehicle Damage",
        content: (contract: any) => <div className="space-y-2"><p>6.1 In the event that the vehicle subject to the rental is slightly damaged or seriously damaged due to negligent use or fault of Party (B), the repair shall be the responsibility of Party (B), except in the case of wear and tear due to normal use, in which case the repair shall be the responsibility of Party (A).</p><p>6.2 Party (B) shall be fully responsible for any damage to the vehicle such as (collision, overturning, falling into water, theft, fire or other accidents) by paying compensation as agreed upon at a price of <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> of the vehicle price to Party (A).</p><p>6.3 In the event that Party (B) uses the vehicle with collisions, scratches or other damages, Party (A) must be notified without allowing Party (B) to conceal the information of taking the vehicle for repair without the consent of Party (A).</p><p>6.4 Maintenance and replacement of parts that have reached the end of their lifespan or are damaged by normal use is the responsibility of Party (A).</p></div>
      },`
);

// Chinese
content = content.replace(
`      {
        title: "第六条：车辆损坏情况",
        content: (contract: any) => <div className="space-y-2"><p>6.1 若租赁车辆因乙方 (B) 疏忽使用或过错导致轻微或严重损坏，由乙方 (B) 负责修理，但正常使用造成的磨损除外，此种情况下的修理责任归甲方 (A)。</p><p>6.2 乙方 (B) 必须对车辆的任何损坏（如碰撞、翻车、落水、被盗、火灾或其他事故）负全责，并按双方同意的车辆价值 <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> 赔偿甲方 (A)。</p><p>6.3 乙方 (B) 在使用车辆期间发生碰撞、划痕或其他损坏时，必须通知甲方 (A)，不允许乙方 (B) 隐瞒信息且未经甲方 (A) 同意私自维修车辆。</p></div>
      },`,
`      {
        title: "第六条：车辆损坏情况",
        content: (contract: any) => <div className="space-y-2"><p>6.1 若租赁车辆因乙方 (B) 疏忽使用或过错导致轻微或严重损坏，由乙方 (B) 负责修理，但正常使用造成的磨损除外，此种情况下的修理责任归甲方 (A)。</p><p>6.2 乙方 (B) 必须对车辆的任何损坏（如碰撞、翻车、落水、被盗、火灾或其他事故）负全责，并按双方同意的车辆价值 <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> 赔偿甲方 (A)。</p><p>6.3 乙方 (B) 在使用车辆期间发生碰撞、划痕或其他损坏时，必须通知甲方 (A)，不允许乙方 (B) 隐瞒信息且未经甲方 (A) 同意私自维修车辆。</p><p>6.4 到达使用寿命或因正常使用损坏的零部件的维护和更换由甲方 (A) 负责。</p></div>
      },`
);

// Japanese
content = content.replace(
`      {
        title: "第6条：車両の損傷について",
        content: (contract: any) => <div className="space-y-2"><p>6.1 乙(B)の過失または過誤により賃貸車両が軽微または重大な損傷を受けた場合、その修理は乙(B)の責任とする。ただし、通常の使用による摩耗の場合の修理は甲(A)の責任とする。</p><p>6.2 乙(B)は車両のあらゆる損傷（衝突、横転、水没、盗難、火災またはその他の事故など）に対して全責任を負い、合意した車両価格の<span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span>を甲(A)に賠償するものとする。</p><p>6.3 乙(B)が車両を使用中に衝突、傷またはその他の損傷が生じた場合、甲(A)に通知しなければならず、乙(B)が情報を隠蔽し、甲(A)の同意なしに車両を修理することは許されない。</p></div>
      },`,
`      {
        title: "第6条：車両の損傷について",
        content: (contract: any) => <div className="space-y-2"><p>6.1 乙(B)の過失または過誤により賃貸車両が軽微または重大な損傷を受けた場合、その修理は乙(B)の責任とする。ただし、通常の使用による摩耗の場合の修理は甲(A)の責任とする。</p><p>6.2 乙(B)は車両のあらゆる損傷（衝突、横転、水没、盗難、火災またはその他の事故など）に対して全責任を負い、合意した車両価格の<span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span>を甲(A)に賠償するものとする。</p><p>6.3 乙(B)が車両を使用中に衝突、傷またはその他の損傷が生じた場合、甲(A)に通知しなければならず、乙(B)が情報を隠蔽し、甲(A)の同意なしに車両を修理することは許されない。</p><p>6.4 寿命に達した部品または通常の使用により損傷した部品のメンテナンスおよび交換は甲(A)の責任とする。</p></div>
      },`
);

// Korean
content = content.replace(
`      {
        title: "제6조: 차량 파손의 경우",
        content: (contract: any) => <div className="space-y-2"><p>6.1 을(B)의 부주의한 사용이나 과실로 인해 임대 차량이 경미하거나 심각하게 손상된 경우, 수리는 을(B)의 책임이다. 단, 정상적인 사용에 따른 마모로 인한 수리는 갑(A)의 책임이다.</p><p>6.2 을(B)은 차량의 모든 손상(충돌, 전복, 침수, 도난, 화재 또는 기타 사고 등)에 대해 전적인 책임을 지며, 합의된 차량 가격의 <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span>을 갑(A)에게 배상해야 한다.</p><p>6.3 을(B)이 차량 사용 중 충돌, 긁힘 또는 기타 손상이 발생한 경우, 갑(A)에게 통지해야 하며, 을(B)이 정보를 은폐하고 갑(A)의 동의 없이 임의로 수리하는 것은 허용되지 않는다.</p></div>
      },`,
`      {
        title: "제6조: 차량 파손의 경우",
        content: (contract: any) => <div className="space-y-2"><p>6.1 을(B)의 부주의한 사용이나 과실로 인해 임대 차량이 경미하거나 심각하게 손상된 경우, 수리는 을(B)의 책임이다. 단, 정상적인 사용에 따른 마모로 인한 수리는 갑(A)의 책임이다.</p><p>6.2 을(B)은 차량의 모든 손상(충돌, 전복, 침수, 도난, 화재 또는 기타 사고 등)에 대해 전적인 책임을 지며, 합의된 차량 가격의 <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span>을 갑(A)에게 배상해야 한다.</p><p>6.3 을(B)이 차량 사용 중 충돌, 긁힘 또는 기타 손상이 발생한 경우, 갑(A)에게 통지해야 하며, 을(B)이 정보를 은폐하고 갑(A)의 동의 없이 임의로 수리하는 것은 허용되지 않는다.</p><p>6.4 수명이 다하거나 정상적인 사용으로 인해 손상된 부품의 유지보수 및 교체는 갑(A)의 책임이다.</p></div>
      },`
);

// Russian
content = content.replace(
`      {
        title: "Статья 6: Повреждение транспортного средства",
        content: (contract: any) => <div className="space-y-2"><p>6.1 В случае если арендованное транспортное средство получит незначительные или серьезные повреждения в результате небрежного использования или по вине Стороны (B), ответственность за ремонт несет Сторона (B), за исключением случаев износа в результате нормального использования, при которых ответственность за ремонт несет Сторона (A).</p><p>6.2 Сторона (B) несет полную ответственность за любые повреждения транспортного средства (такие как столкновение, опрокидывание, падение в воду, кража, пожар или другие несчастные случаи) и обязуется выплатить Стороне (A) согласованную компенсацию в размере <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> от стоимости транспортного средства.</p><p>6.3 В случае если Сторона (B) при использовании транспортного средства допустит столкновения, царапины или другие повреждения, она обязана уведомить об этом Сторону (A), при этом Стороне (B) не разрешается скрывать информацию и осуществлять ремонт транспортного средства без согласия Стороны (A).</p></div>
      },`,
`      {
        title: "Статья 6: Повреждение транспортного средства",
        content: (contract: any) => <div className="space-y-2"><p>6.1 В случае если арендованное транспортное средство получит незначительные или серьезные повреждения в результате небрежного использования или по вине Стороны (B), ответственность за ремонт несет Сторона (B), за исключением случаев износа в результате нормального использования, при которых ответственность за ремонт несет Сторона (A).</p><p>6.2 Сторона (B) несет полную ответственность за любые повреждения транспортного средства (такие как столкновение, опрокидывание, падение в воду, кража, пожар или другие несчастные случаи) и обязуется выплатить Стороне (A) согласованную компенсацию в размере <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> от стоимости транспортного средства.</p><p>6.3 В случае если Сторона (B) при использовании транспортного средства допустит столкновения, царапины или другие повреждения, она обязана уведомить об этом Сторону (A), при этом Стороне (B) не разрешается скрывать информацию и осуществлять ремонт транспортного средства без согласия Стороны (A).</p><p>6.4 Обслуживание и замена деталей, срок службы которых истек или которые повреждены в результате нормального использования, является обязанностью Стороны (A).</p></div>
      },`
);

fs.writeFileSync('src/translations.tsx', content);
