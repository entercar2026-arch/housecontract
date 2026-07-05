const fs = require('fs');
let code = fs.readFileSync('src/components/ContractPreview.tsx', 'utf8');

// I will just replace the nationalityMap block directly.
const target = `const nationalityMap: Record<string, string> = {
        'cambodian': 'ខ្មែរ', 'ខ្មែរ': 'ខ្មែរ', 'cambodia': 'ខ្មែរ',
        'foreigner': 'បរទេស', 'បរទេស': 'បរទេស',
        'chinese': 'ចិន', 'ចិន': 'ចិន', 'china': 'ចិន',
        'vietnamese': 'វៀតណាម', 'វៀតណាម': 'វៀតណាម', 'vietnam': 'វៀតណាម',
        'thai': 'ថៃ', 'ថៃ': 'ថៃ', 'thailand': 'ថៃ',
        'korean': 'កូរ៉េ', 'កូរ៉េ': 'កូរ៉េ', 'korea': 'កូរ៉េ', 'south korean': 'កូរ៉េ', 'south korea': 'កូរ៉េ',
        'japanese': 'ជប៉ុន', 'ជប៉ុន': 'ជប៉ុន', 'japan': 'ជប៉ុន',
        'american': 'អាមេរិក', 'អាមេរិក': 'អាមេរិក', 'usa': 'អាមេរិក', 'united states': 'អាមេរិក', 'us': 'អាមេរិក',
        'british': 'អង់គ្លេស', 'អង់គ្លេស': 'អង់គ្លេស', 'uk': 'អង់គ្លេស', 'united kingdom': 'អង់គ្លេស',
        'french': 'បារាំង', 'បារាំង': 'បារាំង', 'france': 'បារាំង',`;

const replacement = `const nationalityMap: Record<string, string> = {
        'cambodian': 'ខ្មែរ', 'ខ្មែរ': 'ខ្មែរ', 'cambodia': 'ខ្មែរ',
        'foreigner': 'បរទេស', 'បរទេស': 'បរទេស',
        'chinese': 'ចិន', 'ចិន': 'ចិន', 'china': 'ចិន', 'chn': 'ចិន',
        'vietnamese': 'វៀតណាម', 'វៀតណាម': 'វៀតណាម', 'vietnam': 'វៀតណាម',
        'thai': 'ថៃ', 'ថៃ': 'ថៃ', 'thailand': 'ថៃ',
        'korean': 'កូរ៉េ', 'កូរ៉េ': 'កូរ៉េ', 'korea': 'កូរ៉េ', 'south korean': 'កូរ៉េ', 'south korea': 'កូរ៉េ',
        'japanese': 'ជប៉ុន', 'ជប៉ុន': 'ជប៉ុន', 'japan': 'ជប៉ុន',
        'american': 'អាមេរិក', 'អាមេរិក': 'អាមេរិក', 'usa': 'អាមេរិក', 'united states': 'អាមេរិក', 'us': 'អាមេរិក',
        'british': 'អង់គ្លេស', 'អង់គ្លេស': 'អង់គ្លេស', 'uk': 'អង់គ្លេស', 'united kingdom': 'អង់គ្លេស',
        'french': 'បារាំង', 'បារាំង': 'បារាំង', 'france': 'បារាំង',`;

code = code.replace(target, replacement);

const targetEn = `const nationalityMap: Record<string, string> = {
        'cambodian': 'Cambodian', 'ខ្មែរ': 'Cambodian', 'cambodia': 'Cambodian',
        'foreigner': 'Foreigner', 'បរទេស': 'Foreigner',
        'chinese': 'Chinese', 'ចិន': 'Chinese', 'china': 'Chinese',
        'vietnamese': 'Vietnamese', 'វៀតណាម': 'Vietnamese', 'vietnam': 'Vietnamese',
        'thai': 'Thai', 'ថៃ': 'Thai', 'thailand': 'Thai',
        'korean': 'Korean', 'កូរ៉េ': 'Korean', 'korea': 'Korean', 'south korean': 'Korean', 'south korea': 'Korean',
        'japanese': 'Japanese', 'ជប៉ុន': 'Japanese', 'japan': 'Japanese',
        'american': 'American', 'អាមេរិក': 'American', 'usa': 'American', 'united states': 'American', 'us': 'American',
        'british': 'British', 'អង់គ្លេស': 'British', 'uk': 'British', 'united kingdom': 'British',
        'french': 'French', 'បារាំង': 'French', 'france': 'French',`;

const replacementEn = `const nationalityMap: Record<string, string> = {
        'cambodian': 'Cambodian', 'ខ្មែរ': 'Cambodian', 'cambodia': 'Cambodian',
        'foreigner': 'Foreigner', 'បរទេស': 'Foreigner',
        'chinese': 'Chinese', 'ចិន': 'Chinese', 'china': 'Chinese', 'chn': 'Chinese',
        'vietnamese': 'Vietnamese', 'វៀតណាម': 'Vietnamese', 'vietnam': 'Vietnamese',
        'thai': 'Thai', 'ថៃ': 'Thai', 'thailand': 'Thai',
        'korean': 'Korean', 'កូរ៉េ': 'Korean', 'korea': 'Korean', 'south korean': 'Korean', 'south korea': 'Korean',
        'japanese': 'Japanese', 'ជប៉ុន': 'Japanese', 'japan': 'Japanese',
        'american': 'American', 'អាមេរិក': 'American', 'usa': 'American', 'united states': 'American', 'us': 'American',
        'british': 'British', 'អង់គ្លេស': 'British', 'uk': 'British', 'united kingdom': 'British',
        'french': 'French', 'បារាំង': 'French', 'france': 'French',`;

code = code.replace(targetEn, replacementEn);

// Also let's handle "Chinese" being passed as "chinese " and not being mapped if there's a space or symbol.
code = code.replace(
  'const lowerVal = khmerPart.toLowerCase().trim();',
  'const lowerVal = khmerPart.toLowerCase().replace(/[^a-z0-9\u1780-\u17FF]/g, "").trim();'
);
code = code.replace(
  'const lowerVal = englishPart.toLowerCase().trim();',
  'const lowerVal = englishPart.toLowerCase().replace(/[^a-z0-9\u1780-\u17FF]/g, "").trim();'
);

fs.writeFileSync('src/components/ContractPreview.tsx', code);
console.log("Patched nationality map in ContractPreview.tsx");
