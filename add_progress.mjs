import fs from 'fs';
let dashboard = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

const progressComponent = `

const calculateProgress = (state: AppState) => {
  let filledCount = 0;
  let totalCount = 0;

  const checkFields = (obj: any, fields: string[]) => {
    fields.forEach(f => {
      totalCount++;
      if (obj[f] && obj[f].toString().trim() !== '') {
        filledCount++;
      }
    });
  };

  // Landlord fields
  checkFields(state.landlord, ['nameKh', 'gender', 'dob', 'idNumber', 'nationality']);
  if (state.landlord.showAddress) {
    checkFields(state.landlord, ['address']);
  }

  // Tenant fields
  state.tenants.forEach(tenant => {
    checkFields(tenant, ['nameKh', 'gender', 'dob', 'idNumber', 'nationality']);
  });

  // Contract fields
  const contractFieldsHouse = ['startDate', 'durationMonths', 'rentAmount', 'depositAmount', 'contractDate'];
  const contractFieldsCar = ['startDate', 'durationMonths', 'rentAmount', 'depositAmount', 'contractDate', 'carModel', 'carPlateNoKh', 'carFrameNo', 'carPurpose', 'carRentalArea', 'carCompensation'];

  if (state.contractType === 'car') {
    checkFields(state.contract, contractFieldsCar);
  } else {
    checkFields(state.contract, contractFieldsHouse);
    if (state.contract.showHouseNo) checkFields(state.contract, ['houseNoKh']);
    if (state.contract.showStreet) checkFields(state.contract, ['streetKh']);
    if (state.contract.showPhum) checkFields(state.contract, ['phumKh']);
    if (state.contract.showSangkat) checkFields(state.contract, ['sangkatKh']);
    if (state.contract.showKhan) checkFields(state.contract, ['khanKh']);
    if (state.contract.showCity) checkFields(state.contract, ['cityKh']);
  }

  return totalCount === 0 ? 0 : Math.round((filledCount / totalCount) * 100);
};

function ProgressIndicator({ state }: { state: AppState }) {
  const progress = calculateProgress(state);
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm ring-1 ring-slate-200 mb-4 flex items-center gap-4">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Form Completion</span>
          <span className="text-xs font-bold text-indigo-600">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: \`\${progress}%\` }}
            className={\`h-2.5 rounded-full \${progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}\`}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
      {progress === 100 && (
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
`;

dashboard = dashboard.replace(
  "export default function Dashboard({ state, setState, activeDashboardTab }: DashboardProps) {",
  progressComponent + "\nexport default function Dashboard({ state, setState, activeDashboardTab }: DashboardProps) {"
);

dashboard = dashboard.replace(
  '<div className="flex flex-col h-full w-full max-w-6xl mx-auto">\n      <div className="flex-1 overflow-y-auto pr-1 pb-10">',
  '<div className="flex flex-col h-full w-full max-w-6xl mx-auto">\n      <ProgressIndicator state={state} />\n      <div className="flex-1 overflow-y-auto pr-1 pb-10">'
);

fs.writeFileSync('src/components/Dashboard.tsx', dashboard);
