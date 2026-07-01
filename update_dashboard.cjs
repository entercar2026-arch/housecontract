const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Replace normalize functions to return English only
code = code.replace(
  /const normalizeGender = [\s\S]*?const normalizeNationality =/s,
  `const normalizeGender = (val: string) => {
    if (!val) return '';
    const v = val.toLowerCase();
    if (v.includes('female') || v.includes('ស្រី')) return 'Female';
    if (v.includes('male') || v.includes('ប្រុស')) return 'Male';
    return val;
  };

  const normalizeNationality =`
);

code = code.replace(
  /const normalizeNationality = [\s\S]*?const updateLandlord/s,
  `const normalizeNationality = (val: string) => {
    if (!val) return '';
    const v = val.toLowerCase();
    if (v.includes('cambodian') || v.includes('ខ្មែរ')) return 'Cambodian';
    if (v.includes('foreigner') || v.includes('បរទេស')) return 'Foreigner';
    if (v.includes('chinese') || v.includes('ចិន')) return 'Chinese';
    if (v.includes('vietnamese') || v.includes('វៀតណាម')) return 'Vietnamese';
    if (v.includes('thai') || v.includes('ថៃ')) return 'Thai';
    if (v.includes('korean') || v.includes('កូរ៉េ')) return 'Korean';
    if (v.includes('japanese') || v.includes('ជប៉ុន')) return 'Japanese';
    if (v.includes('american') || v.includes('អាមេរិក')) return 'American';
    if (v.includes('british') || v.includes('អង់គ្លេស')) return 'British';
    if (v.includes('french') || v.includes('បារាំង')) return 'French';
    if (v.includes('australian') || v.includes('អូស្ត្រាលី')) return 'Australian';
    return val;
  };
  
  const updateLandlord`
);

// General replacements for Khmer text
const replacements = [
  ['General Settings | ការកំណត់ទូទៅ', 'General Settings'],
  ['Number of Tenants | ចំនួនអ្នកជួល', 'Number of Tenants'],
  ['នាក់ (Person)', 'Person'],
  ['នាក់ (People)', 'People'],
  ['Landlord Details | ភាគីម្ចាស់ផ្ទះ', 'Landlord Details'],
  ['Full Name KH | ឈ្មោះជាភាសាខ្មែរ', 'Full Name (KH)'],
  ['Full Name EN | ឈ្មោះជាភាសាអង់គ្លេស', 'Full Name (EN)'],
  ['Gender | ភេទ', 'Gender'],
  ['ជ្រើសរើស / Select', 'Select'],
  ['ប្រុស / Male', 'Male'],
  ['ស្រី / Female', 'Female'],
  ['DOB | ថ្ងៃខែឆ្នាំកំណើត', 'Date of Birth'],
  ['Nationality | សញ្ជាតិ', 'Nationality'],
  ['ខ្មែរ / Cambodian', 'Cambodian'],
  ['បរទេស / Foreigner', 'Foreigner'],
  ['ចិន / Chinese', 'Chinese'],
  ['វៀតណាម / Vietnamese', 'Vietnamese'],
  ['ថៃ / Thai', 'Thai'],
  ['កូរ៉េ / Korean', 'Korean'],
  ['ជប៉ុន / Japanese', 'Japanese'],
  ['អាមេរិក / American', 'American'],
  ['អង់គ្លេស / British', 'British'],
  ['បារាំង / French', 'French'],
  ['អូស្ត្រាលី / Australian', 'Australian'],
  ['ID Number | លេខអត្តសញ្ញាណ', 'ID Number'],
  ['Address | អាស័យដ្ឋានស្នាក់នៅ', 'Address'],
  ['Tenant Details | ភាគីអ្នកជួល', 'Tenant Details'],
  ['Contract Terms | លក្ខខណ្ឌកិច្ចសន្យា', 'Contract Terms'],
  ['House Address | ទីតាំងផ្ទះជួល', 'House Address'],
  ['Rent Amount | តម្លៃជួល (USD)', 'Rent Amount (USD)'],
  ['Deposit Months | ប្រាក់កក់ប៉ុន្មានខែ', 'Deposit Months'],
  ['Deposit Amount | ទំហំប្រាក់កក់សរុប', 'Deposit Amount'],
  ['Start Date | ថ្ងៃចូលនៅ', 'Start Date'],
  ['Duration Months | រយៈពេលជួល (ខែ)', 'Duration (Months)'],
  ['Water Utility | ថ្លៃទឹក', 'Water Utility'],
  ['Electricity Utility | ថ្លៃភ្លើង', 'Electricity Utility'],
  ['Cable TV | ខ្សែកាប', 'Cable TV'],
  ['Internet | អ៊ីនធឺណិត', 'Internet'],
  ['Contract Date | ថ្ងៃធ្វើកិច្ចសន្យា', 'Contract Date'],
];

for (const [kh, en] of replacements) {
  code = code.split(kh).join(en);
}

fs.writeFileSync('src/components/Dashboard.tsx', code);
