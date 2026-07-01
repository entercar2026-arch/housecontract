const fs = require('fs');
let code = fs.readFileSync('src/components/ContractPreview.tsx', 'utf8');

code = code.replace(
  /const getKhmerTranslation = [\s\S]*?const getEnglishTranslation/g,
  `const getKhmerTranslation = (val: string | undefined, type: 'gender' | 'nationality') => {
    if (!val) return '.....';
    
    // Check if it contains both languages separated by slash
    let khmerPart = val;
    if (val.includes('/')) {
      const parts = val.split('/');
      // Find the part that contains Khmer characters (Unicode range \u1780-\u17FF)
      const kh = parts.find(p => /[\u1780-\u17FF]/.test(p));
      if (kh) {
        khmerPart = kh.trim();
      } else {
        khmerPart = parts[0].trim();
      }
    }
    
    const lowerVal = khmerPart.toLowerCase().trim();
    if (type === 'gender') {
      if (lowerVal === 'male' || lowerVal === 'ប្រុស') return 'ប្រុស';
      if (lowerVal === 'female' || lowerVal === 'ស្រី') return 'ស្រី';
      return khmerPart;
    }
    if (type === 'nationality') {
      if (lowerVal === 'cambodian' || lowerVal === 'ខ្មែរ') return 'ខ្មែរ';
      if (lowerVal === 'foreigner' || lowerVal === 'បរទេស') return 'បរទេស';
      if (lowerVal === 'chinese' || lowerVal === 'ចិន') return 'ចិន';
      if (lowerVal === 'vietnamese' || lowerVal === 'វៀតណាម') return 'វៀតណាម';
      if (lowerVal === 'thai' || lowerVal === 'ថៃ') return 'ថៃ';
      if (lowerVal === 'korean' || lowerVal === 'កូរ៉េ') return 'កូរ៉េ';
      if (lowerVal === 'japanese' || lowerVal === 'ជប៉ុន') return 'ជប៉ុន';
      if (lowerVal === 'american' || lowerVal === 'អាមេរិក') return 'អាមេរិក';
      if (lowerVal === 'british' || lowerVal === 'អង់គ្លេស') return 'អង់គ្លេស';
      if (lowerVal === 'french' || lowerVal === 'បារាំង') return 'បារាំង';
      if (lowerVal === 'australian' || lowerVal === 'អូស្ត្រាលី') return 'អូស្ត្រាលី';
      return khmerPart;
    }
    return khmerPart;
  };

  const getEnglishTranslation`
);

fs.writeFileSync('src/components/ContractPreview.tsx', code);
