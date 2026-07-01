import React, { useState } from 'react';
import { AppState } from './types';
import Dashboard from './components/Dashboard';
import ContractPreview from './components/ContractPreview';

export default function App() {
  const [state, setState] = useState<AppState>({
    language: 'bilingual',
    landlord: {
      nameKh: '',
      nameEn: '',
      gender: '',
      dob: '',
      idNumber: '',
      nationality: '',
      address: '',
      showAddress: false,
    },
    tenants: [
      {
        nameKh: '',
        nameEn: '',
        gender: '',
        dob: '',
        idNumber: '',
        nationality: '',
      }
    ],
    numTenants: 1,
    contract: {
      houseAddress: '',
      rentAmount: '',
      depositMonths: '',
      depositAmount: '',
      startDate: '',
      durationMonths: '',
      waterUtility: '',
      electricityUtility: '',
      cableTvUtility: '',
      internetUtility: '',
      contractDate: '',
    }
  });

  return (
    <div className="flex flex-col h-screen w-full bg-[#f8fafc] text-slate-800 font-sans overflow-hidden">
      <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">CP</div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 underline decoration-indigo-500 decoration-2">
            CONTRACT PRO <span className="font-normal text-slate-400 font-khmer">| កិច្ចសន្យា</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setState(prev => ({...prev, language: 'bilingual'}))}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold ${state.language === 'bilingual' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-100 text-slate-600 border border-transparent'}`}>Bilingual (ពីរភាសា)</button>
          <button 
            onClick={() => setState(prev => ({...prev, language: 'km'}))}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold ${state.language === 'km' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-100 text-slate-600 border border-transparent'}`}>Khmer Only</button>
          <button 
            onClick={() => setState(prev => ({...prev, language: 'en'}))}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold ${state.language === 'en' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-100 text-slate-600 border border-transparent'}`}>English Only</button>
        </div>
      </nav>
      <main className="flex flex-1 overflow-hidden">
        <aside className="w-[380px] lg:w-[450px] bg-white border-r border-slate-200 p-5 flex flex-col gap-5 overflow-y-auto print:hidden">
          <Dashboard state={state} setState={setState} />
        </aside>
        <section className="flex-1 bg-slate-200 p-8 flex justify-center items-start overflow-y-auto print:p-0 print:bg-white print:overflow-visible">
          <ContractPreview state={state} />
        </section>
      </main>
    </div>
  );
}
