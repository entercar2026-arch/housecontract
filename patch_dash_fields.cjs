const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const target = `<div className="col-span-2">
                  <InputField label="Car Color" value={state.contract.carColor || ''} onChange={(e: any) => updateContract({carColor: e.target.value})} placeholder="e.g. White" />
                </div>
                <div className="col-span-2">
                  <InputField label="Year" value={state.contract.carYear || ''} onChange={(e: any) => updateContract({carYear: e.target.value})} placeholder="e.g. 2020" />
                </div>
                <div className="col-span-2">
                  <InputField label="Plate No" value={state.contract.carPlateNo || ''} onChange={(e: any) => updateContract({carPlateNo: e.target.value})} placeholder="e.g. 2A-1234" />
                </div>`;

const replacement = `<div className="col-span-1">
                  <InputField label="Color (KH)" value={state.contract.carColorKh || ''} onChange={(e: any) => updateContract({carColorKh: e.target.value})} placeholder="e.g. ស" />
                </div>
                <div className="col-span-1">
                  <InputField label="Color (EN)" value={state.contract.carColorEn || ''} onChange={(e: any) => updateContract({carColorEn: e.target.value})} placeholder="e.g. WHITE" />
                </div>
                <div className="col-span-2">
                  <InputField label="Year" value={state.contract.carYear || ''} onChange={(e: any) => updateContract({carYear: e.target.value})} placeholder="e.g. 2020" />
                </div>
                <div className="col-span-1">
                  <InputField label="Plate No (KH)" value={state.contract.carPlateNoKh || ''} onChange={(e: any) => updateContract({carPlateNoKh: e.target.value})} placeholder="e.g. ភ្នំពេញ 2A-1234" />
                </div>
                <div className="col-span-1">
                  <InputField label="Plate No (EN)" value={state.contract.carPlateNoEn || ''} onChange={(e: any) => updateContract({carPlateNoEn: e.target.value})} placeholder="e.g. Phnom Penh 2A-1234" />
                </div>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/Dashboard.tsx', code);
  console.log("Patched dashboard fields");
} else {
  console.log("Could not find target in Dashboard.tsx");
}
