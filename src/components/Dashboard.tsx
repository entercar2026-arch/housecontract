import React from 'react';
import { AppState, LanguageMode, LandlordDetails, PersonDetails, ContractDetails } from '../types';
import IdScanner from './IdScanner';
import { Settings, User, Users, FileText, Printer } from 'lucide-react';

interface DashboardProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export default function Dashboard({ state, setState }: DashboardProps) {
  const normalizeGender = (val: string) => {
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
  };
  
  const updateLandlord = (updates: Partial<LandlordDetails>) => {
    setState(prev => ({ ...prev, landlord: { ...prev.landlord, ...updates } }));
  };

  const updateTenant = (index: number, updates: Partial<PersonDetails>) => {
    const newTenants = [...state.tenants];
    newTenants[index] = { ...newTenants[index], ...updates };
    setState(prev => ({ ...prev, tenants: newTenants }));
  };

  const updateContract = (updates: Partial<ContractDetails>) => {
    setState(prev => ({ ...prev, contract: { ...prev.contract, ...updates } }));
  };

  const handleNumTenantsChange = (num: number) => {
    let newTenants = [...state.tenants];
    if (num > newTenants.length) {
      for (let i = newTenants.length; i < num; i++) {
        newTenants.push({ nameKh: '', nameEn: '', gender: '', dob: '', idNumber: '', nationality: '' });
      }
    } else {
      newTenants = newTenants.slice(0, num);
    }
    setState(prev => ({ ...prev, numTenants: num, tenants: newTenants }));
  };

