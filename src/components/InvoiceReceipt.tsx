import React, { useState } from 'react';

export function InvoiceReceipt() {
  const [type, setType] = useState<'invoice' | 'receipt'>('invoice');
  const [serviceType, setServiceType] = useState<'car' | 'house'>('car');
  const [logoUrl, setLogoUrl] = useState<string>('');

  const headerText = serviceType === 'car' ? 'សេវាកម្មជួលរថយន្ត' : 'សេវាកម្មជួលផ្ទះ';
  const headerEn = serviceType === 'car' ? 'CAR RENTAL' : 'HOUSE RENTAL';

  return (
    <>
      <style>{`@page { size: A5 landscape !important; margin: 0mm !important; }`}</style>
      <div className="w-[210mm] h-[148.5mm] md:min-h-0 bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto p-4 md:p-6 print:p-4 relative print:shadow-none overflow-hidden text-slate-800"
         style={{
             backgroundImage: 'radial-gradient(circle at center, #f8fafc 0%, #f1f5f9 100%)'
         }}>
      
      {/* Type selectors (hidden on print) */}
      <div className="absolute top-4 right-4 flex gap-2 print:hidden z-20">
        <select 
          value={serviceType}
          onChange={(e) => { setServiceType(e.target.value as 'car' | 'house'); setLogoUrl(''); }}
          className="bg-white border border-slate-300 text-xs rounded-md px-2 py-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#631633]"
        >
          <option value="car">Car Rental</option>
          <option value="house">House Rental</option>
        </select>
        <select 
          value={type}
          onChange={(e) => setType(e.target.value as 'invoice' | 'receipt')}
          className="bg-white border border-slate-300 text-xs rounded-md px-2 py-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#631633]"
        >
          <option value="invoice">Invoice</option>
          <option value="receipt">Receipt</option>
        </select>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center ">
         <h1 className="text-[120px] font-black rotate-[-30deg] uppercase tracking-widest">{headerEn}</h1>
      </div>
      
      <div className="relative z-10 font-sans">
        <div className="flex justify-between items-start mb-6 mt-4">
          <div className="flex items-center gap-4">
            <div className="relative group shrink-0">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-24 h-24 object-contain rounded-xl shadow-sm" />
              ) : (
                <div className="bg-[#4d0924] text-white rounded-xl shadow-lg border-b-4 border-slate-700 w-24 h-24 flex flex-col items-center justify-center shrink-0 overflow-hidden relative">
                  {serviceType === 'car' ? (
                     <>
                        <img src="/car_logo.png?v=2" alt="Car Rental Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }} />
                        <div className="hidden flex-col items-center justify-center w-full h-full p-2">
                           <div className="relative w-12 h-8 bg-white rounded-md shadow-sm border-b-2 border-slate-300 flex items-center justify-center mb-1">
                             <span className="font-bold text-[10px] italic text-[#4d0924]">Enter</span>
                             <svg className="absolute top-1 left-1 w-2 h-2 text-[#4d0924]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                               <polyline points="9 10 4 15 9 20"></polyline>
                               <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                             </svg>
                           </div>
                           <span className="font-bold text-[8px] tracking-widest text-white mt-1">CAR RENTAL</span>
                        </div>
                     </>
                  ) : (
                     <>
                        <img src="/house_logo-1.jpg?v=2" alt="Property Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }} />
                        <div className="hidden flex-col items-center justify-center w-full h-full p-2">
                           <svg viewBox="0 0 200 90" className="w-16 h-10 drop-shadow-sm">
                             <text x="15" y="60" fontFamily="sans-serif" fontSize="38" fontWeight="bold" fill="white" letterSpacing="2">L</text>
                             <text x="45" y="60" fontFamily="sans-serif" fontSize="38" fontWeight="bold" fill="white" letterSpacing="2">E</text>
                             <text x="135" y="60" fontFamily="sans-serif" fontSize="38" fontWeight="bold" fill="white" letterSpacing="2">N</text>
                             <text x="165" y="60" fontFamily="sans-serif" fontSize="38" fontWeight="bold" fill="white" letterSpacing="2">G</text>
                             
                             {/* House forming A */}
                             <path d="M 72 60 L 72 50 L 90 28 L 110 50 L 110 60" fill="none" stroke="white" strokeWidth="5" strokeLinejoin="round" />
                             <path d="M 82 60 L 82 45 L 90 35 L 100 45 L 100 60" fill="none" stroke="white" strokeWidth="3" />
                             
                             {/* Tall building forming I */}
                             <path d="M 108 50 L 112 20 L 128 30 L 128 60" fill="none" stroke="white" strokeWidth="5" strokeLinejoin="round" />
                             <line x1="118" y1="25" x2="118" y2="60" stroke="white" strokeWidth="4" />
                           </svg>
                           <span className="text-[7px] tracking-[0.25em] font-medium mt-1">PROPERTY</span>
                        </div>
                     </>
                  )}
                </div>
              )}
              
              <label className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl cursor-pointer transition-opacity print:hidden">
                <span className="text-xs font-semibold text-center px-1">ប្តូរ Logo<br/>(Change Logo)</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setLogoUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }} 
                />
              </label>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-moul text-slate-800 mb-1" style={{ color: '#631633' }}>{headerText}</h1>
              <h2 className="text-xl font-bold uppercase tracking-wider" style={{ color: '#631633' }}>{headerEn}</h2>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end mb-2 px-2 relative z-10">
          <div className="flex items-end gap-2 text-sm font-semibold relative">
            <span>Date:</span>
            <input type="text" className="border-b border-dashed border-[#631633]/30 bg-transparent w-32 focus:outline-none  relative z-20" />
          </div>
          <div className="text-center cursor-pointer group" onClick={() => setType(type === 'invoice' ? 'receipt' : 'invoice')}>
            <h2 className="text-2xl font-moul text-slate-800 transition-colors group-hover:text-indigo-600 ">
               {type === 'invoice' ? 'វិក្កយបត្រ' : 'បង្កាន់ដៃ'}
            </h2>
            <h3 className="text-lg font-bold uppercase transition-colors group-hover:text-indigo-600 ">
               {type === 'invoice' ? 'Invoice' : 'Receipt'}
            </h3>
          </div>
          <div className="flex items-end gap-2 text-sm font-semibold relative">
            <span>No:</span>
            <input type="text" className="border-b border-dashed border-[#631633]/30 bg-transparent w-32 focus:outline-none  relative z-20" />
          </div>
        </div>

        <div className="border-[3px] border-slate-800 rounded-2xl p-3 mb-2 bg-white/50 backdrop-blur-sm shadow-inner relative z-10" style={{ borderColor: '#631633' }}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="flex-1 flex border-b border-[#631633]/30 pb-1 relative">
                <div className="w-36 font-semibold shrink-0">
                  <div className="font-moul text-sm">ឈ្មោះអតិថិជន:</div>
                  <div className="text-xs">Customer's Name</div>
                </div>
                <input type="text" className="flex-1 bg-transparent focus:outline-none text-slate-800 font-bold px-2 relative z-20" />
              </div>
              <div className="w-64 flex border-b border-[#631633]/30 pb-1 relative">
                <div className="w-24 font-semibold shrink-0">
                  <div className="font-moul text-sm">លេខទូរស័ព្ទ:</div>
                  <div className="text-xs">Phone Number</div>
                </div>
                <input type="text" className="flex-1 bg-transparent focus:outline-none text-slate-800 font-bold px-2 relative z-20" />
              </div>
            </div>

            <div className="flex border-b border-[#631633]/30 pb-1 relative">
              <div className="w-36 font-semibold shrink-0">
                <div className="font-moul text-sm">ចំនួន:</div>
                <div className="text-xs">Amount</div>
              </div>
              <input type="text" className="flex-1 bg-transparent focus:outline-none text-slate-800 font-bold px-2 relative z-20" />
            </div>

            <div className="flex border-b border-[#631633]/30 pb-1 relative">
              <div className="w-36 font-semibold shrink-0">
                <div className="font-moul text-sm">សម្រាប់:</div>
                <div className="text-xs">In Payment of</div>
              </div>
              <input type="text" className="flex-1 bg-transparent focus:outline-none text-slate-800 font-bold px-2 relative z-20" />
            </div>

            <div className="flex border-b border-[#631633]/30 pb-1 relative">
              <div className="w-36 font-semibold shrink-0">
                <div className="font-moul text-sm">ថ្ងៃផុតកំណត់:</div>
                <div className="text-xs">Expired Date</div>
              </div>
              <input type="text" className="flex-1 bg-transparent focus:outline-none text-slate-800 font-bold px-2 relative z-20" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start mb-4 px-2 relative z-10">
          <div className="font-semibold text-sm">
            <div className="font-moul">ប្រាក់បង់រួចហើយមិនអាចដកវិញបានទេ</div>
            <div>Payment is non-refundable</div>
          </div>
          <div className="flex items-end gap-2 text-sm font-semibold relative">
            <span>Issues by:</span>
            <input type="text" className="border-b border-dashed border-[#631633]/30 bg-transparent w-40 focus:outline-none  relative z-20" />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-10 relative z-10">
          <div className="bg-[#002f6c] text-white px-4 py-2 rounded-lg flex flex-col items-center justify-center font-bold">
            <div className="text-xs">ABA</div>
            <div className="text-[8px]">MOBILE</div>
          </div>
          <div className="bg-[#631633] text-white px-4 py-2 rounded-lg font-bold">
            <div className="text-lg leading-none">000 248 201</div>
            <div className="text-xs">TOUCH CHANDARAHEANG</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-[#631633] text-white p-3 flex justify-between items-center text-[10px] sm:text-xs">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 " fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <span className="font-moul">ផ្ទះលេខ 128E0z ផ្លូវ136 សង្កាត់ផ្សារថ្មី2 ខណ្ឌដូនពេញ ភ្នំពេញ</span>
        </div>
        <div className="flex items-center gap-4 font-bold">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            <span>Whatsapp/Telegram</span>
          </div>
          <div className="flex items-center gap-1 text-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
            <span>096 671 4442</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
