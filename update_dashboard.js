const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

code = code.replace(
  `import { Settings, User, Users, FileText } from 'lucide-react';`,
  `import { Settings, User, Users, FileText, CheckCircle2 } from 'lucide-react';\nimport { motion, AnimatePresence } from 'motion/react';\n\nconst InputField = ({ label, value, onChange, placeholder = '', type = 'text', readOnly = false, actionBtn = null }: any) => (\n  <div className="w-full relative">\n    <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">{label}</label>\n    <div className="flex gap-2">\n      <input \n        type={type} \n        value={value} \n        onChange={onChange} \n        readOnly={readOnly}\n        className="w-full text-sm text-slate-900 font-medium bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400"\n        placeholder={placeholder}\n      />\n      {actionBtn}\n    </div>\n  </div>\n);`
);

// Mass replace landlord inputs
code = code.replace(
  /<label className="text-xs text-slate-700 font-semibold block mb-0\.5">(.*?)<\/label>\s*<input type="text" value={state\.landlord\.(.*?)} onChange={e => updateLandlord\({.*?}\)} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1"(.*?) \/>/g,
  `<InputField label="$1" value={state.landlord.$2} onChange={(e: any) => updateLandlord({$2: e.target.value})}$3 />`
);

// Mass replace tenant inputs
code = code.replace(
  /<label className="text-xs text-slate-700 font-semibold block mb-0\.5">(.*?)<\/label>\s*<input type="text" value={state\.tenants\[activeTenantTab\]\.(.*?)} onChange={e => updateTenant\(activeTenantTab, {.*?}\)} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1"(.*?) \/>/g,
  `<InputField label="$1" value={state.tenants[activeTenantTab].$2} onChange={(e: any) => updateTenant(activeTenantTab, {$2: e.target.value})}$3 />`
);

// Mass replace simple contract inputs
code = code.replace(
  /<label className="text-xs text-slate-700 font-semibold block mb-0\.5">(.*?)<\/label>\s*<input type="text" value={state\.contract\.(.*?)} onChange={e => updateContract\({.*?}\)} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1"(.*?) \/>/g,
  `<InputField label="$1" value={state.contract.$2} onChange={(e: any) => updateContract({$2: e.target.value})}$3 />`
);

fs.writeFileSync('src/components/Dashboard.tsx', code);