  const handleClear = () => {
    if (window.confirm('តើអ្នកពិតជាចង់លុបទិន្នន័យទាំងអស់មែនទេ? (Are you sure you want to clear all data?)')) {
      setState({
        language: state.language,
        landlord: {
          nameKh: '', nameEn: '', gender: '', dob: '', idNumber: '', nationality: '', address: '', showAddress: false,
        },
        tenants: Array.from({ length: state.numTenants }, () => ({
          nameKh: '', nameEn: '', gender: '', dob: '', idNumber: '', nationality: ''
        })),
        numTenants: state.numTenants,
        contract: {
          houseAddress: '', rentAmount: '', depositMonths: '', depositAmount: '', startDate: '', durationMonths: '', waterUtility: '', electricityUtility: '', cableTvUtility: '', internetUtility: '', contractDate: '',
        }
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-slate-800 text-lg">Form Details</h2>
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-red-100 transition-colors border border-red-100"
          >
            Clear All
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </div>
      </div>

      {/* Settings */}
      <section className="bg-white border-t-4 border-slate-500 p-5 rounded-xl mb-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-800">General Settings | ការកំណត់ទូទៅ</h3>
        </div>
        <label className="text-xs text-slate-600 block mb-2 font-medium">Number of Tenants | ចំនួនអ្នកជួល</label>
        <div className="flex bg-slate-100 p-1 rounded-lg text-sm font-medium text-slate-600">
          {[1, 2, 3, 4].map(num => (
            <button 
              key={num}
              onClick={() => handleNumTenantsChange(num)}
              className={`flex-1 py-2 rounded-md transition-all ${state.numTenants === num ? 'bg-white shadow font-bold text-slate-900 border border-slate-200' : 'hover:bg-slate-200'}`}
            >
              {num} {num === 1 ? 'នាក់ (Person)' : 'នាក់ (People)'}
            </button>
          ))}
        </div>
      </section>

      {/* Landlord Section */}
      <section className="bg-white border-t-4 border-blue-500 p-5 rounded-xl mb-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">Landlord Details | ភាគីម្ចាស់ផ្ទះ</h3>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={state.landlord.showAddress}
              onChange={e => updateLandlord({showAddress: e.target.checked})}
            />
            <div className="relative w-8 h-4 bg-gray-200 rounded-full peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
            <span className="ml-2 text-[10px] font-medium text-slate-500">Show Address</span>
          </label>
        </div>
        
        <div className="mb-4">
          <IdScanner label="Landlord" onDataExtracted={updateLandlord} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Full Name KH | ឈ្មោះជាភាសាខ្មែរ</label>
            <input type="text" value={state.landlord.nameKh} onChange={e => updateLandlord({nameKh: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Full Name EN | ឈ្មោះជាភាសាអង់គ្លេស</label>
            <input type="text" value={state.landlord.nameEn} onChange={e => updateLandlord({nameEn: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Gender | ភេទ</label>
            <select value={normalizeGender(state.landlord.gender)} onChange={e => updateLandlord({gender: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1">
              <option value="">ជ្រើសរើស / Select</option>
              <option value="ប្រុស / Male">ប្រុស / Male</option>
              <option value="ស្រី / Female">ស្រី / Female</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">DOB | ថ្ងៃខែឆ្នាំកំណើត</label>
            <input type="text" value={state.landlord.dob} onChange={e => updateLandlord({dob: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="DD/MM/YYYY" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Nationality | សញ្ជាតិ</label>
            <select value={normalizeNationality(state.landlord.nationality)} onChange={e => updateLandlord({nationality: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1">
              <option value="">ជ្រើសរើស / Select</option>
              <option value="ខ្មែរ / Cambodian">ខ្មែរ / Cambodian</option>
              <option value="បរទេស / Foreigner">បរទេស / Foreigner</option>
              <option value="ចិន / Chinese">ចិន / Chinese</option>
              <option value="វៀតណាម / Vietnamese">វៀតណាម / Vietnamese</option>
              <option value="ថៃ / Thai">ថៃ / Thai</option>
              <option value="កូរ៉េ / Korean">កូរ៉េ / Korean</option>
              <option value="ជប៉ុន / Japanese">ជប៉ុន / Japanese</option>
              <option value="អាមេរិក / American">អាមេរិក / American</option>
              <option value="អង់គ្លេស / British">អង់គ្លេស / British</option>
              <option value="បារាំង / French">បារាំង / French</option>
              <option value="អូស្ត្រាលី / Australian">អូស្ត្រាលី / Australian</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">ID Number | លេខអត្តសញ្ញាណ</label>
            <input type="text" value={state.landlord.idNumber} onChange={e => updateLandlord({idNumber: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
          </div>
          {state.landlord.showAddress && (
            <div className="col-span-2">
              <label className="text-xs text-slate-700 font-semibold block mb-0.5">Address | អាស័យដ្ឋានស្នាក់នៅ</label>
              <input type="text" value={state.landlord.address} onChange={e => updateLandlord({address: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
            </div>
          )}
        </div>
      </section>

      {/* Tenants Section */}
      <section className="bg-white border-t-4 border-emerald-500 p-5 rounded-xl mb-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-800">Tenant Details | ភាគីអ្នកជួល</h3>
        </div>

        <div className="space-y-5">
          {state.tenants.map((tenant, index) => (
            <div key={index} className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100 relative mt-2 shadow-sm">
              <span className="absolute -top-3 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                Tenant {index + 1}
              </span>
              
              <div className="mb-4">
                <IdScanner label={`Tenant ${index + 1}`} onDataExtracted={(data) => updateTenant(index, data)} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">Full Name KH | ឈ្មោះជាភាសាខ្មែរ</label>
                  <input type="text" value={tenant.nameKh} onChange={e => updateTenant(index, {nameKh: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">Full Name EN | ឈ្មោះជាភាសាអង់គ្លេស</label>
                  <input type="text" value={tenant.nameEn} onChange={e => updateTenant(index, {nameEn: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">Gender | ភេទ</label>
                  <select value={normalizeGender(tenant.gender)} onChange={e => updateTenant(index, {gender: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1">
                    <option value="">ជ្រើសរើស / Select</option>
                    <option value="ប្រុស / Male">ប្រុស / Male</option>
                    <option value="ស្រី / Female">ស្រី / Female</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">DOB | ថ្ងៃខែឆ្នាំកំណើត</label>
                  <input type="text" value={tenant.dob} onChange={e => updateTenant(index, {dob: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="DD/MM/YYYY" />
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">Nationality | សញ្ជាតិ</label>
                  <select value={normalizeNationality(tenant.nationality)} onChange={e => updateTenant(index, {nationality: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1">
                    <option value="">ជ្រើសរើស / Select</option>
                    <option value="ខ្មែរ / Cambodian">ខ្មែរ / Cambodian</option>
                    <option value="បរទេស / Foreigner">បរទេស / Foreigner</option>
                    <option value="ចិន / Chinese">ចិន / Chinese</option>
                    <option value="វៀតណាម / Vietnamese">វៀតណាម / Vietnamese</option>
                    <option value="ថៃ / Thai">ថៃ / Thai</option>
                    <option value="កូរ៉េ / Korean">កូរ៉េ / Korean</option>
                    <option value="ជប៉ុន / Japanese">ជប៉ុន / Japanese</option>
                    <option value="អាមេរិក / American">អាមេរិក / American</option>
                    <option value="អង់គ្លេស / British">អង់គ្លេស / British</option>
                    <option value="បារាំង / French">បារាំង / French</option>
                    <option value="អូស្ត្រាលី / Australian">អូស្ត្រាលី / Australian</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">ID Number | លេខអត្តសញ្ញាណ</label>
                  <input type="text" value={tenant.idNumber} onChange={e => updateTenant(index, {idNumber: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contract Terms Section */}
      <section className="bg-white border-t-4 border-amber-500 p-5 rounded-xl mb-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-800">Contract Terms | លក្ខខណ្ឌកិច្ចសន្យា</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">House Address | អាស័យដ្ឋានផ្ទះជួល</label>
            <input type="text" value={state.contract.houseAddress} onChange={e => updateContract({houseAddress: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Monthly Rent $ | តម្លៃជួល</label>
            <input type="text" value={state.contract.rentAmount} onChange={e => updateContract({rentAmount: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="500" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Duration (Mo) | រយៈពេលជួល</label>
            <input type="text" value={state.contract.durationMonths} onChange={e => updateContract({durationMonths: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="12" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Deposit (Mo) | កក់ចំនួនខែ</label>
            <input type="text" value={state.contract.depositMonths} onChange={e => updateContract({depositMonths: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="1" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Total Deposit $ | ប្រាក់កក់សរុប</label>
            <input type="text" value={state.contract.depositAmount} onChange={e => updateContract({depositAmount: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="500" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Start Date | ថ្ងៃចាប់ផ្តើមជួល</label>
            <input type="text" value={state.contract.startDate} onChange={e => updateContract({startDate: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="DD/MM/YYYY" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Contract Date | ថ្ងៃធ្វើកិច្ចសន្យា</label>
            <input type="text" value={state.contract.contractDate} onChange={e => updateContract({contractDate: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="DD/MM/YYYY" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-amber-200/60 grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Water | ទឹក</label>
            <input type="text" value={state.contract.waterUtility} onChange={e => updateContract({waterUtility: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="2000 Riel/m3" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Electricity | ភ្លើង</label>
            <input type="text" value={state.contract.electricityUtility} onChange={e => updateContract({electricityUtility: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="1000 Riel/kWh" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Cable TV | ខ្សែកាប</label>
            <input type="text" value={state.contract.cableTvUtility} onChange={e => updateContract({cableTvUtility: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Internet | អ៊ិនធឺណិត</label>
            <input type="text" value={state.contract.internetUtility} onChange={e => updateContract({internetUtility: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
          </div>
        </div>
      </section>
    </>
  );
}
