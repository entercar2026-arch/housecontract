import React, { useState, useEffect } from 'react';
import { AppState, LanguageMode, LandlordDetails, PersonDetails, ContractDetails } from '../types';
import IdScanner from './IdScanner';
import { Settings, User, Users, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const InputField = ({ label, value, onChange, placeholder = '', type = 'text', readOnly = false, actionBtn = null }: any) => (
  <div className="w-full relative">
    <label className="text-[11px] uppercase tracking-wider text-slate-600 font-bold block mb-1.5">{label}</label>
    <div className="flex gap-2">
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        readOnly={readOnly}
        className="w-full text-sm text-slate-900 font-medium bg-slate-50 border border-slate-200/60 shadow-sm focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400"
        placeholder={placeholder}
      />
      {actionBtn}
    </div>
  </div>
);

interface DashboardProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  activeDashboardTab: 'landlord' | 'tenant' | 'contract';
}



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
            animate={{ width: `${progress}%` }}
            className={`h-2.5 rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
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

export default function Dashboard({ state, setState, activeDashboardTab }: DashboardProps) {
  const [activeTenantTab, setActiveTenantTab] = useState(0);

  useEffect(() => {
    if (state.contractType === 'car') {
      setActiveTenantTab(0);
    }
  }, [state.contractType]);

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

  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto">
      <ProgressIndicator state={state} />
      <div className="flex-1 overflow-y-auto pr-1 pb-10">
        {activeDashboardTab === 'landlord' && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-none p-5 md:p-6 rounded-3xl shadow-sm ring-1 ring-slate-200 h-full max-h-full overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-800">{state.contractType === 'car' ? 'Car Owner Details' : 'Landlord Details'}</h3>
              </div>
              <label className="inline-flex items-center cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-colors">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={state.landlord.showAddress}
                  onChange={e => updateLandlord({showAddress: e.target.checked})}
                />
                <div className="relative w-8 h-4 bg-slate-200 rounded-full peer-checked:bg-indigo-100/500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-300 peer-checked:after:border-blue-500 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
                <span className="ml-2 text-xs font-semibold text-slate-600">Show Address</span>
              </label>
            </div>
            
            <div className="mb-6">
              <IdScanner label={state.contractType === 'car' ? 'Car Owner' : 'Landlord'} isSuccess={state.landlord.isScanned} onDataExtracted={(data) => updateLandlord({...data, isScanned: true})} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="col-span-2">
                <InputField label="Full Name (KH)" value={state.landlord.nameKh} onChange={(e: any) => updateLandlord({nameKh: e.target.value})} />
              </div>
              <div className="col-span-2">
                <InputField label="Full Name (EN)" value={state.landlord.nameEn} onChange={(e: any) => updateLandlord({nameEn: e.target.value})} />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="text-xs text-slate-700 font-semibold block mb-1">Gender</label>
                <div className="flex bg-slate-100 p-0.5 rounded-xl text-xs font-medium text-slate-600">
                  <button
                    type="button"
                    onClick={() => updateLandlord({gender: 'Male'})}
                    className={`flex-1 py-1 rounded-md transition-all ${normalizeGender(state.landlord.gender) === 'Male' ? 'bg-white shadow-sm font-bold text-slate-900 border border-slate-200' : 'hover:bg-slate-200'}`}
                  >Male</button>
                  <button
                    type="button"
                    onClick={() => updateLandlord({gender: 'Female'})}
                    className={`flex-1 py-1 rounded-md transition-all ${normalizeGender(state.landlord.gender) === 'Female' ? 'bg-white shadow-sm font-bold text-slate-900 border border-slate-200' : 'hover:bg-slate-200'}`}
                  >Female</button>
                </div>
              </div>
              <div className="col-span-1">
                <InputField label="Date of Birth" value={state.landlord.dob} onChange={(e: any) => updateLandlord({dob: e.target.value})} placeholder="DD/MM/YYYY" />
              </div>
              <div className="col-span-1">
                <InputField label="Nationality" value={state.landlord.nationality} onChange={(e: any) => updateLandlord({nationality: e.target.value})} />
              </div>
              <div className="col-span-2">
                <InputField label="ID Number" value={state.landlord.idNumber} onChange={(e: any) => updateLandlord({idNumber: e.target.value})} />
              </div>
              <div className="col-span-1">
                <InputField label="Issue Date" value={state.landlord.idIssueDate || ''} onChange={(e: any) => updateLandlord({idIssueDate: e.target.value})} placeholder="DD/MM/YYYY" />
              </div>
              <div className="col-span-1">
                <InputField label="Expiry Date" value={state.landlord.idExpiryDate || ''} onChange={(e: any) => updateLandlord({idExpiryDate: e.target.value})} placeholder="DD/MM/YYYY" />
              </div>
              {state.landlord.showAddress && (
                <div className="col-span-2 md:col-span-4 mt-2">
                  <InputField label="Address" value={state.landlord.address} onChange={(e: any) => updateLandlord({address: e.target.value})} />
                </div>
              )}
            </div>
          </motion.section>
        )}

      {activeDashboardTab === 'tenant' && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-none p-5 md:p-6 rounded-3xl shadow-sm ring-1 ring-slate-200 h-full max-h-full overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Tenant Details</h3>
            </div>
          </div>

          {state.contractType !== 'car' && (
            <div className="mb-6">
              <div className="flex bg-slate-50 p-1 rounded-xl text-sm font-medium text-slate-600 ring-1 ring-slate-200/60 overflow-hidden">
                {[0, 1, 2, 3].map(index => (
                  <button 
                    key={index}
                    onClick={() => setActiveTenantTab(index)}
                    className={`flex-1 py-2 rounded-xl transition-all ${activeTenantTab === index ? 'bg-emerald-50 shadow-sm border border-emerald-300/50 font-bold text-emerald-700' : 'hover:bg-slate-200/50 hover:text-slate-700'}`}
                  >
                    Tenant {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-5">
            <AnimatePresence mode="wait">
              {state.tenants[activeTenantTab] && (
                <motion.div 
                  key={activeTenantTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm ring-1 ring-emerald-50 relative mt-2"
                >
                  {state.contractType !== 'car' && (
                    <span className="absolute -top-3 -right-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">
                      Tenant {activeTenantTab + 1}
                    </span>
                  )}
                  
                  <div className="mb-6">
                    <IdScanner label={state.contractType === 'car' ? 'Tenant' : `Tenant ${activeTenantTab + 1}`} isSuccess={state.tenants[activeTenantTab].isScanned} onDataExtracted={(data) => updateTenant(activeTenantTab, {...data, isScanned: true})} />
                  </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="col-span-2">
                    <InputField label="Full Name (KH)" value={state.tenants[activeTenantTab].nameKh} onChange={(e: any) => updateTenant(activeTenantTab, {nameKh: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <InputField label="Full Name (EN)" value={state.tenants[activeTenantTab].nameEn} onChange={(e: any) => updateTenant(activeTenantTab, {nameEn: e.target.value})} />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="text-xs text-slate-700 font-semibold block mb-1">Gender</label>
                    <div className="flex bg-slate-100 p-0.5 rounded-xl text-xs font-medium text-slate-600">
                      <button
                        type="button"
                        onClick={() => updateTenant(activeTenantTab, {gender: 'Male'})}
                        className={`flex-1 py-1 rounded-md transition-all ${normalizeGender(state.tenants[activeTenantTab].gender) === 'Male' ? 'bg-white shadow-sm font-bold text-slate-900 border border-slate-200' : 'hover:bg-slate-200'}`}
                      >Male</button>
                      <button
                        type="button"
                        onClick={() => updateTenant(activeTenantTab, {gender: 'Female'})}
                        className={`flex-1 py-1 rounded-md transition-all ${normalizeGender(state.tenants[activeTenantTab].gender) === 'Female' ? 'bg-white shadow-sm font-bold text-slate-900 border border-slate-200' : 'hover:bg-slate-200'}`}
                      >Female</button>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <InputField label="Date of Birth" value={state.tenants[activeTenantTab].dob} onChange={(e: any) => updateTenant(activeTenantTab, {dob: e.target.value})} placeholder="DD/MM/YYYY" />
                  </div>
                  <div className="col-span-1">
                    <InputField label="Nationality" value={state.tenants[activeTenantTab].nationality} onChange={(e: any) => updateTenant(activeTenantTab, {nationality: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <InputField label="ID Number" value={state.tenants[activeTenantTab].idNumber} onChange={(e: any) => updateTenant(activeTenantTab, {idNumber: e.target.value})} />
                  </div>
                  <div className="col-span-1">
                    <InputField label="Issue Date" value={state.tenants[activeTenantTab].idIssueDate || ''} onChange={(e: any) => updateTenant(activeTenantTab, {idIssueDate: e.target.value})} placeholder="DD/MM/YYYY" />
                  </div>
                  <div className="col-span-1">
                    <InputField label="Expiry Date" value={state.tenants[activeTenantTab].idExpiryDate || ''} onChange={(e: any) => updateTenant(activeTenantTab, {idExpiryDate: e.target.value})} placeholder="DD/MM/YYYY" />
                  </div>
                </div>
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      )}

      {activeDashboardTab === 'contract' && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-none p-5 md:p-6 rounded-3xl mb-5 shadow-sm ring-1 ring-slate-200"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Contract Terms</h3>
            </div>

          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {state.contractType === 'house' && (
              <div className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <div className="flex items-center gap-1 mb-0.5">
                    <input type="checkbox" checked={state.contract.showUnitNo} onChange={e => updateContract({showUnitNo: e.target.checked})} className="w-3 h-3 text-indigo-600 bg-gray-100 border-slate-400 rounded focus:ring-indigo-500 cursor-pointer" />
                    <label className="text-[10px] text-slate-700 font-semibold truncate">បន្ទប់លេខ / Unit No</label>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={state.contract.unitNoKh} onChange={e => updateContract({unitNoKh: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="ខ្មែរ" />
                    <input type="text" value={state.contract.unitNoEn} onChange={e => updateContract({unitNoEn: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="English" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1">
                      <input type="checkbox" checked={state.contract.showHouseNo} onChange={e => updateContract({showHouseNo: e.target.checked})} className="w-3 h-3 text-indigo-600 bg-gray-100 border-slate-400 rounded focus:ring-indigo-500 cursor-pointer" />
                      <label className="text-[10px] text-slate-700 font-semibold truncate">ផ្ទះលេខ / House No</label>
                    </div>
                    <button type="button" onClick={() => updateContract({houseNoKh: '..............................', houseNoEn: '..............................'})} className="text-[9px] px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 transition-colors tracking-widest">......</button>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={state.contract.houseNoKh} onChange={e => updateContract({houseNoKh: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="ខ្មែរ" />
                    <input type="text" value={state.contract.houseNoEn} onChange={e => updateContract({houseNoEn: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="English" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1">
                      <input type="checkbox" checked={state.contract.showStreet} onChange={e => updateContract({showStreet: e.target.checked})} className="w-3 h-3 text-indigo-600 bg-gray-100 border-slate-400 rounded focus:ring-indigo-500 cursor-pointer" />
                      <label className="text-[10px] text-slate-700 font-semibold truncate">ផ្លូវ / Street</label>
                    </div>
                    <div className="flex gap-1.5">
                      <button type="button" onClick={() => updateContract({streetKh: 'លំ', streetEn: 'Lum'})} className="text-[9px] px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 transition-colors font-semibold">លំ / Lum</button>
                      <button type="button" onClick={() => updateContract({streetKh: '..............................', streetEn: '..............................'})} className="text-[9px] px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 transition-colors tracking-widest">......</button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={state.contract.streetKh} onChange={e => updateContract({streetKh: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="លំ" />
                    <input type="text" value={state.contract.streetEn} onChange={e => updateContract({streetEn: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="Lum" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-1 mb-0.5">
                    <input type="checkbox" checked={state.contract.showPhum} onChange={e => updateContract({showPhum: e.target.checked})} className="w-3 h-3 text-indigo-600 bg-gray-100 border-slate-400 rounded focus:ring-indigo-500 cursor-pointer" />
                    <label className="text-[10px] text-slate-700 font-semibold truncate">ភូមិ / Phum</label>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={state.contract.phumKh} onChange={e => updateContract({phumKh: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="ខ្មែរ" />
                    <input type="text" value={state.contract.phumEn} onChange={e => updateContract({phumEn: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="English" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1">
                      <input type="checkbox" checked={state.contract.showSangkat} onChange={e => updateContract({showSangkat: e.target.checked})} className="w-3 h-3 text-indigo-600 bg-gray-100 border-slate-400 rounded focus:ring-indigo-500 cursor-pointer" />
                      <label className="text-[10px] text-slate-700 font-semibold truncate">សង្កាត់ / Sangkat</label>
                    </div>
                    <button type="button" onClick={() => updateContract({sangkatKh: '..............................', sangkatEn: '..............................'})} className="text-[9px] px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 transition-colors tracking-widest">......</button>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={state.contract.sangkatKh} onChange={e => updateContract({sangkatKh: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="ខ្មែរ" />
                    <input type="text" value={state.contract.sangkatEn} onChange={e => updateContract({sangkatEn: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="English" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1">
                      <input type="checkbox" checked={state.contract.showKhan} onChange={e => updateContract({showKhan: e.target.checked})} className="w-3 h-3 text-indigo-600 bg-gray-100 border-slate-400 rounded focus:ring-indigo-500 cursor-pointer" />
                      <label className="text-[10px] text-slate-700 font-semibold truncate">ខណ្ឌ / Khan</label>
                    </div>
                    <button type="button" onClick={() => updateContract({khanKh: '..............................', khanEn: '..............................'})} className="text-[9px] px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 transition-colors tracking-widest">......</button>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={state.contract.khanKh} onChange={e => updateContract({khanKh: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="ខ្មែរ" />
                    <input type="text" value={state.contract.khanEn} onChange={e => updateContract({khanEn: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="English" />
                  </div>
                </div>
                <div className="col-span-2 md:col-span-4">
                  <div className="flex items-center gap-1 mb-0.5">
                    <input type="checkbox" checked={state.contract.showCity} onChange={e => updateContract({showCity: e.target.checked})} className="w-3 h-3 text-indigo-600 bg-gray-100 border-slate-400 rounded focus:ring-indigo-500 cursor-pointer" />
                    <label className="text-[10px] text-slate-700 font-semibold truncate">រាជធានី / City</label>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={state.contract.cityKh} onChange={e => updateContract({cityKh: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="ភ្នំពេញ" />
                    <input type="text" value={state.contract.cityEn} onChange={e => updateContract({cityEn: e.target.value})} className="w-full text-xs text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="Phnom Penh" />
                  </div>
                </div>
              </div>
            )}
            
            {state.contractType === 'car' && (
              <div className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 md:col-span-4 mb-2">
                  <IdScanner 
                    label="កាតគ្រីរថយន្ដ / Car Registration" 
                    type="car" 
                    onDataExtracted={(data) => updateContract(data)} 
                  />
                </div>
                <div className="col-span-2">
                  <InputField label="Car Model" value={state.contract.carModel || ''} onChange={(e: any) => updateContract({carModel: e.target.value})} placeholder="e.g. Toyota Prius" />
                </div>
                <div className="col-span-1">
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
                </div>
                <div className="col-span-2">
                  <InputField label="Frame No" value={state.contract.carFrameNo || ''} onChange={(e: any) => updateContract({carFrameNo: e.target.value})} placeholder="e.g. ZVW30-xxxxxx" />
                </div>
                <div className="col-span-2">
                  <InputField label="Engine No" value={state.contract.carEngineNo || ''} onChange={(e: any) => updateContract({carEngineNo: e.target.value})} placeholder="e.g. 2ZR-FXE" />
                </div>
                
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-0.5">
                    <label className="text-xs text-slate-700 font-semibold uppercase">Rental Purpose</label>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => updateContract({carPurpose: 'Personal Use'})} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-bold transition-colors">Personal Use</button>
                      <button type="button" onClick={() => updateContract({carPurpose: 'Company Use'})} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-bold transition-colors">Company Use</button>
                      <button type="button" onClick={() => updateContract({carPurpose: 'Trip'})} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-bold transition-colors">Trip</button>
                    </div>
                  </div>
                  <input type="text" className="w-full text-sm font-medium bg-white/50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-400 focus:bg-white transition-colors" value={state.contract.carPurpose || ''} onChange={(e) => updateContract({carPurpose: e.target.value})} placeholder="e.g. Personal Use" />
                </div>

                
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-0.5">
                    <label className="text-xs text-slate-700 font-semibold uppercase">Rental Area</label>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => updateContract({carRentalArea: 'Phnom Penh'})} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-bold transition-colors">Phnom Penh</button>
                      <button type="button" onClick={() => updateContract({carRentalArea: 'Phnom Penh - Provinces'})} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-bold transition-colors">PP - Prov</button>
                    </div>
                  </div>
                  <input type="text" className="w-full text-sm font-medium bg-white/50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-400 focus:bg-white transition-colors" value={state.contract.carRentalArea || ''} onChange={(e) => updateContract({carRentalArea: e.target.value})} placeholder="e.g. Phnom Penh" />
                </div>

              </div>
            )}
          <div className="col-span-1">
            <InputField label="Monthly Rent $" value={state.contract.rentAmount} onChange={(e: any) => updateContract({rentAmount: e.target.value})} placeholder="500" />
          </div>
          <div className="col-span-1">
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs text-slate-700 font-semibold">Duration (Mo)</label>
              <div className="flex gap-1">
                <button type="button" onClick={() => updateContract({durationMonths: '3'})} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-bold transition-colors">3</button>
                <button type="button" onClick={() => updateContract({durationMonths: '6'})} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-bold transition-colors">6</button>
                <button type="button" onClick={() => updateContract({durationMonths: '12'})} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-bold transition-colors">12</button>
              </div>
            </div>
            <input type="text" value={state.contract.durationMonths} onChange={e => updateContract({durationMonths: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="12" />
          </div>
          <div className="col-span-1">
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
          </div>
          <div className="col-span-1">
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs text-slate-700 font-semibold">Start Date</label>
              <div className="flex gap-1">
                <button type="button" onClick={() => {
                  const d = new Date();
                  const day = d.getDate().toString().padStart(2, '0');
                  const month = (d.getMonth() + 1).toString().padStart(2, '0');
                  const year = d.getFullYear();
                  updateContract({startDate: `${day}/${month}/${year}`});
                }} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-semibold transition-colors">ថ្ងៃនេះ</button>
                <button type="button" onClick={() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 1);
                  const day = d.getDate().toString().padStart(2, '0');
                  const month = (d.getMonth() + 1).toString().padStart(2, '0');
                  const year = d.getFullYear();
                  updateContract({startDate: `${day}/${month}/${year}`});
                }} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-semibold transition-colors">ថ្ងៃស្អែក</button>
              </div>
            </div>
            <input type="text" value={state.contract.startDate} onChange={e => updateContract({startDate: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="DD/MM/YYYY" />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-slate-700 font-semibold block mb-0.5">End Date (Auto)</label>
            <input type="text" readOnly value={(() => {
              if (state.contract.startDate && state.contract.durationMonths) {
                const parts = state.contract.startDate.split('/');
                if (parts.length === 3) {
                  const [day, month, year] = parts;
                  const start = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                  if (!isNaN(start.getTime())) {
                    start.setMonth(start.getMonth() + parseInt(state.contract.durationMonths));
                    start.setDate(start.getDate() - 1);
                    return `${start.getDate().toString().padStart(2, '0')}/${(start.getMonth() + 1).toString().padStart(2, '0')}/${start.getFullYear()}`;
                  }
                }
              }
              return '';
            })()} className="w-full text-sm text-slate-600 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none pb-1" placeholder="DD/MM/YYYY" />
          </div>
          <div className="col-span-2">
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs text-slate-700 font-semibold">Contract Date</label>
              <div className="flex gap-1">
                <button type="button" onClick={() => {
                  const d = new Date();
                  const day = d.getDate().toString().padStart(2, '0');
                  const month = (d.getMonth() + 1).toString().padStart(2, '0');
                  const year = d.getFullYear();
                  updateContract({contractDate: `${day}/${month}/${year}`});
                }} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-semibold transition-colors">ថ្ងៃនេះ</button>
                <button type="button" onClick={() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 1);
                  const day = d.getDate().toString().padStart(2, '0');
                  const month = (d.getMonth() + 1).toString().padStart(2, '0');
                  const year = d.getFullYear();
                  updateContract({contractDate: `${day}/${month}/${year}`});
                }} className="px-1.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] text-slate-700 font-semibold transition-colors">ថ្ងៃស្អែក</button>
              </div>
            </div>
            <input type="text" value={state.contract.contractDate} onChange={e => updateContract({contractDate: e.target.value})} className="w-full text-sm text-slate-900 font-medium bg-orange-200 border border-orange-300 rounded-lg px-2.5 py-1.5 shadow-none focus:bg-white focus:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-500 pb-1" placeholder="DD/MM/YYYY" />
          </div>
        </div>

        {state.contractType === 'house' && (
          <div className="mt-4 pt-4 border-t border-amber-200/60 grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <InputField label="Water" value={state.contract.waterUtility} onChange={(e: any) => updateContract({waterUtility: e.target.value})} placeholder="e.g. $5/month or $5/person" />
              <div className="flex gap-1 mt-1">
                <button type="button" onClick={() => updateContract({waterUtility: '$5/month'})} className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] rounded border border-indigo-200 transition-colors">$5/month</button>
                <button type="button" onClick={() => updateContract({waterUtility: '$5/person'})} className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] rounded border border-indigo-200 transition-colors">$5/person</button>
              </div>
            </div>
            <div className="col-span-1">
              <InputField label="Electricity" value={state.contract.electricityUtility} onChange={(e: any) => updateContract({electricityUtility: e.target.value})} placeholder="e.g. $0.25/kwh or $0.30/kwh" />
              <div className="flex gap-1 mt-1">
                <button type="button" onClick={() => updateContract({electricityUtility: '$0.25/kwh'})} className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] rounded border border-indigo-200 transition-colors">$0.25/kwh</button>
                <button type="button" onClick={() => updateContract({electricityUtility: '$0.30/kwh'})} className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] rounded border border-indigo-200 transition-colors">$0.30/kwh</button>
              </div>
            </div>
            <div className="col-span-1">
              <InputField label="Cable TV" value={state.contract.cableTvUtility} onChange={(e: any) => updateContract({cableTvUtility: e.target.value})} placeholder="e.g. Free or None" />
              <div className="flex gap-1 mt-1">
                <button type="button" onClick={() => updateContract({cableTvUtility: 'Free'})} className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] rounded border border-indigo-200 transition-colors">Free</button>
                <button type="button" onClick={() => updateContract({cableTvUtility: 'None'})} className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] rounded border border-indigo-200 transition-colors">None</button>
              </div>
            </div>
            <div className="col-span-1">
              <InputField label="Internet" value={state.contract.internetUtility} onChange={(e: any) => updateContract({internetUtility: e.target.value})} placeholder="e.g. Free or None" />
              <div className="flex gap-1 mt-1">
                <button type="button" onClick={() => updateContract({internetUtility: 'Free'})} className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] rounded border border-indigo-200 transition-colors">Free</button>
                <button type="button" onClick={() => updateContract({internetUtility: 'None'})} className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] rounded border border-indigo-200 transition-colors">None</button>
              </div>
            </div>
            <div className="col-span-2 mt-2 pt-2 border-t border-slate-100">
              <div className="flex items-center mb-2">
                <input type="checkbox" checked={state.contract.otherUtility1Enabled} onChange={e => updateContract({otherUtility1Enabled: e.target.checked})} className="w-4 h-4 text-indigo-600 bg-gray-100 border-slate-400 rounded focus:ring-indigo-500 cursor-pointer" id="enable-other-1" />
                <label htmlFor="enable-other-1" className="ml-2 text-sm font-semibold text-slate-700 cursor-pointer">Optional Service 1</label>
              </div>
              {state.contract.otherUtility1Enabled && (
                <div className="grid grid-cols-2 gap-3 pl-6">
                  <div>
                    <InputField label="Service Name" value={state.contract.otherUtility1Name} onChange={(e: any) => updateContract({otherUtility1Name: e.target.value})} placeholder="e.g. Garbage Collection" />
                  </div>
                  <div>
                    <InputField label="Price/Value" value={state.contract.otherUtility1Price} onChange={(e: any) => updateContract({otherUtility1Price: e.target.value})} placeholder="e.g. 5$" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="col-span-2 mt-1">
              <div className="flex items-center mb-2">
                <input type="checkbox" checked={state.contract.otherUtility2Enabled} onChange={e => updateContract({otherUtility2Enabled: e.target.checked})} className="w-4 h-4 text-indigo-600 bg-gray-100 border-slate-400 rounded focus:ring-indigo-500 cursor-pointer" id="enable-other-2" />
                <label htmlFor="enable-other-2" className="ml-2 text-sm font-semibold text-slate-700 cursor-pointer">Optional Service 2</label>
              </div>
              {state.contract.otherUtility2Enabled && (
                <div className="grid grid-cols-2 gap-3 pl-6">
                  <div>
                    <InputField label="Service Name" value={state.contract.otherUtility2Name} onChange={(e: any) => updateContract({otherUtility2Name: e.target.value})} placeholder="e.g. Parking" />
                  </div>
                  <div>
                    <InputField label="Price/Value" value={state.contract.otherUtility2Price} onChange={(e: any) => updateContract({otherUtility2Price: e.target.value})} placeholder="e.g. 10$" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.section>
      )}
      </div>
    </div>
  );
}
