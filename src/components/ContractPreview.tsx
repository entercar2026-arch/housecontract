import React from 'react';
import { AppState } from '../types';

interface ContractPreviewProps {
  state: AppState;
}

export default function ContractPreview({ state }: ContractPreviewProps) {
  const { language, landlord, tenants, contract } = state;
  const isKh = language === 'km' || language === 'bilingual';
  const isEn = language === 'en' || language === 'bilingual';

  // Calculate end date naively for preview
  let endDate = '.......';
  if (contract.startDate && contract.durationMonths) {
    const parts = contract.startDate.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const start = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(start.getTime())) {
        start.setMonth(start.getMonth() + parseInt(contract.durationMonths));
        endDate = `${start.getDate().toString().padStart(2, '0')}/${(start.getMonth() + 1).toString().padStart(2, '0')}/${start.getFullYear()}`;
      }
    }
  }

  return (
    <div id="printable-contract" className="bg-white mx-auto shadow-2xl printable-a4 p-12 text-[12px] leading-[1.8] text-justify text-slate-900 font-battambang relative transform scale-[0.85] md:scale-90 xl:scale-100 origin-top flex flex-col" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="absolute inset-4 border border-slate-200 pointer-events-none"></div>
      
      {/* Header */}
      <div className="text-center space-y-1 mb-8">
        {isKh && <h2 className="text-xl font-moul text-slate-900">ព្រះរាជាណាចក្រកម្ពុជា</h2>}
        {isEn && <h2 className="text-md font-bold font-serif uppercase tracking-widest text-slate-900 mt-1">Kingdom of Cambodia</h2>}
        {isKh && <p className="text-sm font-bold mt-2">ជាតិ សាសនា ព្រះមហាក្សត្រ</p>}
        {isEn && <p className="text-xs font-serif font-bold tracking-widest mt-1">Nation Religion King</p>}
        
        <div className="w-24 border-b border-black mx-auto mt-2"></div>
      </div>
      <div className="text-center mb-8 relative">
        {isKh && <h1 className="text-2xl font-moul mb-2 text-slate-900">កិច្ចសន្យាជួលផ្ទះ</h1>}
        {isEn && <h1 className="text-lg font-bold uppercase tracking-widest font-serif text-slate-900">House Lease Agreement</h1>}
      </div>

      {/* Party A */}
      <div className="mb-6">
        {isKh && (
          <p className="mb-2">
            ម្ចាស់ផ្ទះ៖ <span className="font-bold">{landlord.nameKh || landlord.nameEn || '.........................'}</span> 
            {' '}ភេទ <span className="font-bold">{landlord.gender ? landlord.gender.split('/')[0].trim() : '.....'}</span> 
            {' '}ជនជាតិ <span className="font-bold">{landlord.nationality ? landlord.nationality.split('/')[0].trim() : '...........'}</span> 
            {' '}កើតថ្ងៃទី <span className="font-bold">{landlord.dob || '................'}</span>
            {landlord.showAddress && landlord.address && (
              <> មានអាស័យដ្ឋានបច្ចុប្បន្ននៅ <span className="font-bold">{landlord.address}</span></>
            )}
            {' '}កាន់អត្តសញ្ញាណប័ណ្ណ/លិខិតឆ្លងដែនលេខ <span className="font-bold">{landlord.idNumber || '.........................'}</span> 
            ជាម្ចាស់ស្របច្បាប់នៃ <span className="font-bold">{contract.houseAddress || '...................................................'}</span> ចាប់ពីនេះទៅហៅថា <strong>ភាគី(ក)</strong>។
          </p>
        )}
        {isEn && (
          <p className="mb-2">
            OWNER: <span className="font-bold">{landlord.nameEn || landlord.nameKh || '.........................'}</span> 
            {' '}Sex: <span className="font-bold">{landlord.gender ? (landlord.gender.split('/')[1] || landlord.gender).trim() : '.....'}</span>; 
            {' '}Nationality: <span className="font-bold">{landlord.nationality ? (landlord.nationality.split('/')[1] || landlord.nationality).trim() : '...........'}</span>; 
            {' '}Date of Birth: <span className="font-bold">{landlord.dob || '................'}</span>;
            {landlord.showAddress && landlord.address && (
              <> Having Present Address: <span className="font-bold">{landlord.address}</span>;</>
            )}
            {' '}Holding ID/Passport No: <span className="font-bold">{landlord.idNumber || '.........................'}</span> 
            Who is the legal and lawful owner of <span className="font-bold">{contract.houseAddress || '...................................................'}</span>; hereby referred to as <strong>Party (A)</strong>.
          </p>
        )}
      </div>

      {/* Transition */}
      <div className="text-center mb-6 mt-4">
        {isKh && <div className="text-sm font-bold">បានយល់ព្រមជួលបន្ទប់ទៅអោយ</div>}
        {isEn && <div className="font-bold font-serif uppercase tracking-wider text-xs mt-1">Agreed to rent a unit to</div>}
      </div>

      {/* Party B */}
      <div className="mb-8">
        {tenants.map((tenant, idx) => (
          <div key={idx} className="mb-4">
            {isKh && (
              <p className="mb-1">
                អ្នកជួល{tenants.length > 1 ? `ទី${idx + 1}` : ''}៖ <span className="font-bold">{tenant.nameKh || tenant.nameEn || '.........................'}</span> 
                {' '}ភេទ <span className="font-bold">{tenant.gender ? tenant.gender.split('/')[0].trim() : '.....'}</span> 
                {' '}ជនជាតិ <span className="font-bold">{tenant.nationality ? tenant.nationality.split('/')[0].trim() : '...........'}</span> 
                {' '}កើតថ្ងៃទី <span className="font-bold">{tenant.dob || '................'}</span>
                {' '}កាន់លិខិតឆ្លងដែន ឬអត្តសញ្ញាណប័ណ្ណលេខ <span className="font-bold">{tenant.idNumber || '.........................'}</span> 
                {idx === tenants.length - 1 ? ' ចាប់ពីនេះទៅហៅថា ភាគី(ខ)។' : '។'}
              </p>
            )}
            {isEn && (
              <p className="mb-1">
                LESSEE{tenants.length > 1 ? ` ${idx + 1}` : ''}: <span className="font-bold">{tenant.nameEn || tenant.nameKh || '.........................'}</span> 
                {' '}Sex: <span className="font-bold">{tenant.gender ? (tenant.gender.split('/')[1] || tenant.gender).trim() : '.....'}</span>; 
                {' '}Nationality: <span className="font-bold">{tenant.nationality ? (tenant.nationality.split('/')[1] || tenant.nationality).trim() : '...........'}</span>; 
                {' '}Date of Birth: <span className="font-bold">{tenant.dob || '................'}</span>;
                {' '}Holding Passport or ID No: <span className="font-bold">{tenant.idNumber || '.........................'}</span>
                {idx === tenants.length - 1 ? '; hereby referred to as Party (B).' : '.'}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Agreement Text */}
      <div className="mb-6 font-bold text-center">
        {isKh && <p className="mb-1">ភាគីទាំងពីរបានព្រមព្រៀងតាមគោលការណ៍ដូចខាងក្រោម៖</p>}
        {isEn && <p>Both Parties agree with the following respects:</p>}
      </div>

      {/* Terms */}
      <div className="space-y-6">
        
        {/* Term 1: Lease Period */}
        <div>
          {isKh && <h3 className="font-bold mb-1">ប្រការ ១: រយៈពេលនៃការជួល</h3>}
          {isEn && <h3 className="font-bold mb-1 uppercase text-xs">RESPECT 1: LEASE PERIOD</h3>}
          {isKh && (
            <p className="mb-1">
              រយៈពេលនៃការជួលគឺមានចំនួន <span className="font-bold">{contract.durationMonths || '.....'}</span> ខែ គិតចាប់ពីថ្ងៃទី <span className="font-bold">{contract.startDate || '................'}</span> រហូតដល់ថ្ងៃទី <span className="font-bold">{endDate}</span>។ ថ្លៃឈ្នួលផ្ទះគឺ <span className="font-bold">{contract.rentAmount || '.....'}</span> ដុល្លារ ក្នុងមួយខែ។
            </p>
          )}
          {isEn && (
            <p>
              Duration of the lease will be for the period of <span className="font-bold">{contract.durationMonths || '.....'}</span> months commencing from <span className="font-bold">{contract.startDate || '................'}</span> to <span className="font-bold">{endDate}</span>. The total amount of the rent is <span className="font-bold">{contract.rentAmount || '.....'}</span> Dollars per month.
            </p>
          )}
        </div>

        {/* Term 2: Payment */}
        <div>
          {isKh && <h3 className="font-bold mb-1">ប្រការ ២: ការទូទាត់</h3>}
          {isEn && <h3 className="font-bold mb-1 uppercase text-xs">RESPECT 2: PAYMENT</h3>}
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isKh && <>ភាគី(ខ)នឹងកក់ប្រាក់ជូនភាគី(ក) ចំនួន <span className="font-bold">{contract.depositMonths || '.....'}</span> ខែ ដែលមានចំនួន <span className="font-bold">{contract.depositAmount || '.....'}</span> ដុល្លារ សម្រាប់តម្កល់ធ្វើជាប្រាក់កក់នៃការជួល។</>}
              {isEn && <>Party (B) will pay to Party (A) as deposit of <span className="font-bold">{contract.depositMonths || '.....'}</span> month(s) which is equivalent of <span className="font-bold">{contract.depositAmount || '.....'}</span> Dollars at the time of signing this agreement.</>}
            </li>
            <li>
              {isKh && <>នៅពេលកិច្ចសន្យានេះត្រូវបានបញ្ចប់ ប្រសិនបើមិនមានការបាត់បង់សម្ភារៈ ក្នុងផ្ទះទេ (លើកលែងការសឹករិចរឹល ឬការបែកបាក់ធម្មតា) ភាគី(ក) ត្រូវសងប្រាក់កក់ជូន ភាគី(ខ) វិញអោយបានគ្រប់ចំនួន។</>}
              {isEn && <>When the contract is expired, Party (A) should return the deposit money fully to Party (B), in case there is no damage related to the house facilities (equipment), right after hand over house at any reason.</>}
            </li>
            <li>
              {isKh && <>ភាគី(ខ) នឹងបង់ជូន ភាគី(ក) នូវប្រាក់ឈ្នួលផ្ទះជារៀងរាល់ខែនៅថ្ងៃទី <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> នៃខែនីមួយៗ។</>}
              {isEn && <>Party (B) will pay to Party (A) for monthly rental fee in advance on day <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> of every month.</>}
            </li>
          </ul>
        </div>

        {/* Term 3: Tax */}
        <div>
          {isKh && <h3 className="font-bold mb-1">ប្រការ ៣: ពន្ធ</h3>}
          {isEn && <h3 className="font-bold mb-1 uppercase text-xs">RESPECT 3: TAX</h3>}
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isKh && <>ភាគី(ក) ត្រូវទូទាត់នូវការចំណាយលើពន្ធអចលនទ្រព្យប្រចាំឆ្នាំ ស្របតាមច្បាប់ជាធរមាន។</>}
              {isEn && <>Party (A) must clarify the payment of annual property tax of the real estate, under the current provisions of law.</>}
            </li>
          </ul>
        </div>

        {/* Term 4: Terminations */}
        <div>
          {isKh && <h3 className="font-bold mb-1">ប្រការ ៤: ការបញ្ចប់កិច្ចសន្យា</h3>}
          {isEn && <h3 className="font-bold mb-1 uppercase text-xs">RESPECT 4: TERMINATIONS</h3>}
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isKh && <>កិច្ចសន្យានេះ នឹងត្រូវបញ្ចប់ដោយស្វ័យប្រវត្តិនៅថ្ងៃទី <span className="font-bold">{endDate}</span>។</>}
              {isEn && <>The contract will be automatically ended in <span className="font-bold">{endDate}</span>.</>}
            </li>
            <li>
              {isKh && <>ប្រសិនបើ ភាគី(ខ) ចង់បញ្ចប់កិច្ចសន្យានេះមុនពេលកំណត់ ភាគី(ក) នឹងមិនតម្រូវអោយប្រគល់ប្រាក់កក់ខាងលើវិញឡើយ។</>}
              {isEn && <>If Party (B) wants to move before end of this contract Party (A) will not return the above deposit.</>}
            </li>
            <li>
              {isKh && <>ប្រសិនបើភាគី(ក) ចង់បញ្ចប់កិច្ចសន្យានេះមុនពេលកំណត់ ភាគី(ក) នឹងតម្រូវអោយជូនដំណឹងជាមុនយ៉ាងតិច ៣០ថ្ងៃ និងសងនូវប្រាក់កក់ <span className="font-bold">{contract.depositMonths || '.....'}</span> ខែ ជូន ភាគី(ខ) វិញ។</>}
              {isEn && <>If Party (A) terminates earlier, Party (A) will be required to inform in advance 30 days and pay back the deposit <span className="font-bold">{contract.depositMonths || '.....'}</span> month(s) to Party (B).</>}
            </li>
            <li>
              {isKh && <>ក្នុងករណីដែល ភាគី(ខ) មិនបានគោរពកិច្ចសន្យា ឬប្រព្រឹត្តខុសលក្ខខណ្ឌផ្ទុយពីច្បាប់នៃរដ្ឋាភិបាលកម្ពុជា ឬបង្កការរំខានដល់អ្នកជិតខាង ឬមិនបង់ប្រាក់ឈ្នួលប្រចាំខែលើសពី ៧ថ្ងៃ ភាគី(ក) មានសិទ្ធិបញ្ចប់កិច្ចសន្យាជាមួយ ភាគី(ខ) ដោយគ្មានលក្ខខណ្ឌ។</>}
              {isEn && <>In case Party (B) is not followed the contract or acting opposite to the Cambodian government law or disturb neighbors, or paying monthly fee more than 7 days late, Party (A) has a full right to terminate Party (B) without any condition.</>}
            </li>
          </ul>
        </div>

        {/* Term 5: Utilities */}
        <div>
          {isKh && <h3 className="font-bold mb-1">ប្រការ ៥: ប្រព័ន្ធទឹក ភ្លើង និងសេវាផ្សេងៗ</h3>}
          {isEn && <h3 className="font-bold mb-1 uppercase text-xs">RESPECT 5: UTILITIES SYSTEM</h3>}
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isKh && <>មុនពេលភាគី(ខ) ចូលស្នាក់នៅ ភាគី(ក) ត្រូវរៀបចំនូវប្រព័ន្ធទឹក ភ្លើង អោយបានសមស្របដើម្បីប្រើប្រាស់។</>}
              {isEn && <>Before Party (B) check in, Party (A) will provide the electrical and water system, having good conditions to use.</>}
            </li>
            <li>
              {isKh && <>ភាគី(ក) បានយល់ព្រមផ្តល់តម្លៃសេវាផ្សេងៗដល់ភាគី(ខ) ដូចខាងក្រោម៖</>}
              {isEn && <>Party (A) agrees with Party (B) to provides another service charge as following:</>}
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  {isKh ? '- ទឹក / Water' : '- Water'}: <span className="font-bold">{contract.waterUtility || '....................'}</span>
                </div>
                <div>
                  {isKh ? '- ខ្សែកាប / Cable TV' : '- Cable TV'}: <span className="font-bold">{contract.cableTvUtility || '....................'}</span>
                </div>
                <div>
                  {isKh ? '- ភ្លើង / Electricity' : '- Electricity'}: <span className="font-bold">{contract.electricityUtility || '....................'}</span>
                </div>
                <div>
                  {isKh ? '- អ៊ីនធឺណិត / Internet' : '- Internet'}: <span className="font-bold">{contract.internetUtility || '....................'}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Term 6: Other Conditions */}
        <div>
          {isKh && <h3 className="font-bold mb-1">ប្រការ ៦: លក្ខខណ្ឌផ្សេងៗ</h3>}
          {isEn && <h3 className="font-bold mb-1 uppercase text-xs">RESPECT 6: OTHER CONDITIONS</h3>}
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isKh && <>ប្រសិនបើ ភាគី(ខ) ចង់ធ្វើការផ្លាស់ប្តូរទ្រង់ទ្រាយផ្ទះ ភាគី(ខ) ត្រូវសុំការអនុញ្ញាតពីភាគី(ក) ជាមុនសិន។</>}
              {isEn && <>Changes the structure of the house or any decoration, Party (B) needs to consult for approval by Party (A), otherwise Party (B) has no right to do it.</>}
            </li>
            <li>
              {isKh && <>ការជួសជុលផ្ទះដែលបណ្តាលមកពីគ្រោះថ្នាក់ធម្មជាតិ (ខ្យល់ព្យុះ។ល។) គឺជាបន្ទុករបស់ ភាគី(ក)។</>}
              {isEn && <>The repairing of the house caused by natural calamity (disaster, Etc.) will be responsible by Party (A).</>}
            </li>
            <li>
              {isKh && <>ផ្ទះនេះ នឹងត្រូវបានប្រើប្រាស់សម្រាប់ ការស្នាក់នៅ។</>}
              {isEn && <>The house will be used for Residence.</>}
            </li>
            <li>
              {isKh && <>ក្នុងកំឡុងពេលជួល ប្រសិនបើ ភាគី(ខ) ប្រព្រឹត្តនូវសកម្មភាពខុសច្បាប់ ភាគី(ខ) នឹងត្រូវទទួលខុសត្រូវចំពោះមុខច្បាប់នៃព្រះរាជាណាចក្រកម្ពុជា។</>}
              {isEn && <>During the lease, if Party (B) commits any illegal activities against to the law, Party (B) must be responsible to the Law in Cambodia.</>}
            </li>
            <li>
              {isKh && <>ភាគី(ខ) ពុំមានសិទ្ធិជួលផ្ទះបន្តទៅភាគីទី៣ ដោយគ្មានការអនុញ្ញាតពីភាគី(ក) ឡើយ។</>}
              {isEn && <>Party (B) has no right to rent to 3rd party without Party (A) permission.</>}
            </li>
          </ul>
        </div>

        {/* Term 7: Renewal */}
        <div>
          {isKh && <h3 className="font-bold mb-1">ប្រការ ៧: ការបន្តកិច្ចសន្យា</h3>}
          {isEn && <h3 className="font-bold mb-1 uppercase text-xs">RESPECT 7: AGREEMENT RENEWAL</h3>}
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isKh && <>ការបន្តកិច្ចសន្យា ភាគី(ខ) ត្រូវជូនដំណឹងមក ភាគី(ក) យ៉ាងហោចណាស់ ០១ខែមុនថ្ងៃផុតកំណត់នៃកិច្ចសន្យា។</>}
              {isEn && <>Party (B) must give a notice to Party (A) at lease 1 month before agreement is expired. The New Agreement will be made by the discussion of Party (A) and (B).</>}
            </li>
          </ul>
        </div>

        {/* Term 8: Furniture */}
        <div>
          {isKh && <h3 className="font-bold mb-1">ប្រការ ៨: គ្រឿងសង្ហារឹម</h3>}
          {isEn && <h3 className="font-bold mb-1 uppercase text-xs">RESPECT 8: FURNITURE</h3>}
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isKh && <>នៅចុងកាលបរិច្ឆេទ នៃកិច្ចសន្យា ភាគី(ខ) នឹងប្រគល់រាល់បរិក្ខារ និងគ្រឿងសង្ហារឹម ក្នុងលក្ខខណ្ឌល្អ (លើកលែងការបែកបាក់ ឬខូចខាតធម្មតា) ជូន ភាគី(ក)។</>}
              {isEn && <>At the termination of the lease agreement, Party (B) will return all equipment and furniture in good condition, except normal wear and tear, to Party (A).</>}
            </li>
          </ul>
        </div>

        {/* Term 9: Right to Enter */}
        <div>
          {isKh && <h3 className="font-bold mb-1">ប្រការ ៩: សិទ្ធិក្នុងការចេញចូល</h3>}
          {isEn && <h3 className="font-bold mb-1 uppercase text-xs">RESPECT 9: RIGHT TO ENTER</h3>}
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isKh && <>ភាគី(ក) មានសិទ្ធិក្នុងការចេញចូលក្នុងបរិវេណផ្ទះក្នុងកំឡុងពេលជួល ដើម្បីពិនិត្យមើលផ្ទះ ដោយត្រូវសុំការអនុញ្ញាត ភាគី(ខ) ជាមុនសិន យ៉ាងតិច២៤ម៉ោង។</>}
              {isEn && <>Party (A) has the right to enter into the house during the period of the lease agreement to inspect the house by asking permission from Party (B) in advance 24 hours.</>}
            </li>
          </ul>
        </div>

        {/* Term 10: Validation */}
        <div>
          {isKh && <h3 className="font-bold mb-1">ប្រការ ១០: សុពលភាព</h3>}
          {isEn && <h3 className="font-bold mb-1 uppercase text-xs">RESPECT 10: VALIDATION</h3>}
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isKh && <>ភាគីទាំងពីរសូមធានាអនុវត្តតាមលក្ខខណ្ឌ ដូចបានចែងក្នុងប្រការទាំងអស់នៃកិច្ចសន្យានេះ។ ភាគីណាដែលបំពានកិច្ចព្រមព្រៀងនេះ ភាគីនោះនឹងត្រូវទទួលខុសត្រូវចំពោះមុខច្បាប់។</>}
              {isEn && <>Both parties must abide by the conditions of this agreement in all respects, if any party break the contract, that party shall be responsible in front of the law.</>}
            </li>
            <li>
              {isKh && <>កិច្ចសន្យានេះត្រូវបានធ្វើឡើងជាភាសាខ្មែរ និងអង់គ្លេស ដែលមានតម្លៃស្មើគ្នា។ កិច្ចព្រមព្រៀងនេះមានប្រសិទ្ធភាពចាប់ពីថ្ងៃដែលភាគីទាំងពីរចុះហត្ថលេខា ឬផ្តិតមេដៃនេះតទៅ។</>}
              {isEn && <>This lease agreement has been made in Khmer and English. These Copies have equal meaning and equal legal validity. This contract is effective from the date, after signing agreement between the two parties.</>}
            </li>
          </ul>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-auto pt-8 flex-shrink-0">
        <p className="text-right mb-8">
          {isKh ? 'ធ្វើនៅ..................., ថ្ងៃទី........ខែ........ឆ្នាំ២០២....' : 'Date..........................................'}
          <br/>
          {contract.contractDate && (
             <span className="font-bold pr-10">{contract.contractDate}</span>
          )}
        </p>

        <div className="mt-8 flex justify-between px-10 text-[10px] italic font-bold">
          <div className="text-center">
            <p>{isKh ? 'ភាគី(ក) / LANDLORD' : 'LANDLORD'}</p>
            <div className="mt-12 w-32 border-b border-slate-400 mx-auto"></div>
            <p className="font-bold mt-2 not-italic">{landlord.nameKh || landlord.nameEn}</p>
          </div>
          <div className="text-center">
            <p>{isKh ? 'សាក្សី / WITNESS' : 'WITNESS'}</p>
            <div className="mt-12 w-32 border-b border-slate-400 mx-auto"></div>
          </div>
          <div className="text-center">
            <p>{isKh ? 'ភាគី(ខ) / TENANT' : 'TENANT'}</p>
            <div className="mt-12 w-32 border-b border-slate-400 mx-auto"></div>
            <p className="font-bold mt-2 not-italic">{tenants.map(t => t.nameKh || t.nameEn).join(', ')}</p>
          </div>
        </div>

        <div className="mt-10 text-[8px] text-slate-400 border-t border-slate-200 pt-2 text-right tracking-widest uppercase">
          SYSTEM GENERATED DOCUMENT - PAGE 1/1
        </div>
      </div>

    </div>
  );
}
