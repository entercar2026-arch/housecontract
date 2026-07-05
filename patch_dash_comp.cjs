const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const target = `<div className="col-span-1">
            <InputField label="Total Deposit $" value={state.contract.depositAmount} onChange={(e: any) => updateContract({depositAmount: e.target.value})} placeholder="500" />
          </div>`;

const replacement = `<div className="col-span-1">
            <InputField label="Total Deposit $" value={state.contract.depositAmount} onChange={(e: any) => updateContract({depositAmount: e.target.value})} placeholder="500" />
          </div>
          <div className="col-span-2 md:col-span-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] uppercase tracking-wider text-slate-600 font-bold">Compensation / សំណង</label>
              <div className="flex gap-1">
                <button type="button" onClick={() => updateContract({carCompensation: 'តាមតម្លៃទីផ្សារ'})} className="px-2 py-1 bg-slate-200 hover:bg-slate-300 rounded text-xs text-slate-700 font-bold transition-colors">តាមតម្លៃទីផ្សារ</button>
                <button type="button" onClick={() => updateContract({carCompensation: ''})} className="px-2 py-1 bg-slate-200 hover:bg-slate-300 rounded text-xs text-slate-700 font-bold transition-colors">ទទេរ (Clear)</button>
              </div>
            </div>
            <input type="text" value={state.contract.carCompensation || ''} onChange={e => updateContract({carCompensation: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-slate-50 border border-slate-200/60 shadow-sm focus:bg-white focus:border-indigo-400 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-3 py-2.5 placeholder:text-slate-400" placeholder="បញ្ចូលសំណងទីនេះ / Enter compensation here" />
          </div>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/Dashboard.tsx', code);
  console.log("Patched dashboard with compensation");
} else {
  console.log("Could not find target in Dashboard.tsx");
}
