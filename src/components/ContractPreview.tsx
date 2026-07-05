import React from 'react';
import { translations } from '../translations';
import { AppState } from '../types';

interface ContractPreviewProps {
  state: AppState;
}

export default function ContractPreview({ state }: ContractPreviewProps) {
  const { language, landlord, contract } = state;
  const activeTenantsRaw = state.tenants.filter(t => 
    (t.nameKh || '').toString().trim() !== '' || 
    (t.nameEn || '').toString().trim() !== '' || 
    (t.idNumber || '').toString().trim() !== ''
  );
  const activeTenants = state.contractType === 'car' ? activeTenantsRaw.slice(0, 1) : activeTenantsRaw;
  const tenants = activeTenants.length > 0 ? activeTenants : [state.tenants[0]]; // Always show at least 1
  
  const contractType = state.contractType || 'house';
  const isKh = language === 'km' || language === 'bilingual' || language.startsWith('km-');
  const isOther = language === 'en' || language === 'bilingual' || language.startsWith('km-');
  const isBilingual = language === 'bilingual' || language.startsWith('km-');

  const otherLang = language === 'km-zh' ? 'zh' : language === 'km-ja' ? 'ja' : language === 'km-ko' ? 'ko' : language === 'km-ru' ? 'ru' : 'en';
  const tData = translations[otherLang];

  const t = (km: string, fallbackKey: keyof typeof tData) => {
    if (language === 'km') return km;
    const otherText = tData[fallbackKey] as string;
    if (language === 'en') return otherText;
    return `${km} / ${otherText}`;
  };

  const BilingualRow = ({ kh, en, className = 'mb-4' }: { kh: React.ReactNode, en: React.ReactNode, className?: string }) => {
    if (isBilingual) {
      return (
        <div className={`grid grid-cols-2 gap-8 ${className}`}>
          <div>{kh}</div>
          <div>{en}</div>
        </div>
      );
    }
    return (
      <div className={className}>
        {isKh && <div className={isOther ? "mb-2" : ""}>{kh}</div>}
        {isOther && <div>{en}</div>}
      </div>
    );
  };

  const TermRow = ({ khTitle, termIndex, khContent }: { khTitle: string, termIndex: number, khContent: React.ReactNode }) => {
    const term = contractType === 'car' ? tData.carTerms[termIndex] : tData.terms[termIndex];
    return (
      <BilingualRow
        kh={
          <div className="[&>p:first-child]:inline [&>div>p:first-child]:inline">
            <span className="font-bold mr-2">{khTitle}</span>
            {khContent}
          </div>
        }
        en={
          <div className="[&>p:first-child]:inline [&>div>p:first-child]:inline">
            <span className="font-bold uppercase text-xs mr-2">{term.title}</span>
            {term.content(contract, endDate)}
          </div>
        }
      />
    );
  };

  // Calculate end date naively for preview
  let endDate = '.......';
  if (contract.startDate && contract.durationMonths) {
    const parts = contract.startDate.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const start = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(start.getTime())) {
        start.setMonth(start.getMonth() + parseInt(contract.durationMonths));
        start.setDate(start.getDate() - 1);
        endDate = `${start.getDate().toString().padStart(2, '0')}/${(start.getMonth() + 1).toString().padStart(2, '0')}/${start.getFullYear()}`;
      }
    }
  }

  const getKhmerTranslation = (val: any, type: 'gender' | 'nationality') => {
    if (!val || typeof val !== 'string') return '.....';
    
    let khmerPart = val;
    if (val.includes('/')) {
      const parts = val.split('/');
      const kh = parts.find(p => /[\u1780-\u17FF]/.test(p));
      if (kh) {
        khmerPart = kh.trim();
      } else {
        khmerPart = parts[0].trim();
      }
    }
    
    const lowerVal = khmerPart.toLowerCase().replace(/[^a-z0-9ក-៿]/g, "").trim();
    if (type === 'gender') {
      if (lowerVal === 'male' || lowerVal === 'ប្រុស' || lowerVal === 'm') return 'ប្រុស';
      if (lowerVal === 'female' || lowerVal === 'ស្រី' || lowerVal === 'f') return 'ស្រី';
      return khmerPart;
    }
    if (type === 'nationality') {
      const nationalityMap: Record<string, string> = {
        'cambodian': 'ខ្មែរ', 'ខ្មែរ': 'ខ្មែរ', 'cambodia': 'ខ្មែរ',
        'foreigner': 'បរទេស', 'បរទេស': 'បរទេស',
        'chinese': 'ចិន', 'ចិន': 'ចិន', 'china': 'ចិន', 'chn': 'ចិន',
        'vietnamese': 'វៀតណាម', 'វៀតណាម': 'វៀតណាម', 'vietnam': 'វៀតណាម',
        'thai': 'ថៃ', 'ថៃ': 'ថៃ', 'thailand': 'ថៃ',
        'korean': 'កូរ៉េ', 'កូរ៉េ': 'កូរ៉េ', 'korea': 'កូរ៉េ', 'south korean': 'កូរ៉េ', 'south korea': 'កូរ៉េ',
        'japanese': 'ជប៉ុន', 'ជប៉ុន': 'ជប៉ុន', 'japan': 'ជប៉ុន',
        'american': 'អាមេរិក', 'អាមេរិក': 'អាមេរិក', 'usa': 'អាមេរិក', 'united states': 'អាមេរិក', 'us': 'អាមេរិក',
        'british': 'អង់គ្លេស', 'អង់គ្លេស': 'អង់គ្លេស', 'uk': 'អង់គ្លេស', 'united kingdom': 'អង់គ្លេស',
        'french': 'បារាំង', 'បារាំង': 'បារាំង', 'france': 'បារាំង',
        'australian': 'អូស្ត្រាលី', 'អូស្ត្រាលី': 'អូស្ត្រាលី', 'australia': 'អូស្ត្រាលី',
        'filipino': 'ហ្វីលីពីន', 'ហ្វីលីពីន': 'ហ្វីលីពីន', 'philippines': 'ហ្វីលីពីន',
        'norwegian': 'ន័រវេស', 'ន័រវេស': 'ន័រវេស', 'norway': 'ន័រវេស',
        'malaysian': 'ម៉ាឡេស៊ី', 'ម៉ាឡេស៊ី': 'ម៉ាឡេស៊ី', 'malaysia': 'ម៉ាឡេស៊ី',
        'singaporean': 'សិង្ហបុរី', 'សិង្ហបុរី': 'សិង្ហបុរី', 'singapore': 'សិង្ហបុរី',
        'indonesian': 'ឥណ្ឌូនេស៊ី', 'ឥណ្ឌូនេស៊ី': 'ឥណ្ឌូនេស៊ី', 'indonesia': 'ឥណ្ឌូនេស៊ី',
        'indian': 'ឥណ្ឌា', 'ឥណ្ឌា': 'ឥណ្ឌា', 'india': 'ឥណ្ឌា',
        'german': 'អាល្លឺម៉ង់', 'អាល្លឺម៉ង់': 'អាល្លឺម៉ង់', 'germany': 'អាល្លឺម៉ង់',
        'canadian': 'កាណាដា', 'កាណាដា': 'កាណាដា', 'canada': 'កាណាដា',
        'russian': 'រុស្ស៊ី', 'រុស្ស៊ី': 'រុស្ស៊ី', 'russia': 'រុស្ស៊ី',
        'spanish': 'អេស្ប៉ាញ', 'អេស្ប៉ាញ': 'អេស្ប៉ាញ', 'spain': 'អេស្ប៉ាញ',
        'italian': 'អ៊ីតាលី', 'អ៊ីតាលី': 'អ៊ីតាលី', 'italy': 'អ៊ីតាលី',
        'dutch': 'ហូឡង់', 'ហូឡង់': 'ហូឡង់', 'netherlands': 'ហូឡង់',
        'swiss': 'ស្វីស', 'ស្វីស': 'ស្វីស', 'switzerland': 'ស្វីស',
        'swedish': 'ស៊ុយអែត', 'ស៊ុយអែត': 'ស៊ុយអែត', 'sweden': 'ស៊ុយអែត',
        'belgian': 'បែលហ្ស៊ិក', 'បែលហ្ស៊ិក': 'បែលហ្ស៊ិក', 'belgium': 'បែលហ្ស៊ិក',
        'danish': 'ដាណឺម៉ាក', 'ដាណឺម៉ាក': 'ដាណឺម៉ាក', 'denmark': 'ដាណឺម៉ាក',
        'austrian': 'អូទ្រីស', 'អូទ្រីស': 'អូទ្រីស', 'austria': 'អូទ្រីស',
        'finnish': 'ហ្វាំងឡង់', 'ហ្វាំងឡង់': 'ហ្វាំងឡង់', 'finland': 'ហ្វាំងឡង់',
        'portuguese': 'ព័រទុយហ្គាល់', 'ព័រទុយហ្គាល់': 'ព័រទុយហ្គាល់', 'portugal': 'ព័រទុយហ្គាល់',
        'irish': 'អៀរឡង់', 'អៀរឡង់': 'អៀរឡង់', 'ireland': 'អៀរឡង់',
        'new zealander': 'នូវែលសេឡង់', 'នូវែលសេឡង់': 'នូវែលសេឡង់', 'new zealand': 'នូវែលសេឡង់',
        'taiwanese': 'តៃវ៉ាន់', 'តៃវ៉ាន់': 'តៃវ៉ាន់', 'taiwan': 'តៃវ៉ាន់',
        'cameroonian': 'កាមេរូន', 'កាមេរូន': 'កាមេរូន', 'cameroon': 'កាមេរូន',
        'liberian': 'លីបេរីយ៉ា', 'លីបេរីយ៉ា': 'លីបេរីយ៉ា', 'liberia': 'លីបេរីយ៉ា',
        'nigerian': 'នីហ្សេរីយ៉ា', 'នីហ្សេរីយ៉ា': 'នីហ្សេរីយ៉ា', 'nigeria': 'នីហ្សេរីយ៉ា',
        'south african': 'អាហ្រ្វិកខាងត្បូង', 'អាហ្រ្វិកខាងត្បូង': 'អាហ្រ្វិកខាងត្បូង', 'south africa': 'អាហ្រ្វិកខាងត្បូង',
        'pakistani': 'ប៉ាគីស្ថាន', 'ប៉ាគីស្ថាន': 'ប៉ាគីស្ថាន', 'pakistan': 'ប៉ាគីស្ថាន',
        'bangladeshi': 'បង់ក្លាដែស', 'បង់ក្លាដែស': 'បង់ក្លាដែស', 'bangladesh': 'បង់ក្លាដែស',
      };
      return nationalityMap[lowerVal] || khmerPart;
    }
    return khmerPart;
  };

  const getTargetLangTranslation = (val: any, type: 'gender' | 'nationality' | 'carPurpose' | 'carRentalArea', lang: string) => {
    if (!val || typeof val !== 'string') return '.....';
    
    let englishPart = val;
    if (val.includes('/')) {
      const parts = val.split('/');
      const en = parts.find(p => !/[\u1780-\u17FF]/.test(p));
      if (en) {
        englishPart = en.trim();
      } else {
        englishPart = (parts[1] || parts[0]).trim();
      }
    }
    
    const lowerVal = englishPart.toLowerCase().replace(/[^a-z0-9ក-៿]/g, "").trim();
    if (type === 'gender') {
      let base = englishPart;
      if (lowerVal === 'male' || lowerVal === 'ប្រុស' || lowerVal === 'm' || lowerVal === '男') base = 'Male';
      else if (lowerVal === 'female' || lowerVal === 'ស្រី' || lowerVal === 'f' || lowerVal === '女') base = 'Female';
      
      if (lang === 'zh') {
        if (base === 'Male') return '男';
        if (base === 'Female') return '女';
      } else if (lang === 'ja') {
        if (base === 'Male') return '男性';
        if (base === 'Female') return '女性';
      } else if (lang === 'ko') {
        if (base === 'Male') return '남성';
        if (base === 'Female') return '여성';
      } else if (lang === 'ru') {
        if (base === 'Male') return 'Мужской';
        if (base === 'Female') return 'Женский';
      } else if (lang === 'km') {
        if (base === 'Male') return 'ប្រុស';
        if (base === 'Female') return 'ស្រី';
      }
      return base;
    }
    
    if (type === 'nationality') {
      const nationalityMap: Record<string, string> = {
        'cambodian': 'Cambodian', 'ខ្មែរ': 'Cambodian', 'cambodia': 'Cambodian',
        'foreigner': 'Foreigner', 'បរទេស': 'Foreigner',
        'chinese': 'Chinese', 'ចិន': 'Chinese', 'china': 'Chinese', 'chn': 'Chinese', '中国': 'Chinese',
        'vietnamese': 'Vietnamese', 'វៀតណាម': 'Vietnamese', 'vietnam': 'Vietnamese', '越南': 'Vietnamese',
        'thai': 'Thai', 'ថៃ': 'Thai', 'thailand': 'Thai', '泰国': 'Thai',
        'korean': 'Korean', 'កូរ៉េ': 'Korean', 'korea': 'Korean', 'south korean': 'Korean', 'south korea': 'Korean', '韩国': 'Korean',
        'japanese': 'Japanese', 'ជប៉ុន': 'Japanese', 'japan': 'Japanese', '日本': 'Japanese',
        'american': 'American', 'អាមេរិក': 'American', 'usa': 'American', 'united states': 'American', 'us': 'American', '美国': 'American',
        'british': 'British', 'អង់គ្លេស': 'British', 'uk': 'British', 'united kingdom': 'British', '英国': 'British',
        'french': 'French', 'បារាំង': 'French', 'france': 'French', '法国': 'French',
        'australian': 'Australian', 'អូស្ត្រាលី': 'Australian', 'australia': 'Australian', '澳大利亚': 'Australian'
      };
      
      let baseNat = nationalityMap[lowerVal] || englishPart;
      if (nationalityMap[val.trim()]) baseNat = nationalityMap[val.trim()];
      
      if (lang === 'zh') {
        const zhMap: Record<string, string> = {
          'Chinese': '中国', 'Cambodian': '柬埔寨', 'Foreigner': '外籍',
          'Vietnamese': '越南', 'Thai': '泰国', 'Korean': '韩国', 'Japanese': '日本',
          'American': '美国', 'British': '英国', 'French': '法国', 'Australian': '澳大利亚'
        };
        return zhMap[baseNat] || baseNat;
      }
      if (lang === 'ja') {
        const jaMap: Record<string, string> = {
          'Chinese': '中国', 'Cambodian': 'カンボジア', 'Foreigner': '外国人',
          'Vietnamese': 'ベトナム', 'Thai': 'タイ', 'Korean': '韓国', 'Japanese': '日本',
          'American': 'アメリカ', 'British': 'イギリス', 'French': 'フランス', 'Australian': 'オーストラリア'
        };
        return jaMap[baseNat] || baseNat;
      }
      if (lang === 'ko') {
        const koMap: Record<string, string> = {
          'Chinese': '중국', 'Cambodian': '캄보디아', 'Foreigner': '외국인',
          'Vietnamese': '베트남', 'Thai': '태국', 'Korean': '한국', 'Japanese': '일본',
          'American': '미국', 'British': '영국', 'French': '프랑스', 'Australian': '호주'
        };
        return koMap[baseNat] || baseNat;
      }
      if (lang === 'ru') {
        const ruMap: Record<string, string> = {
          'Chinese': 'Китай', 'Cambodian': 'Камбоджа', 'Foreigner': 'Иностранец',
          'Vietnamese': 'Вьетнам', 'Thai': 'Таиланд', 'Korean': 'Корея', 'Japanese': 'Япония',
          'American': 'США', 'British': 'Великобритания', 'French': 'Франция', 'Australian': 'Австралия'
        };
        return ruMap[baseNat] || baseNat;
      }
      if (lang === 'km') {
        const kmMap: Record<string, string> = {
          'Chinese': 'ចិន', 'Cambodian': 'ខ្មែរ', 'Foreigner': 'បរទេស',
          'Vietnamese': 'វៀតណាម', 'Thai': 'ថៃ', 'Korean': 'កូរ៉េ', 'Japanese': 'ជប៉ុន',
          'American': 'អាមេរិក', 'British': 'អង់គ្លេស', 'French': 'បារាំង', 'Australian': 'អូស្ត្រាលី'
        };
        return kmMap[baseNat] || baseNat;
      }
      
      return baseNat;
    }

    if (type === 'carPurpose') {
      const lowerMap: Record<string, string> = {
        'personaluse': 'Personal Use', 'personal': 'Personal Use', 'ប្រើប្រាស់ផ្ទាល់ខ្លួន': 'Personal Use',
        'companyuse': 'Company Use', 'company': 'Company Use', 'ប្រើប្រាស់ក្រុមហ៊ុន': 'Company Use',
        'trip': 'Trip', 'ដំណើរទស្សនកិច្ច': 'Trip', 'ដើរលេង': 'Trip'
      };
      
      const noSpace = englishPart.toLowerCase().replace(/[^a-zក-៿]/g, "").trim();
      let basePurp = lowerMap[noSpace] || englishPart;
      
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
      } else if (lang === 'km') {
        const kmMap: Record<string, string> = { 'Personal Use': 'ប្រើប្រាស់ផ្ទាល់ខ្លួន', 'Company Use': 'ប្រើប្រាស់ក្រុមហ៊ុន', 'Trip': 'ដំណើរទស្សនកិច្ច' };
        return kmMap[basePurp] || basePurp;
      }
      return basePurp;
    }

    if (type === 'carRentalArea') {
      const lowerMap: Record<string, string> = {
        'phnompenh': 'Phnom Penh', 'ភ្នំពេញ': 'Phnom Penh',
        'phnompenhprovinces': 'Phnom Penh - Provinces', 'phnompenhprov': 'Phnom Penh - Provinces', 'ppprov': 'Phnom Penh - Provinces', 'ភ្នំពេញខេត្ត': 'Phnom Penh - Provinces', 'ភ្នំពេញបណ្តាខេត្ត': 'Phnom Penh - Provinces'
      };
      
      const noSpace = englishPart.toLowerCase().replace(/[^a-zក-៿]/g, "").trim();
      let baseArea = lowerMap[noSpace] || englishPart;
      
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
      } else if (lang === 'km') {
        const kmMap: Record<string, string> = { 'Phnom Penh': 'ភ្នំពេញ', 'Phnom Penh - Provinces': 'ភ្នំពេញ - ខេត្ត' };
        return kmMap[baseArea] || baseArea;
      }
      return baseArea;
    }

    return englishPart;
  };

  const getTargetLangName = (person: any, lang: string) => {
    if (lang === 'zh' || lang === 'ja' || lang === 'ko') {
      const isTargetNat = getTargetLangTranslation(person.nationality, 'nationality', 'en') === 'Chinese' || 
                          getTargetLangTranslation(person.nationality, 'nationality', 'en') === 'Japanese' || 
                          getTargetLangTranslation(person.nationality, 'nationality', 'en') === 'Korean';
      if (isTargetNat && person.nameKh && /[\u4e00-\u9fa5\u3040-\u309f\u30a0-\u30ff\u3130-\u318f\uac00-\ud7a3]/.test(person.nameKh)) {
         return <span className="text-sm font-bold text-black">{person.nameKh}</span>;
      }
    }
    return <span className="text-sm uppercase font-times font-bold text-black">{person.nameEn || '.........................'}</span>;
  };

  const getFormattedAddressKh = () => {
    const parts = [];
    if (contract.showUnitNo && contract.unitNoKh) parts.push(`បន្ទប់លេខ ${contract.unitNoKh}`);
    if (contract.showHouseNo && contract.houseNoKh) parts.push(`ផ្ទះលេខ ${contract.houseNoKh}`);
    if (contract.showStreet && contract.streetKh) parts.push(`ផ្លូវ ${contract.streetKh}`);
    if (contract.showPhum && contract.phumKh) parts.push(`ភូមិ ${contract.phumKh}`);
    if (contract.showSangkat && contract.sangkatKh) parts.push(`សង្កាត់ ${contract.sangkatKh}`);
    if (contract.showKhan && contract.khanKh) parts.push(`ខណ្ឌ ${contract.khanKh}`);
    if (contract.showCity && contract.cityKh) parts.push(`${contract.cityKh}`);
    return parts.length > 0 ? parts.join(', ') : '...................................................';
  };

  const getFormattedAddressEn = () => {
    const parts = [];
    if (contract.showUnitNo && contract.unitNoEn) parts.push(`Unit ${contract.unitNoEn}`);
    if (contract.showHouseNo && contract.houseNoEn) parts.push(`House No ${contract.houseNoEn}`);
    if (contract.showStreet && contract.streetEn) parts.push(`Street ${contract.streetEn}`);
    if (contract.showPhum && contract.phumEn) parts.push(`Phum ${contract.phumEn}`);
    if (contract.showSangkat && contract.sangkatEn) parts.push(`Sangkat ${contract.sangkatEn}`);
    if (contract.showKhan && contract.khanEn) parts.push(`Khan ${contract.khanEn}`);
    if (contract.showCity && contract.cityEn) parts.push(`${contract.cityEn}`);
    return parts.length > 0 ? parts.join(', ') : '...................................................';
  };

  return (
    <div className="flex flex-col w-full items-center relative contract-preview-wrapper print:w-full print:m-0 print:block">
      <style>{`
        .contract-preview-wrapper {
          zoom: 0.42;
        }
        @media (min-width: 360px) {
          .contract-preview-wrapper {
            zoom: 0.45;
          }
        }
        @media (min-width: 390px) {
          .contract-preview-wrapper {
            zoom: 0.48;
          }
        }
        @media (min-width: 440px) {
          .contract-preview-wrapper {
            zoom: 0.55;
          }
        }
        @media (min-width: 520px) {
          .contract-preview-wrapper {
            zoom: 0.65;
          }
        }
        @media (min-width: 640px) {
          .contract-preview-wrapper {
            zoom: 0.8;
          }
        }
        @media (min-width: 768px) {
          .contract-preview-wrapper {
            zoom: 0.85;
          }
        }
        @media (min-width: 1024px) {
          .contract-preview-wrapper {
            zoom: 0.9;
          }
        }
        @media (min-width: 1280px) {
          .contract-preview-wrapper {
            zoom: 1;
          }
        }
        @media print {
          .contract-preview-wrapper {
            zoom: 1 !important;
          }
        }
      `}</style>
      
      <table id="printable-contract-p1" className="bg-white shadow-2xl printable-a4 text-[12px] leading-[1.8] text-justify text-slate-900 font-battambang relative print:shadow-none print:table mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
        <thead className="table-header-group">
          <tr><td><div className="h-12"></div></td></tr>
        </thead>
        <tfoot className="table-footer-group">
          <tr>
            <td className="px-6 align-bottom">
              <div className="h-12 flex items-end justify-end w-full">
                <div className="w-full text-[8px] text-slate-400 border-t border-slate-200 pt-2 text-right tracking-widest uppercase print-page-number">
                  <span className="print:hidden">PAGE 1</span>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td className="px-6 align-top">
              <div className="absolute inset-4 border border-slate-200 pointer-events-none print:hidden"></div>
      
      {/* Header */}
      <BilingualRow 
        className="mb-8"
        kh={
          <div className="text-center space-y-1">
            <h2 className="text-xl font-moul text-slate-900">ព្រះរាជាណាចក្រកម្ពុជា</h2>
            <p className="text-sm font-bold mt-2">ជាតិ សាសនា ព្រះមហាក្សត្រ</p>
            <div className="w-24 border-b border-black mx-auto mt-2"></div>
            <h1 className="text-2xl font-moul mt-6 text-slate-900">{contractType === 'car' ? 'កិច្ចសន្យាជួលរថយន្ដ' : 'កិច្ចសន្យាជួលផ្ទះ'}</h1>
          </div>
        }
        en={
          <div className="text-center space-y-1">
            <h2 className="text-md font-bold font-serif uppercase tracking-widest text-slate-900 mt-1">{tData.header}</h2>
            <p className="text-xs font-serif font-bold tracking-widest mt-1">{tData.subHeader}</p>
            <div className="w-24 border-b border-black mx-auto mt-2"></div>
            <h1 className="text-lg font-bold uppercase tracking-widest font-serif mt-6 text-slate-900">{contractType === 'car' ? tData.carLeaseTitle : tData.leaseTitle}</h1>
          </div>
        }
      />

      {/* Party A */}
      <BilingualRow 
        kh={
          <p className="mb-2">
            {contractType === 'car' ? 'ម្ចាស់រថយន្ដ៖ ' : 'ម្ចាស់ផ្ទះ៖ '}{landlord.nameKh && typeof landlord.nameKh === 'string' && /[\u1780-\u17FF]/.test(landlord.nameKh) ? (
              <span className="text-sm font-moul font-normal text-black">{landlord.nameKh}</span>
            ) : (
              <span className="text-sm font-times font-bold text-black uppercase">{landlord.nameEn || landlord.nameKh || '.........................'}</span>
            )} 
            {' '}ភេទ <span className="font-bold">{getKhmerTranslation(landlord.gender, 'gender')}</span> 
            {' '}ជនជាតិ <span className="font-bold">{getKhmerTranslation(landlord.nationality, 'nationality')}</span> 
            {' '}កើតថ្ងៃទី <span className="font-bold">{landlord.dob || '................'}</span>
            {landlord.showAddress && landlord.address && (
              <> មានអាស័យដ្ឋានបច្ចុប្បន្ននៅ <span className="font-bold">{landlord.address}</span></>
            )}
            {' '}កាន់អត្តសញ្ញាណប័ណ្ណ/លិខិតឆ្លងដែនលេខ <span className="font-bold">{landlord.idNumber || '.........................'}</span> 
            {landlord.idIssueDate && <>{' '}ចុះថ្ងៃទី <span className="font-bold">{landlord.idIssueDate}</span></>}
            {landlord.idExpiryDate && <>{' '}ផុតកំណត់ថ្ងៃទី <span className="font-bold">{landlord.idExpiryDate}</span></>}
            {' '}{contractType === 'car' ? (
              <>ត្រូវជាម្ចាស់កម្មសិទ្ធិករលើរថយន្ដម៉ាក <span className="font-bold">{contract.carModel || '............................'}</span> ពណ៌ <span className="font-bold">{contract.carColorKh || contract.carColorEn ||  '...............'}</span> ឆ្នាំផលិត <span className="font-bold">{contract.carYear || '...........'}</span> ស្លាកលេខ <span className="font-bold">{contract.carPlateNoKh || contract.carPlateNoEn ||  '..................'}</span> លេខតួ <span className="font-bold">{contract.carFrameNo || '...........................'}</span> លេខម៉ាស៊ីន <span className="font-bold">{contract.carEngineNo || '...........................'}</span> ចាប់ពីពេលនេះតទៅហៅថា</>
            ) : (
              <>ជាម្ចាស់ស្របច្បាប់នៃ <span className="font-bold">{getFormattedAddressKh()}</span> ចាប់ពីនេះទៅហៅថា</>
            )} <strong>ភាគី(ក)</strong>។
          </p>
        }
        en={
          <p className="mb-2">
            {contractType === 'car' ? tData.carOwner : tData.owner} {getTargetLangName(landlord, otherLang)} 
            {' '} {tData.sex} <span className="font-bold">{getTargetLangTranslation(landlord.gender, 'gender', otherLang)}</span>; 
            {' '} {tData.nationality} <span className="font-bold">{getTargetLangTranslation(landlord.nationality, 'nationality', otherLang)}</span>; 
            {' '} {tData.dob} <span className="font-bold">{landlord.dob || '................'}</span>;
            {landlord.showAddress && landlord.address && (
              <> {tData.presentAddress} <span className="font-bold">{landlord.address}</span>;</>
            )}
            {' '} {tData.idNumber} <span className="font-bold">{landlord.idNumber || '.........................'}</span> 
            {landlord.idIssueDate && <>{' '} {tData.issueDate} <span className="font-bold">{landlord.idIssueDate}</span>;</>}
            {landlord.idExpiryDate && <>{' '} {tData.expiryDate} <span className="font-bold">{landlord.idExpiryDate}</span>;</>}
            {' '} {contractType === 'car' ? (
              <>{tData.carOwnerDesc} {tData.carModelLabel || 'Model'} <span className="font-bold">{contract.carModel || '............................'}</span>, {tData.carColorLabel || 'Color'} <span className="font-bold">{contract.carColorEn || contract.carColorKh ||  '...............'}</span>, {tData.carYearLabel || 'Year'} <span className="font-bold">{contract.carYear || '...........'}</span>, {tData.carPlateNoLabel || 'Plate No'} <span className="font-bold">{contract.carPlateNoEn || contract.carPlateNoKh ||  '..................'}</span>, {tData.carFrameNoLabel || 'Frame No'} <span className="font-bold">{contract.carFrameNo || '...........................'}</span>, {tData.carEngineNoLabel || 'Engine No'} <span className="font-bold">{contract.carEngineNo || '...........................'}</span>{tData.herebyReferredToA || ', hereby referred to as Party (A).'}</>
            ) : (
              <>{tData.ownerDesc.replace("Phnom Penh", getFormattedAddressEn())}</>
            )}
          </p>
        }
      />

      {/* Transition */}
      <BilingualRow
        className="mb-4"
        kh={<div className="text-sm font-bold text-center">{contractType === 'car' ? 'បានយល់ព្រមជួលរថយន្ដទៅអោយ' : 'បានយល់ព្រមជួលបន្ទប់ទៅអោយ'}</div>}
        en={<div className="font-bold font-serif uppercase tracking-wider text-xs mt-1 text-center">{contractType === 'car' ? (tData.carAgreed || 'AGREED TO RENT A VEHICLE TO') : tData.agreed}</div>}
      />

      {/* Party B */}
      {tenants.map((tenant, idx) => (
        <React.Fragment key={idx}>
          <BilingualRow
            kh={
            <p className="mb-1">
              អ្នកជួល{tenants.length > 1 ? `ទី${idx + 1}` : ''}៖ {tenant.nameKh && typeof tenant.nameKh === 'string' && /[\u1780-\u17FF]/.test(tenant.nameKh) ? (
                <span className="text-sm font-moul font-normal text-black">{tenant.nameKh}</span>
              ) : (
                <span className="text-sm font-times font-bold text-black uppercase">{tenant.nameEn || tenant.nameKh || '.........................'}</span>
              )} 
              {' '}ភេទ <span className="font-bold">{getKhmerTranslation(tenant.gender, 'gender')}</span> 
              {' '}ជនជាតិ <span className="font-bold">{getKhmerTranslation(tenant.nationality, 'nationality')}</span> 
              {' '}កើតថ្ងៃទី <span className="font-bold">{tenant.dob || '................'}</span>
              {' '}កាន់លិខិតឆ្លងដែន ឬអត្តសញ្ញាណប័ណ្ណលេខ <span className="font-bold">{tenant.idNumber || '.........................'}</span> 
              {tenant.idIssueDate && <>{' '}ចុះថ្ងៃទី <span className="font-bold">{tenant.idIssueDate}</span></>}
              {tenant.idExpiryDate && <>{' '}ផុតកំណត់ថ្ងៃទី <span className="font-bold">{tenant.idExpiryDate}</span></>}
              {idx === tenants.length - 1 ? (contractType === 'car' ? ' ចាប់ពីពេលនេះទៅហៅថាភាគី(ខ)។' : ' ចាប់ពីនេះទៅហៅថា ភាគី(ខ)។') : '។'}
            </p>
          }
          en={
            <p className="mb-1">
              {contractType === 'car' ? tData.carRenter : tData.lessee}{tenants.length > 1 ? ` ${idx + 1}` : ""} {getTargetLangName(tenant, otherLang)} 
              {' '} {tData.sex} <span className="font-bold">{getTargetLangTranslation(tenant.gender, 'gender', otherLang)}</span>; 
              {' '} {tData.nationality} <span className="font-bold">{getTargetLangTranslation(tenant.nationality, 'nationality', otherLang)}</span>; 
              {' '} {tData.dob} <span className="font-bold">{tenant.dob || '................'}</span>;
              {' '} {tData.idNumber} <span className="font-bold">{tenant.idNumber || '.........................'}</span>
              {tenant.idIssueDate && <>{' '} {tData.issueDate} <span className="font-bold">{tenant.idIssueDate}</span>;</>}
              {tenant.idExpiryDate && <>{' '} {tData.expiryDate} <span className="font-bold">{tenant.idExpiryDate}</span>;</>}
              {idx === tenants.length - 1 ? (contractType === 'car' ? (tData.herebyReferredToB || ', hereby referred to as Party (B).') : ` ${tData.lesseeDesc}`) : "."}
            </p>
          }
        />
        </React.Fragment>
      ))}

      {/* Agreement Text */}
      <BilingualRow
        className="mb-6 font-bold text-center"
        kh={<p>ភាគីទាំងពីរបានព្រមព្រៀងតាមគោលការណ៍ដូចខាងក្រោម៖</p>}
        en={<p>{tData.respects}</p>}
      />

      {/* Terms */}
      <div className="space-y-6">
        {contractType === 'house' ? (
          <>
            {/* Term 1: Lease Period */}
            <TermRow khTitle="ប្រការ 1: រយៈពេលនៃការជួល" termIndex={0} khContent={
              <p className="mb-1">
                រយៈពេលជួលមានចំនួន <span className="font-bold">{contract.durationMonths || '.....'}</span> ខែ ចាប់ពីថ្ងៃទី <span className="font-bold">{contract.startDate || '................'}</span> ដល់ថ្ងៃទី <span className="font-bold">{endDate}</span>។ ថ្លៃឈ្នួល <span className="font-bold">{contract.rentAmount || '.....'}</span> ដុល្លារ/ខែ។
              </p>
            } />
            {/* Term 2: Payment */}
            <TermRow khTitle="ប្រការ 2: ការទូទាត់" termIndex={1} khContent={
              <ul className="list-disc pl-6 space-y-2">
                <li>ភាគី(ខ) តម្កល់ប្រាក់កក់ចំនួន <span className="font-bold">{contract.depositAmount || '.....'}</span> ដុល្លារ និងប្រាក់ឈ្នួលផ្ទះខែដំបូងចំនួន <span className="font-bold">{contract.rentAmount || '.....'}</span> ដុល្លារ។</li>
                <li>ត្រូវបង់ថ្លៃឈ្នួលរៀងរាល់ថ្ងៃទី <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> នៃខែនីមួយៗ។ ប្រាក់កក់នឹងប្រគល់ជូនវិញពេលបញ្ចប់កិច្ចសន្យា(បើគ្មានការខូចខាត) ប៉ុន្តែមិនអាចកាត់កងថ្លៃឈ្នួល ឬទឹកភ្លើងឡើយ បើបញ្ចប់មុនកំណត់។</li>
              </ul>
            } />
            {/* Term 3: Tax */}
            <TermRow khTitle="ប្រការ 3: ពន្ធ" termIndex={2} khContent={
              <ul className="list-disc pl-6 space-y-2">
                <li>ភាគី(ក) ជាអ្នកទទួលបន្ទុកបង់ពន្ធអចលនទ្រព្យ។</li>
              </ul>
            } />
            {/* Term 4: Terminations */}
            <TermRow khTitle="ប្រការ 4: ការបញ្ចប់កិច្ចសន្យា" termIndex={3} khContent={
              <ul className="list-disc pl-6 space-y-2">
                <li>កិច្ចសន្យាផុតកំណត់នៅថ្ងៃទី <span className="font-bold">{endDate}</span>។</li>
                <li>បើភាគី(ក) បញ្ចប់កិច្ចសន្យាមុនកំណត់ ត្រូវជូនដំណឹងមុន 30 ថ្ងៃ និងសងប្រាក់កក់ជូនភាគី(ខ)វិញ។</li>
                <li>បើភាគី(ខ) បញ្ចប់កិច្ចសន្យាមុនកំណត់ យឺតយ៉ាវបង់ថ្លៃឈ្នួលលើសពី 7 ថ្ងៃ ឬរំលោភកិច្ចសន្យា ភាគី(ក) មានសិទ្ធិបញ្ចប់កិច្ចសន្យា យកទីតាំងវិញ ហើយប្រាក់កក់នឹងមិនប្រគល់ជូនវិញឡើយ។</li>
              </ul>
            } />
            {/* Term 5: Utilities */}
            <TermRow khTitle="ប្រការ 5: ប្រព័ន្ធទឹក ភ្លើង និងសេវាផ្សេងៗ" termIndex={4} khContent={
              <ul className="list-disc pl-6 space-y-2">
                <li>ភាគី(ក) ត្រូវរៀបចំប្រព័ន្ធទឹកភ្លើងឱ្យប្រើប្រាស់បានមុនពេលចូលនៅ។</li>
                <li>
                  តម្លៃសេវាកម្ម៖
                  <div className="space-y-1 mt-2">
                    <div>- ទឹក: <span className="font-bold">{contract.waterUtility || '....................'}</span></div>
                    <div>- ខ្សែកាប: <span className="font-bold">{contract.cableTvUtility || '....................'}</span></div>
                    <div>- ភ្លើង: <span className="font-bold">{contract.electricityUtility || '....................'}</span></div>
                    <div>- អ៊ីនធឺណិត: <span className="font-bold">{contract.internetUtility || '....................'}</span></div>
                    {contract.otherUtility1Enabled && (
                      <div>- {contract.otherUtility1Name || '....................'}: <span className="font-bold">{contract.otherUtility1Price || '....................'}</span></div>
                    )}
                    {contract.otherUtility2Enabled && (
                      <div>- {contract.otherUtility2Name || '....................'}: <span className="font-bold">{contract.otherUtility2Price || '....................'}</span></div>
                    )}
                  </div>
                </li>
              </ul>
            } />
            {/* Term 6: Other Conditions */}
            <TermRow khTitle="ប្រការ 6: លក្ខខណ្ឌផ្សេងៗ" termIndex={5} khContent={
              <ul className="list-disc pl-6 space-y-2">
                <li>ការកែប្រែទ្រង់ទ្រាយផ្ទះ ត្រូវមានការអនុញ្ញាតពីភាគី(ក)។</li>
                <li>ការជួសជុលដោយសារគ្រោះធម្មជាតិ ជាបន្ទុករបស់ភាគី(ក)។</li>
                <li>ហាមជួលបន្តទៅតតិយជន ដោយគ្មានការអនុញ្ញាត។</li>
                <li>ទីតាំងជួលសម្រាប់តែការស្នាក់នៅ។ បើប្រព្រឹត្តបទល្មើស (ល្បែងស៊ីសង ជួញដូរមនុស្ស ចាប់ជំរិត Online Scam។ល។) ភាគី(ខ) ត្រូវទទួលខុសត្រូវចំពោះច្បាប់ ហើយកិច្ចសន្យាត្រូវបញ្ចប់ភ្លាមៗ។</li>
              </ul>
            } />
            {/* Term 7: Renewal */}
            <TermRow khTitle="ប្រការ 7: ការបន្តកិច្ចសន្យា" termIndex={6} khContent={
              <ul className="list-disc pl-6 space-y-2">
                <li>ដើម្បីបន្តកិច្ចសន្យា ភាគី(ខ) ត្រូវជូនដំណឹងមុនយ៉ាងតិច 1 ខែ។</li>
              </ul>
            } />
            {/* Term 8: Furniture */}
            <TermRow khTitle="ប្រការ 8: គ្រឿងសង្ហារឹម" termIndex={7} khContent={
              <ul className="list-disc pl-6 space-y-2">
                <li>ពេលបញ្ចប់កិច្ចសន្យា ភាគី(ខ) ត្រូវប្រគល់ផ្ទះ និងសម្ភារៈក្នុងស្ថានភាពដើមជូនភាគី(ក)វិញ។</li>
              </ul>
            } />
            {/* Term 9: Right to Enter */}
            <TermRow khTitle="ប្រការ 9: សិទ្ធិក្នុងការចេញចូល" termIndex={8} khContent={
              <ul className="list-disc pl-6 space-y-2">
                <li>ភាគី(ក) មានសិទ្ធិចូលត្រួតពិនិត្យទីតាំងជួល ដោយត្រូវជូនដំណឹងដល់ភាគី(ខ) មុន 24 ម៉ោង។</li>
              </ul>
            } />
            {/* Term 10: Validation */}
            <TermRow khTitle="ប្រការ 10: សុពលភាព" termIndex={9} khContent={
              <ul className="list-disc pl-6 space-y-2">
                <li>ភាគីទាំងពីរយល់ព្រមអនុវត្តតាមលក្ខខណ្ឌខាងលើ។ ភាគីបំពានត្រូវទទួលខុសត្រូវចំពោះមុខច្បាប់។</li>
                <li>កិច្ចសន្យាមានសុពលភាពស្មើគ្នាទាំងភាសាខ្មែរនិងអង់គ្លេស ចាប់ពីថ្ងៃចុះហត្ថលេខា។</li>
              </ul>
            } />
          </>
        ) : (
          <>
            <TermRow khTitle="ប្រការ ១" termIndex={0} khContent={
              <p className="mb-1">ភាគី(ខ) ស្នើសុំនិងយល់ព្រមជួលរថយន្ដដែលមានម៉ាក ពណ៌ និងស្លាកលេខដូចបានរៀបរាប់ខាងលើពីភាគី(ក) ដោយភាគី(ខ) ជួលរថយន្ដនេះដើម្បី <span className="font-bold">{getTargetLangTranslation(contract.carPurpose, 'carPurpose', isKh ? 'km' : otherLang) || '....................'}</span>។ ភាគី(ខ) មិនអាចយករថយន្ដដែលជួលពីភាគី(ក) នេះទៅធ្វើអាជីវកម្មផ្សេងក្រៅពី <span className="font-bold">{getTargetLangTranslation(contract.carPurpose, 'carPurpose', isKh ? 'km' : otherLang) || '....................'}</span> បានឡើយ។ អាចប្តូរកម្មវត្ថុនៃការជួលលុះត្រាតែមានកិច្ចព្រមព្រៀងគ្នាជាលាយលក្ខអក្សរជាមុន។</p>
            } />
            <TermRow khTitle="ប្រការ ២" termIndex={1} khContent={
              <p className="mb-1">កិច្ចសន្យានេះមានសុពលភាពរយៈពេល <span className="font-bold">{contract.durationMonths || '.....'}</span> ខែ ដោយគិតចាប់ពីថ្ងៃទី <span className="font-bold">{contract.startDate || '................'}</span> ដល់ថ្ងៃទី <span className="font-bold">{endDate}</span>។ រថយន្ដនេះជួលក្នុងតម្លៃ <span className="font-bold">{contract.rentAmount || '.....'}</span> ដុល្លារ/ខែ។</p>
            } />
            <TermRow khTitle="ប្រការ ៣" termIndex={2} khContent={
              <div className="space-y-2">
                <p>ភាគី(ខ) ត្រូវបង់ប្រាក់កក់ចំនួន <span className="font-bold">{contract.depositAmount || '.....'}</span> អោយទៅភាគី(ក)។ ប្រាក់កក់នេះនឹងប្រគល់សងទៅភាគីខវិញគ្រប់ចំនួននៅពេលដែលកិច្ចសន្យាបានបញ្ចប់ក្រោយពិនិត្យឃើញថារថយន្ដពុំមានការខូចខាត។ ករណីមានការខូចខាតភាគី(ក) អាចកាត់កងថ្លៃជួសជុលពីប្រាក់កក់បានហើយប្រាក់កក់នៅសល់ត្រូវប្រគល់ជូនភាគីខវិញ។ ករណីទំហំនៃការខូចខាតត្រូវជួសជុលចំណាយអស់ច្រើនជាងប្រាក់កក់នោះភាគីខ ត្រូវបង់ប្រាក់បន្ថែមដើម្បីបង្គ្រប់ថ្លៃជួសជុល។</p>
                <p>ភាគី(ខ) ត្រូវបង់ប្រាក់ឈ្នួលថ្លៃជួលរថយន្ដអោយបានទៀតទាត់តាមខែនីមួយៗ។ ភាគី(ខ) ត្រូវបង់ប្រាក់ជូនភាគី(ក) នៅរៀងរាល់ថ្ងៃទី <span className="font-bold">{contract.startDate ? contract.startDate.split('/')[0] : '.....'}</span> នៃខែនីមួយៗ។</p>
              </div>
            } />
            <TermRow khTitle="ប្រការ ៤" termIndex={3} khContent={
              <p className="mb-1">ភាគី(ខ) មិនអាចយករថយន្ដដែលជួលពីភាគី(ក) នេះទៅជួលបន្តឬធ្វើអាជីវកម្មគ្រប់រូបភាព ឬផ្ទេរការប្រើអោយទៅតតិយជនដោយគ្មានការអនុញ្ញាតពីភាគី(ក) ដែលជាម្ចាស់រថយន្ដបានទេ។</p>
            } />
            <TermRow khTitle="ប្រការ ៥" termIndex={4} khContent={
              <p className="mb-1">ករណីសកម្មភាពរបស់ភាគី(ខ) ដែលប្រព្រឹត្តឡើងល្មើសនឹងច្បាប់ដោយប្រើប្រាស់រថយន្តក្នុងអំឡុងពេលជួលនោះភាគី(ខ) ត្រូវទទួលខុសត្រូវចំពោះមុខច្បាប់ដោយខ្លួនឯង ដោយមិនអោយមានការពាក់ព័ន្ធនឹងភាគី(ក) ឡើយ ហើយភាគី(ក)ក៏មិនទទួលខុសត្រូវលើការបង្កអោយយមានការខូចខាតណាមួយដោយសារការប្រើប្រាស់រថយន្តជួលរបស់ភាគី(ខ)ផងដែរ។</p>
            } />
            <TermRow khTitle="ប្រការ ៦: ករណីខូចខាតរថយន្ត" termIndex={5} khContent={
              <div className="space-y-2">
                <p>៦.1 ករណីរថយន្តជាកម្មវត្ថុនៃការជួលនោះ មានសភាពខូចតិចតួច ឬខូចធ្ងន់ធ្ងរ ដោយសារការប្រើប្រាស់ធ្វេសប្រហែស ឬកំហុសរបស់ភាគី(ខ) ការជួសជុលនោះ ជាបន្ទុករបស់ភាគី(ខ) លើកលែងតែ ករណីសឹកវ៉ិចរិល ដោយសារកាតការប្រើប្រាស់ធម្មតា នោះការជួសជុលជាបន្ទុករបស់ ភាគី(ក) ។</p>
                <p>៦.2 ភាគី(ខ) ត្រូវទទួលខុសត្រូវទាំងស្រុង លើករណីរថយន្តខូចខាតដូចជា (បុក ក្រឡាប់ ធ្លាក់ទឹក ចោរលួច ឆេះ ឬ ឧបទ្ទវហេតុផ្សេងៗ) ដោយត្រូវសងសំណងតាមការព្រមព្រៀងគ្នា ក្នុងតម្លៃ <span className="font-bold">{contract.carCompensation ? contract.carCompensation : '_______________________'}</span> លើតម្លៃរថយន្តសងមកភាគី(ក)។</p>
                <p>៦.3 ករណីភាគី(ខ) ប្រើប្រាស់រថយន្តមានការប៉ះបុកទង្គិច ឆ្កូតផ្សេងៗត្រូវតែជូនដំណឹងដល់ភាគី(ក) ដោយមិនអនុញ្ញាតអោយភាគី(ខ) លួចបិទបាំងពត៌មានយករថយន្តទៅជួសជុលដោយគ្មានការឯកភាពពីភាគី(ក)ឡើយ ។</p>
                <p>៦.4 តំហែទាំ និងការផ្លាស់ប្ដូរគ្រឿងបន្លាស់ដែលដល់អាយុកាល ឬខូចដោយការប្រើប្រាស់ធម្មតា ជាបន្ទុករបស់ភាគី(ក)</p>
              </div>
            } />
            <TermRow khTitle="ប្រការ ៧" termIndex={6} khContent={
              <p className="mb-1">នៅអំឡុងពេលជួលនេះរាល់ការខូចខាតដែលបានកើតឡើងពីការប្រើប្រាស់ទៅរថយន្ដនេះដូចជាគ្រោះថ្នាក់ចរាចរណ៍ ឬការដឹកវត្ថុខុសច្បាប់រត់ពន្ធ និងសកម្មភាពខុសច្បាប់ផ្សេងៗភាគី(ខ)ត្រូវទទួលខុសត្រូវដោយខ្លួនឯងទាំងផ្នែកព្រហ្មទណ្ឌនិងផ្នែករដ្ឋប្បវេណី។</p>
            } />
            <TermRow khTitle="ប្រការ ៨" termIndex={7} khContent={
              <p className="mb-1">ករណីដែលភាគី(ខ) មិនអនុវត្តកាតព្វកិច្ចបង់ប្រាក់ឈ្នួល ឬបង់ប្រាក់ឈ្នួលយឺតយ៉ាវលើសពី៧ថ្ងៃឬបំពានលក្ខខណ្ឌនៃកិច្ចសន្យាត្រង់ប្រការណាមួយ ភាគី(ក) មានសិទ្ធិរំលាយនូវកិច្ចសន្យាព្រមទាំងដកហូតយករថយន្ដនេះមកវិញបានគ្រប់ពេលវេលាដោយមិនចាំបាច់ជូនដំណឹង។</p>
            } />
            <TermRow khTitle="ប្រការ ៩" termIndex={8} khContent={
              <p className="mb-1">រថយន្តជួលក្នុងកិច្ចសន្យានេះអនុញ្ញាតអោយភាគី(ខ) ប្រើប្រាស់ក្នុងតំបន់បរិវេណ <span className="font-bold">{getTargetLangTranslation(contract.carRentalArea, 'carRentalArea', isKh ? 'km' : otherLang) || '....................'}</span> ករណីភាគី(ខ) ប្រើប្រាស់ខុសគោលដៅ ឬឆ្លងទៅបណ្តាខេត្តផ្សេងៗ ត្រូវជូនដំណឹងសុំការអនុញ្ញាតពីភាគី(ក) ហើយភាគី(ខ) ត្រូវទទួលខុសត្រូវលើរាល់ការចំណាយនិងការខូចខាតទាំងស្រុងដោយមិនពាក់ព័ន្ធនឹងភាគី(ក)ឡើយ។</p>
            } />
            <TermRow khTitle="ប្រការ ១០" termIndex={9} khContent={
              <div className="space-y-2">
                <p>១០.១ កិច្ចសន្យានេះបានធ្វើឡើងដោយមានការព្រមព្រៀងគ្នាពិតប្រាកដ និងដោយសេរីរវាងភាគីទាំងសងខាងចំពោះលក្ខខណ្ឌទាំងអស់ដែលបានចែងនៅក្នុងកិច្ចសន្យានេះ។</p>
                <p>១០.២ រាល់ការកែប្រែលក្ខខណ្ឌនីមួយៗភាគីម្ខាងមិនអាចមានសិទ្ធិកែប្រែដោយឯកភាភាគីបានឡើយលើកលែងតែមានការព្រមព្រៀងពីភាគីទាំងពីរទើបអាចប្រព្រឹត្តទៅបាន។ កិច្ចសន្យានេះមាសុពលភាពអនុវត្តបន្ទាប់ពីគូរភាគីទាំងពីរបានផ្តិតមេដៃទទួលយកព្រមនូវកិច្ចសន្យានេះតទៅ។</p>
                <p>១០.៣ ភាគីទាំងពីរត្រូវតែអនុវត្តកាតព្វកិច្ចតាមប្រការដូចដែលបានចែងក្នុងកិច្ចសន្យាខាងលើដោយសុចរិតនិងសមធម៌ ករណីភាគីណាមួយមានចេតនាទុច្ចរិតដោយបំពានលើប្រការណាមួយដូចមានចែងក្នុងកិច្ចសន្យាខាងលើនឹងត្រូវទទួលខុសត្រូវចំពោះមុខច្បាប់ជាធរមាន។</p>
              </div>
            } />
            <TermRow khTitle="ប្រការ ១១" termIndex={10} khContent={
              <div className="space-y-2">
                <p>១១.១ កិច្ចសន្យានេះត្រូវគ្រប់គ្រង និងបកស្រាយដោយផ្តាច់មុខព្រមទាំងក្នុងទិដ្ឋភាពដោយអនុលោមទៅតាមច្បាប់លិខិតបទដ្ឋានគតិយុត និងក្រោមយុត្តាធិការប្រទេសកម្ពុជា។</p>
                <p>១១.២ កិច្ចសន្យានេះមានប្រសិទ្ធភាពអនុវត្តបានបន្ទាប់ពីពេលភាគីទាំងពីរបានផ្តិតមេដៃទទួលយល់ព្រមលើកិច្ចសន្យានេះតទៅ។</p>
                <p>១១.៣ កិច្ចសន្យានេះត្រូវបានធ្វើឡើងជាពីរភាសាគឺ ភាសាខ្មែរ និង{otherLang === 'zh' ? 'ចិន' : otherLang === 'ja' ? 'ជប៉ុន' : otherLang === 'ko' ? 'កូរ៉េ' : otherLang === 'ru' ? 'រុស្សី' : 'អង់គ្លេស'} ដែលមានតម្លៃច្បាប់ស្មើគ្នា។ ក្នុងករណីមានភាពខុសគ្នា អត្ថន័យ ឬការបកស្រាយរវាងច្បាប់ដើមទាំងពីរ ភាសាខ្មែរត្រូវមានអាទិភាព។</p>
              </div>
            } />
          </>
        )}
      </div>
      {/* Signature Section */}
      {/* Signature Section */}
      <div className="mt-8 pt-8 flex-shrink-0 break-inside-avoid" style={{ pageBreakInside: 'avoid', breakInside: 'avoid', display: 'block' }}>
        <p className="text-right mb-8">
          <span className="font-bold">{t('កាលបរិច្ឆេទ៖ ', 'date')}</span> 
          {contract.contractDate ? (
            <span className="font-bold">{contract.contractDate}</span>
          ) : (
            '....................................'
          )}
        </p>

        <div className="mt-8 grid gap-y-12 gap-x-2 px-2 text-[10px] italic font-bold" style={{ gridTemplateColumns: `repeat(${Math.min(2 + tenants.length, 4)}, minmax(0, 1fr))` }}>
          <div className="text-center w-full">
            <p>{t('ភាគី(ក)', 'landlord')}</p>
            <div className="mt-24 w-[85%] border-b border-slate-400 mx-auto"></div>
            <p className="mt-2 not-italic text-[9px] sm:text-[11px] leading-tight text-black break-words">
              {language === 'en' ? (
                getTargetLangName(landlord, otherLang)
              ) : (
                landlord.nameKh && typeof landlord.nameKh === 'string' && /[\u1780-\u17FF]/.test(landlord.nameKh) ? (
                  <span className="font-moul font-normal">{landlord.nameKh}</span>
                ) : (
                  getTargetLangName(landlord, otherLang)
                )
              )}
            </p>
          </div>
          <div className="text-center w-full">
            <p>{t('ភ្នាក់ងារ', 'agent')}</p>
            <div className="mt-24 w-[85%] border-b border-slate-400 mx-auto"></div>
            <p className="mt-2 not-italic text-[9px] sm:text-[11px] leading-tight text-black break-words">
              {language === 'en' ? (
                <span className="font-times font-bold uppercase">TOUCH CHANDRAHEANG</span>
              ) : (
                <span className="font-moul font-normal">ទូច ចាន់ដារ៉ាហៀង</span>
              )}
            </p>
          </div>
          {tenants.map((tenant, index) => (
            <div 
              key={index} 
              className="text-center w-full"
              style={{ gridColumnStart: index >= 2 ? (index % 2) + 3 : undefined }}
            >
              <p>{t('ភាគី(ខ)', 'tenant')} {tenants.length > 1 ? index + 1 : ''}</p>
              <div className="mt-24 w-[85%] border-b border-slate-400 mx-auto"></div>
              <p className="mt-2 not-italic text-[9px] sm:text-[11px] leading-tight text-black break-words">
                {language === 'en' ? (
                  getTargetLangName(tenant, otherLang)
                ) : (
                  tenant.nameKh && typeof tenant.nameKh === 'string' && /[\u1780-\u17FF]/.test(tenant.nameKh) ? (
                    <span className="font-moul font-normal">{tenant.nameKh}</span>
                  ) : (
                    getTargetLangName(tenant, otherLang)
                  )
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
