import fs from 'fs';
let preview = fs.readFileSync('src/components/ContractPreview.tsx', 'utf-8');
preview = preview.replace(
  '<p>១៣.៣ កិច្ចសន្យានេះត្រូវបានធ្វើឡើងជាពីរភាសាគឺ ភាសាខ្មែរ និងអង់គ្លេស ដែលមានតម្លៃច្បាប់ស្មើគ្នា។ ក្នុងករណីមានភាពខុសគ្នា អត្ថន័យ ឬការបកស្រាយរវាងច្បាប់ដើមទាំងពីរ ភាសាខ្មែរត្រូវមានអាទិភាព។</p>',
  "{otherLang !== 'km' && <p>១៣.៣ កិច្ចសន្យានេះត្រូវបានធ្វើឡើងជាពីរភាសាគឺ ភាសាខ្មែរ និង{otherLang === 'zh' ? 'ចិន' : otherLang === 'ja' ? 'ជប៉ុន' : otherLang === 'ko' ? 'កូរ៉េ' : otherLang === 'ru' ? 'រុស្សី' : 'អង់គ្លេស'} ដែលមានតម្លៃច្បាប់ស្មើគ្នា។ ក្នុងករណីមានភាពខុសគ្នា អត្ថន័យ ឬការបកស្រាយរវាងច្បាប់ដើមទាំងពីរ ភាសាខ្មែរត្រូវមានអាទិភាព។</p>}"
);
fs.writeFileSync('src/components/ContractPreview.tsx', preview);
