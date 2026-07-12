import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import Dashboard from './components/Dashboard';
import ContractPreview from './components/ContractPreview';
import { InvoiceReceipt } from './components/InvoiceReceipt';
import { Edit, Eye, RotateCcw, User, Users, FileText, AlertTriangle, ChevronDown, Home, Car, Receipt, Monitor, FileCode, Calendar } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import * as htmlToImage from 'html-to-image';

const DualFlag = ({ left, right, className = "w-6 h-4" }: { left: string, right: string, className?: string }) => (
  <div className={`relative rounded-sm overflow-hidden shadow-sm flex-shrink-0 ${className}`}>
    <img src={`https://flagcdn.com/w40/${right}.png`} alt={right} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 border border-black/10 rounded-sm"></div>
  </div>
);

export default function App() {
  const today = new Date();
  const defaultDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'invoice'>('form');
  const [activeDashboardTab, setActiveDashboardTab] = useState<'agenda' | 'landlord' | 'tenant' | 'contract'>('agenda');
  const [printMode, setPrintMode] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
  const [isFormMenuOpen, setIsFormMenuOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [invoiceKey, setInvoiceKey] = useState(0);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const [state, setState] = useState<AppState>({
    contractType: 'house',
    language: 'en',
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
    tenants: Array.from({ length: 4 }, () => ({
      nameKh: '',
      nameEn: '',
      gender: '',
      dob: '',
      idNumber: '',
      nationality: '',
    })),
    numTenants: 1,
    contract: {
      unitNoKh: '', unitNoEn: '', showUnitNo: false,
      houseNoKh: '', houseNoEn: '', showHouseNo: true,
      streetKh: '', streetEn: '', showStreet: true,
      phumKh: '', phumEn: '', showPhum: true,
      sangkatKh: '', sangkatEn: '', showSangkat: true,
      khanKh: '', khanEn: '', showKhan: true,
      cityKh: 'ភ្នំពេញ', cityEn: 'Phnom Penh', showCity: true,
      rentAmount: '',
      depositMonths: '',
      depositAmount: '',
      startDate: '',
      durationMonths: '',
      waterUtility: '',
      electricityUtility: '',
      cableTvUtility: '',
      internetUtility: '',
      otherUtility1Enabled: false,
      otherUtility1Name: '',
      otherUtility1Price: '',
      otherUtility2Enabled: false,
      otherUtility2Name: '',
      otherUtility2Price: '',
      contractDate: defaultDate,
    }
  });

    const handleDownloadImage = async () => {
    setIsGeneratingImage(true);
    const activeElement = (activeTab === 'invoice'
      ? document.getElementById('invoice-card')
      : document.getElementById('printable-contract-p1') || document.getElementById('printable-area')?.firstElementChild) as HTMLElement;

    if (!activeElement) {
      setIsGeneratingImage(false);
      return;
    }

    // Create a temporary hidden container to render the clone in its native, unscaled state
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-99999px';
    wrapper.style.top = '0';
    wrapper.style.background = '#ffffff';
    wrapper.style.zIndex = '-9999';
    wrapper.style.zoom = '1';
    wrapper.style.transform = 'none';

    // Set standard dimensions to prevent any responsive scaling
    const isInvoice = activeTab === 'invoice';
    const width = '210mm';
    const height = isInvoice ? '148.5mm' : '297mm';
    
    wrapper.style.width = width;
    wrapper.style.height = height;

    // Clone the element
    const clone = activeElement.cloneNode(true) as HTMLElement;
    
    // Clear any scaling/zoom/margin styles on the clone itself
    clone.style.transform = 'none';
    clone.style.scale = '1';
    clone.style.zoom = '1';
    clone.style.margin = '0';
    clone.style.width = width;
    clone.style.height = height;
    clone.style.boxShadow = 'none';
    clone.style.borderRadius = '0';

    // Copy input/textarea/select values from original to the clone (cloneNode doesn't copy current dynamic values)
    const originalInputs = activeElement.querySelectorAll('input, select, textarea');
    const clonedInputs = clone.querySelectorAll('input, select, textarea');
    originalInputs.forEach((input, index) => {
      const originalVal = (input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
      const clonedInput = clonedInputs[index] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (clonedInput) {
        clonedInput.value = originalVal;
      }
    });

    // Hide interactive elements and buttons that shouldn't appear in the saved image
    const printHiddenElements = clone.querySelectorAll('.print\\:hidden');
    printHiddenElements.forEach((el) => {
      (el as HTMLElement).style.setProperty('display', 'none', 'important');
    });

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Wait a brief moment for images to render/load in the clone
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const dataUrl = await htmlToImage.toPng(clone, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        style: {
          transform: 'none',
          boxShadow: 'none'
        }
      });
      
      const link = document.createElement('a');
      link.download = activeTab === 'invoice' ? 'invoice.png' : 'contract.png';
      link.href = dataUrl;
      link.click();
    } catch (err: any) {
      console.error('Failed to generate image', err);
      alert('Failed to save image: ' + (err?.message || err));
    } finally {
      document.body.removeChild(wrapper);
      setIsGeneratingImage(false);
    }
  };

  const handleClear = () => {
    if (activeTab === 'invoice') {
      setInvoiceKey(prev => prev + 1);
      setShowClearConfirm(false);
      return;
    }
    setState({
      language: state.language,
      landlord: {
        nameKh: '', nameEn: '', gender: '', dob: '', idNumber: '', idIssueDate: '', idExpiryDate: '', nationality: '', address: '', showAddress: false,
      },
      tenants: Array.from({ length: 4 }, () => ({
        nameKh: '', nameEn: '', gender: '', dob: '', idNumber: '', idIssueDate: '', idExpiryDate: '', nationality: ''
      })),
      numTenants: 1,
      contract: {
        unitNoKh: '', unitNoEn: '', showUnitNo: false,
        houseNoKh: '', houseNoEn: '', showHouseNo: true,
        streetKh: '', streetEn: '', showStreet: true,
        phumKh: '', phumEn: '', showPhum: true,
        sangkatKh: '', sangkatEn: '', showSangkat: true,
        khanKh: '', khanEn: '', showKhan: true,
        cityKh: 'ភ្នំពេញ', cityEn: 'Phnom Penh', showCity: true,
        rentAmount: '',
        depositMonths: '',
        depositAmount: '',
        startDate: '',
        durationMonths: '',
        waterUtility: '',
        electricityUtility: '',
        cableTvUtility: '',
        internetUtility: '',
        otherUtility1Enabled: false,
        otherUtility1Name: '',
        otherUtility1Price: '',
        otherUtility2Enabled: false,
        otherUtility2Name: '',
        otherUtility2Price: '',
        contractDate: defaultDate,
      }
    });
    setShowClearConfirm(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const isLandlordFilled = state.landlord.nameKh || state.landlord.nameEn || state.landlord.idNumber;
      const isTenantFilled = state.tenants.some(t => t.nameKh || t.nameEn || t.idNumber);
      const isContractFilled = state.contract.rentAmount || state.contract.depositAmount;
      
      if (isLandlordFilled || isTenantFilled || isContractFilled) {
        e.preventDefault();
        e.returnValue = 'Your data will be lost. Are you sure you want to leave?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state]);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden print:h-auto print:overflow-visible print:block">
      <nav className={`${printMode ? 'hidden' : 'flex'} h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/50 px-4 md:px-6 items-center justify-between flex-shrink-0 z-20 print:hidden`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-500/20 ring-1 ring-white/20">CP</div>
          <h1 className="text-lg md:text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 hidden lg:block">
            CONTRACT PRO
          </h1>
          <div className="relative ml-1 md:ml-3">
            <button
              onClick={() => setIsTypeMenuOpen(!isTypeMenuOpen)}
              className="flex bg-white p-1.5 rounded-xl px-2 md:px-3 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
              title={
                activeTab === 'invoice' 
                  ? 'E-Invoice' 
                  : (activeTab === 'form' && activeDashboardTab === 'agenda')
                    ? 'Calendar'
                    : state.contractType === 'car' 
                      ? 'Car Rental Contract' 
                      : 'House Rental Contract'
              }
            >
              {activeTab === 'invoice' ? (
                <Receipt className="w-4 h-4 text-indigo-600" />
              ) : (activeTab === 'form' && activeDashboardTab === 'agenda') ? (
                <Calendar className="w-4 h-4 text-indigo-600" />
              ) : state.contractType === 'car' ? (
                <Car className="w-4 h-4 text-indigo-600" />
              ) : (
                <Home className="w-4 h-4 text-indigo-600" />
              )}
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>
            {isTypeMenuOpen && (
              <div className="absolute top-full left-0 mt-2 min-w-[180px] bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 flex flex-col">
                <button 
                  onClick={() => { 
                    setActiveDashboardTab('agenda'); 
                    if (activeTab === 'invoice') setActiveTab('form'); 
                    setIsTypeMenuOpen(false); 
                  }}
                  className={`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 ${activeTab === 'form' && activeDashboardTab === 'agenda' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}`}
                >
                  <Calendar className="w-4 h-4" /> Agenda & Tasks
                </button>
                <div className="h-px bg-slate-100 my-1 mx-2"></div>
                <button 
                  onClick={() => { 
                    setState(prev => ({...prev, contractType: 'house'})); 
                    if (activeTab === 'invoice') setActiveTab('form'); 
                    if (activeDashboardTab === 'agenda') setActiveDashboardTab('landlord');
                    setIsTypeMenuOpen(false); 
                  }}
                  className={`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 ${state.contractType === 'house' && activeTab !== 'invoice' && activeDashboardTab !== 'agenda' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}`}
                >
                  <Home className="w-4 h-4" /> House Contract
                </button>
                <button 
                  onClick={() => { 
                    setState(prev => ({...prev, contractType: 'car'})); 
                    if (activeTab === 'invoice') setActiveTab('form'); 
                    if (activeDashboardTab === 'agenda') setActiveDashboardTab('landlord');
                    setIsTypeMenuOpen(false); 
                  }}
                  className={`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 ${state.contractType === 'car' && activeTab !== 'invoice' && activeDashboardTab !== 'agenda' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}`}
                >
                  <Car className="w-4 h-4" /> Car Contract
                </button>
                <div className="h-px bg-slate-200 my-1 mx-2"></div>
                <button 
                  onClick={() => { setActiveTab('invoice'); setIsTypeMenuOpen(false); }}
                  className={`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 ${activeTab === 'invoice' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}`}
                >
                  <Receipt className="w-4 h-4" /> E-Invoice
                </button>
              </div>
            )}
          </div>
          
          <div className={`flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl ml-1 md:ml-4 relative ring-1 ring-slate-200/50 `}>
            <button
               onClick={() => {
                 setActiveTab('form');
                 setIsLangMenuOpen(false);
               }}
               className={`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'form' ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
               title="Edit"
               style={{ display: activeTab === "invoice" ? "none" : "flex" }}
            >
              <Edit className="w-4 h-4" />
            </button>
            <div className="relative" style={{ display: activeTab === "invoice" ? "none" : "block" }}>
              <button
                 onClick={() => {
                   if (activeTab === 'preview') {
                     setIsLangMenuOpen(!isLangMenuOpen);
                   } else {
                     setActiveTab('preview');
                     setIsLangMenuOpen(true);
                   }
                 }}
                 className={`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'preview' ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
                 title="Preview"
              >
                <Eye className="w-4 h-4" />
                {(activeTab === 'preview' || activeTab === 'invoice') && (
                  <div className="flex items-center gap-1 ml-1 border-l border-slate-200 pl-1.5">
                    {(() => {
                      if (state.language === 'km') {
                        return <img src="https://flagcdn.com/w40/kh.png" alt="Khmer" className="w-5 h-3.5 object-cover shadow-sm rounded-sm" />;
                      }
                      if (state.language === 'en') {
                        return <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 h-3.5 object-cover shadow-sm rounded-sm" />;
                      }
                      
                      let secondFlag = 'us';
                      if (state.language === 'km-zh') secondFlag = 'cn';
                      else if (state.language === 'km-ja') secondFlag = 'jp';
                      else if (state.language === 'km-ko') secondFlag = 'kr';
                      else if (state.language === 'km-ru') secondFlag = 'ru';
                      else if (state.language === 'km-vi') secondFlag = 'vn';
                      else if (state.language === 'km-fr') secondFlag = 'fr';
                      
                      return <DualFlag left="kh" right={secondFlag} className="w-5 h-3.5" />;
                    })()}
                  </div>
                )}
              </button>

              {isLangMenuOpen && activeTab === 'preview' && (
                <div className="absolute top-full left-0 mt-2 min-w-[120px] bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 flex flex-col">
                  <button 
                    onClick={() => { setState(prev => ({...prev, language: 'bilingual'})); setIsLangMenuOpen(false); }}
                    className={`px-4 py-3 flex items-center justify-center gap-2 hover:bg-slate-50 ${state.language === 'bilingual' ? 'bg-indigo-50/50' : ''}`}
                    title="Bilingual"
                  >
                    <DualFlag left="kh" right="us" className="w-7 h-5" />
                  </button>
                  <button 
                    onClick={() => { setState(prev => ({...prev, language: 'km'})); setIsLangMenuOpen(false); }}
                    className={`px-4 py-3 flex items-center justify-center hover:bg-slate-50 ${state.language === 'km' ? 'bg-indigo-50/50' : ''}`}
                    title="Khmer"
                  >
                    <img src="https://flagcdn.com/w40/kh.png" alt="Khmer" className="w-7 h-5 object-cover shadow-sm rounded-sm" />
                  </button>
                  <button 
                    onClick={() => { setState(prev => ({...prev, language: 'en'})); setIsLangMenuOpen(false); }}
                    className={`px-4 py-3 flex items-center justify-center hover:bg-slate-50 ${state.language === 'en' ? 'bg-indigo-50/50' : ''}`}
                    title="English"
                  >
                    <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-7 h-5 object-cover shadow-sm rounded-sm" />
                  </button>
                  <button 
                    onClick={() => { setState(prev => ({...prev, language: 'km-zh'})); setIsLangMenuOpen(false); }}
                    className={`px-4 py-3 flex items-center justify-center gap-2 hover:bg-slate-50 ${state.language === 'km-zh' ? 'bg-indigo-50/50' : ''}`}
                    title="Khmer/Chinese"
                  >
                    <DualFlag left="kh" right="cn" className="w-7 h-5" />
                  </button>
                  <button 
                    onClick={() => { setState(prev => ({...prev, language: 'km-ja'})); setIsLangMenuOpen(false); }}
                    className={`px-4 py-3 flex items-center justify-center gap-2 hover:bg-slate-50 ${state.language === 'km-ja' ? 'bg-indigo-50/50' : ''}`}
                    title="Khmer/Japanese"
                  >
                    <DualFlag left="kh" right="jp" className="w-7 h-5" />
                  </button>
                  <button 
                    onClick={() => { setState(prev => ({...prev, language: 'km-ko'})); setIsLangMenuOpen(false); }}
                    className={`px-4 py-3 flex items-center justify-center gap-2 hover:bg-slate-50 ${state.language === 'km-ko' ? 'bg-indigo-50/50' : ''}`}
                    title="Khmer/Korean"
                  >
                    <DualFlag left="kh" right="kr" className="w-7 h-5" />
                  </button>
                  <button 
                    onClick={() => { setState(prev => ({...prev, language: 'km-ru'})); setIsLangMenuOpen(false); }}
                    className={`px-4 py-3 flex items-center justify-center gap-2 hover:bg-slate-50 ${state.language === 'km-ru' ? 'bg-indigo-50/50' : ''}`}
                    title="Khmer/Russian"
                  >
                    <DualFlag left="kh" right="ru" className="w-7 h-5" />
                  </button>
                  <button 
                    onClick={() => { setState(prev => ({...prev, language: 'km-vi'})); setIsLangMenuOpen(false); }}
                    className={`px-4 py-3 flex items-center justify-center gap-2 hover:bg-slate-50 ${state.language === 'km-vi' ? 'bg-indigo-50/50' : ''}`}
                    title="Khmer/Vietnamese"
                  >
                    <DualFlag left="kh" right="vn" className="w-7 h-5" />
                  </button>
                  <button 
                    onClick={() => { setState(prev => ({...prev, language: 'km-fr'})); setIsLangMenuOpen(false); }}
                    className={`px-4 py-3 flex items-center justify-center gap-2 hover:bg-slate-50 ${state.language === 'km-fr' ? 'bg-indigo-50/50' : ''}`}
                    title="Khmer/French"
                  >
                    <DualFlag left="kh" right="fr" className="w-7 h-5" />
                  </button>

                </div>
              )}
            </div>
          </div>

          <button
               onClick={() => {
                 if (activeTab === 'invoice') {
                   setShowClearConfirm(true);
                   return;
                 }
                 const isLandlordFilled = state.landlord.nameKh || state.landlord.nameEn || state.landlord.idNumber;
                 const isTenantFilled = state.tenants.some(t => t.nameKh || t.nameEn || t.idNumber);
                 const isContractFilled = state.contract.rentAmount || state.contract.depositAmount;
                 
                 if (isLandlordFilled || isTenantFilled || isContractFilled) {
                   setShowClearConfirm(true);
                 } else {
                   handleClear();
                 }
               }}
               className="px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
               title="Clear All"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            {(activeTab === 'preview' || activeTab === 'invoice') && (
              <button
                onClick={handleDownloadImage}
                disabled={isGeneratingImage}
                className="ml-1 md:ml-2 flex bg-emerald-600 text-white p-1.5 rounded-2xl px-3 md:px-4 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 hover:bg-emerald-700 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                title="Save as Image"
              >
                {isGeneratingImage ? (
                  <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                )}
                <span className="hidden md:inline">{isGeneratingImage ? 'Saving...' : 'Save Image'}</span>
              </button>
            )}

            {(activeTab === 'preview' || activeTab === 'invoice') && (
              <button
                onClick={() => window.print()}
                className="ml-1 md:ml-2 flex bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-1.5 rounded-2xl px-3 md:px-4 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 hover:from-indigo-600 hover:to-indigo-700 shadow-sm shadow-indigo-600/20"
                title="Print to PDF"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span className="hidden md:inline">Print to PDF</span>
              </button>
            )}

            {activeTab === 'form' && (
              <div className="relative ml-1 md:ml-2">
                <button
                  onClick={() => setIsFormMenuOpen(!isFormMenuOpen)}
                  className="flex bg-white p-1.5 rounded-2xl px-3 md:px-4 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                  title="Select Form Section"
                >
                  {activeDashboardTab === 'agenda' && <><Calendar className="w-4 h-4 text-indigo-600" /> <span className="hidden md:inline">Agenda & Tasks</span></>}
                  {activeDashboardTab === 'landlord' && <><User className="w-4 h-4" /> <span className="hidden md:inline">{state.contractType === 'car' ? 'Landlord' : 'Landlord'}</span></>}
                  {activeDashboardTab === 'tenant' && <><Users className="w-4 h-4" /> <span className="hidden md:inline">Tenant</span></>}
                  {activeDashboardTab === 'contract' && <><FileText className="w-4 h-4" /> <span className="hidden md:inline">Contract</span></>}
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>
                {isFormMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 min-w-[160px] bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 flex flex-col">
                    <button 
                      onClick={() => { setActiveDashboardTab('agenda'); setIsFormMenuOpen(false); }}
                      className={`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 ${activeDashboardTab === 'agenda' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}`}
                    >
                      <Calendar className="w-4.5 h-4.5 text-indigo-500" /> Agenda & Tasks
                    </button>
                    <button 
                      onClick={() => { setActiveDashboardTab('landlord'); setIsFormMenuOpen(false); }}
                      className={`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 ${activeDashboardTab === 'landlord' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'}`}
                    >
                      <User className="w-4.5 h-4.5 text-blue-500" /> {state.contractType === 'car' ? 'Landlord' : 'Landlord'}
                    </button>
                    <button 
                      onClick={() => { setActiveDashboardTab('tenant'); setIsFormMenuOpen(false); }}
                      className={`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 ${activeDashboardTab === 'tenant' ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-700'}`}
                    >
                      <Users className="w-4.5 h-4.5 text-emerald-500" /> Tenant
                    </button>
                    <button 
                      onClick={() => { setActiveDashboardTab('contract'); setIsFormMenuOpen(false); }}
                      className={`px-4 py-2 text-left text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 ${activeDashboardTab === 'contract' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'}`}
                    >
                      <FileText className="w-4.5 h-4.5 text-indigo-500" /> Contract
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {printMode && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 print:hidden">
          <button 
            onClick={handleDownloadImage}
            className="w-12 h-12 bg-emerald-600 rounded-full text-white shadow-xl flex items-center justify-center hover:bg-emerald-700 transition-colors"
            title="Save as Image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
          <button 
            onClick={() => window.print()}
            className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full text-white shadow-xl flex items-center justify-center hover:from-indigo-600 hover:to-indigo-700 transition-colors"
            title="Print Document"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          </button>
          <button 
            onClick={() => setPrintMode(false)}
            className="w-12 h-12 bg-slate-800 rounded-full text-white shadow-xl flex items-center justify-center hover:bg-slate-900 transition-colors"
            title="Exit Print Mode"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      <main className="flex flex-1 overflow-hidden print:h-auto print:overflow-visible print:block relative z-10">
        <aside className={`${activeTab === 'form' && !printMode ? 'flex' : 'hidden'} w-full bg-slate-200 md:bg-transparent p-3 md:p-6 lg:p-8 flex-col gap-5 overflow-hidden print:hidden`}>
          <Dashboard 
            state={state} 
            setState={setState} 
            activeDashboardTab={activeDashboardTab} 
          />
        </aside>
        <section className={`${(activeTab === 'preview' || activeTab === 'invoice' || printMode) ? 'flex' : 'hidden'} flex-1 w-full ${printMode ? 'bg-white p-0 overflow-y-auto' : 'bg-slate-100/50 p-3 md:p-6 lg:p-8 overflow-auto'} justify-center items-start print:p-0 print:bg-white print:overflow-visible print:block`}>
          <div className={`w-full flex justify-center overflow-x-auto md:overflow-x-visible ${printMode ? 'py-0' : 'py-2 md:py-4'} print:m-0 print:p-0 print:block`}>
            <div id="printable-area" className="w-full flex justify-center print:block print:w-auto print:m-0 print:p-0">
              {activeTab === 'invoice' ? <InvoiceReceipt key={invoiceKey} /> : <ContractPreview state={state} />}
            </div>
          </div>
        </section>
      </main>

      {/* Confirmation Modal for Clear Action */}
      <AnimatePresence>
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearConfirm(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs animate-fade-in"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col gap-5 z-10"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-950 text-base">
                    Clear Data?
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    All entered information will be permanently cleared. Are you sure you want to proceed?
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Yes, Clear
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

