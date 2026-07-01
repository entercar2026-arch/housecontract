const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Function to inject at the top of Dashboard
const normalizeGender = `  const normalizeGender = (val: string) => {
    if (!val) return '';
    const v = val.toLowerCase();
    if (v.includes('female') || v.includes('ស្រី')) return 'ស្រី / Female';
    if (v.includes('male') || v.includes('ប្រុស')) return 'ប្រុស / Male';
    return val;
  };

  const normalizeNationality = (val: string) => {
    if (!val) return '';
    const v = val.toLowerCase();
    if (v.includes('cambodian') || v.includes('ខ្មែរ')) return 'ខ្មែរ / Cambodian';
    if (v.includes('foreigner') || v.includes('បរទេស')) return 'បរទេស / Foreigner';
    if (v.includes('chinese') || v.includes('ចិន')) return 'ចិន / Chinese';
    if (v.includes('vietnamese') || v.includes('វៀតណាម')) return 'វៀតណាម / Vietnamese';
    if (v.includes('thai') || v.includes('ថៃ')) return 'ថៃ / Thai';
    if (v.includes('korean') || v.includes('កូរ៉េ')) return 'កូរ៉េ / Korean';
    if (v.includes('japanese') || v.includes('ជប៉ុន')) return 'ជប៉ុន / Japanese';
    if (v.includes('american') || v.includes('អាមេរិក')) return 'អាមេរិក / American';
    if (v.includes('british') || v.includes('អង់គ្លេស')) return 'អង់គ្លេស / British';
    if (v.includes('french') || v.includes('បារាំង')) return 'បារាំង / French';
    if (v.includes('australian') || v.includes('អូស្ត្រាលី')) return 'អូស្ត្រាលី / Australian';
    return val;
  };`;

code = code.replace(
  /export default function Dashboard.*?\n.*?(?=\n)/s,
  (match) => match + '\n\n' + normalizeGender
);

code = code.replace(/value=\{state.landlord.gender\}/g, 'value={normalizeGender(state.landlord.gender)}');
code = code.replace(/value=\{state.landlord.nationality\}/g, 'value={normalizeNationality(state.landlord.nationality)}');
code = code.replace(/value=\{tenant.gender\}/g, 'value={normalizeGender(tenant.gender)}');
code = code.replace(/value=\{tenant.nationality\}/g, 'value={normalizeNationality(tenant.nationality)}');

fs.writeFileSync('src/components/Dashboard.tsx', code);
