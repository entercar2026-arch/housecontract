const nationalityMap = {
  'cambodian': 'ខ្មែរ', 'ខ្មែរ': 'ខ្មែរ', 'cambodia': 'ខ្មែរ',
  'foreigner': 'បរទេស', 'បរទេស': 'បរទេស',
  'chinese': 'ចិន', 'ចិន': 'ចិន', 'china': 'ចិន',
};
const val = "Chinese";
const lowerVal = val.toLowerCase().trim();
console.log(nationalityMap[lowerVal] || val);
