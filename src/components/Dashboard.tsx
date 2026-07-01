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
    if (v.includes('female') || v.includes('ស្រី')) return 'Female';
    if (v.includes('male') || v.includes('ប្រុស')) return 'Male';
    return val;
  };

  const normalizeNationality = (val: string) => {
    if (!val) return '';
    const v = val.toLowerCase();
    if (v.includes('cambodian') || v.includes('ខ្មែរ')) return 'Cambodian';
    if (v.includes('foreigner') || v.includes('បរទេស')) return 'Foreigner';
    if (v.includes('chinese') || v.includes('ចិន')) return 'Chinese';
    if (v.includes('vietnamese') || v.includes('វៀតណាម')) return 'Vietnamese';
    if (v.includes('thai') || v.includes('ថៃ')) return 'Thai';
    if (v.includes('korean') || v.includes('កូរ៉េ')) return 'Korean';
    if (v.includes('japanese') || v.includes('ជប៉ុន')) return 'Japanese';
    if (v.includes('american') || v.includes('អាមេរិក')) return 'American';
    if (v.includes('british') || v.includes('អង់គ្លេស')) return 'British';
    if (v.includes('french') || v.includes('បារាំង')) return 'French';
    if (v.includes('australian') || v.includes('អូស្ត្រាលី')) return 'Australian';
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
          <h3 className="text-sm font-bold text-slate-800">General Settings</h3>
        </div>
        <label className="text-xs text-slate-600 block mb-2 font-medium">Number of Tenants</label>
        <div className="flex bg-slate-100 p-1 rounded-lg text-sm font-medium text-slate-600">
          {[1, 2, 3, 4].map(num => (
            <button 
              key={num}
              onClick={() => handleNumTenantsChange(num)}
              className={`flex-1 py-2 rounded-md transition-all ${state.numTenants === num ? 'bg-white shadow font-bold text-slate-900 border border-slate-200' : 'hover:bg-slate-200'}`}
            >
              {num} {num === 1 ? 'Person' : 'People'}
            </button>
          ))}
        </div>
      </section>

      {/* Landlord Section */}
      <section className="bg-white border-t-4 border-blue-500 p-5 rounded-xl mb-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">Landlord Details</h3>
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
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Full Name (KH)</label>
            <input type="text" value={state.landlord.nameKh} onChange={e => updateLandlord({nameKh: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Full Name (EN)</label>
            <input type="text" value={state.landlord.nameEn} onChange={e => updateLandlord({nameEn: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Gender</label>
            <select value={normalizeGender(state.landlord.gender)} onChange={e => updateLandlord({gender: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Date of Birth</label>
            <input type="text" value={state.landlord.dob} onChange={e => updateLandlord({dob: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="DD/MM/YYYY" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Nationality</label>
            <select value={normalizeNationality(state.landlord.nationality)} onChange={e => updateLandlord({nationality: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1">
              <option value="">Select</option>
              <option value="Cambodian">Cambodian</option>
              <option value="Foreigner">Foreigner</option>
              <option value="Chinese">Chinese</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Thai">Thai</option>
              <option value="Korean">Korean</option>
              <option value="Japanese">Japanese</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="French">French</option>
              <option value="Australian">Australian</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">ID Number</label>
            <input type="text" value={state.landlord.idNumber} onChange={e => updateLandlord({idNumber: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
          </div>
          {state.landlord.showAddress && (
            <div className="col-span-2">
              <label className="text-xs text-slate-700 font-semibold block mb-0.5">Address</label>
              <input type="text" value={state.landlord.address} onChange={e => updateLandlord({address: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
            </div>
          )}
        </div>
      </section>

      {/* Tenants Section */}
      <section className="bg-white border-t-4 border-emerald-500 p-5 rounded-xl mb-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-800">Tenant Details</h3>
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
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">Full Name (KH)</label>
                  <input type="text" value={tenant.nameKh} onChange={e => updateTenant(index, {nameKh: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">Full Name (EN)</label>
                  <input type="text" value={tenant.nameEn} onChange={e => updateTenant(index, {nameEn: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" />
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">Gender</label>
                  <select value={normalizeGender(tenant.gender)} onChange={e => updateTenant(index, {gender: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">Date of Birth</label>
                  <input type="text" value={tenant.dob} onChange={e => updateTenant(index, {dob: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1" placeholder="DD/MM/YYYY" />
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">Nationality</label>
                  <select value={normalizeNationality(tenant.nationality)} onChange={e => updateTenant(index, {nationality: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-transparent border-b border-slate-400 focus:outline-none focus:border-indigo-500 pb-1">
                    <option value="">Select</option>
                    <option value="Cambodian">Cambodian</option>
                    <option value="Foreigner">Foreigner</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Vietnamese">Vietnamese</option>
                    <option value="Thai">Thai</option>
                    <option value="Korean">Korean</option>
                    <option value="Japanese">Japanese</option>
                    <option value="American">American</option>
                    <option value="British">British</option>
                    <option value="French">French</option>
                    <option value="Australian">Australian</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-slate-700 font-semibold block mb-0.5">ID Number</label>
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
          <h3 className="text-sm font-bold text-slate-800">Contract Terms</h3>
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
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Contract Date</label>
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
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">Cable TV</label>
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
