import React, { useState, useRef, useEffect } from 'react';

export function InvoiceReceipt() {
  const [type, setType] = useState<'invoice' | 'receipt'>('invoice');
  const [serviceType, setServiceType] = useState<'car' | 'house'>('car');
  
  const [logoUrl, setLogoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('permanent_invoice_logo_car') || '';
    } catch (e) {
      return '';
    }
  });
  
  const [phone, setPhone] = useState<string>(() => {
    try {
      return localStorage.getItem('permanent_invoice_phone_car') || '096 671 4442';
    } catch (e) {
      return '096 671 4442';
    }
  });
  
  const [signatureUrl, setSignatureUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('permanent_invoice_signature_v2') || '/signature.png';
    } catch (e) {
      return '/signature.png';
    }
  });

  const [signatureImageError, setSignatureImageError] = useState(false);

  const saveSignature = (url: string) => {
    setSignatureUrl(url || '/signature.png');
    setSignatureImageError(false);
    try {
      if (url) {
        localStorage.setItem('permanent_invoice_signature_v2', url);
      } else {
        localStorage.removeItem('permanent_invoice_signature_v2');
      }
    } catch (e) {
      console.error('Failed to save signature to localStorage', e);
    }
  };

  const [isSigModalOpen, setIsSigModalOpen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.strokeStyle = '#2563eb'; // blue-600
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    let clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    let clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    
    e.preventDefault();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Check if canvas is empty to avoid saving blank image
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dataUrl = canvas.toDataURL();
    saveSignature(dataUrl);
    setIsSigModalOpen(false);
  };

  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  });

  const generateNewNoId = () => {
    const d = new Date();
    const dd = d.getDate().toString().padStart(2, '0');
    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const yy = d.getFullYear().toString().slice(-2);
    const hh = d.getHours().toString().padStart(2, '0');
    const min = d.getMinutes().toString().padStart(2, '0');
    return `${dd}${mm}${yy}${hh}${min}`;
  };

  const [invoiceNo, setInvoiceNo] = useState<string>(generateNewNoId);
  const [lang, setLang] = useState<'en' | 'zh' | 'vi' | 'ru' | 'ko' | 'ja' | 'fr'>('en');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generateNewNo = () => {
    setInvoiceNo(generateNewNoId());
  };

  const setDateToToday = () => {
    const d = new Date();
    setDate(`${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`);
  };

  const translations = {
    en: {
      customerName: "Customer's Name",
      phone: "Phone Number",
      amount: "Amount",
      paymentOf: "In Payment of",
      expired: "Expired Date",
      nonRefundable: "Payment is non-refundable",
      cash: "Cash",
      bank: "Bank",
      date: "Date:",
      no: "No:",
      invoice: "E-Invoice",
      receipt: "E-Receipt",
      issuedBy: "Issued by:",
      receivedBy: "Received by:",
      carRental: "CAR RENTAL",
      houseRental: "HOUSE RENTAL"
    },
    zh: {
      customerName: "客户姓名",
      phone: "电话号码",
      amount: "金额",
      paymentOf: "支付款项",
      expired: "截止日期",
      nonRefundable: "付款后不可退款",
      cash: "现金",
      bank: "银行转账",
      date: "日期:",
      no: "编号:",
      invoice: "电子发票",
      receipt: "电子收据",
      issuedBy: "开票人:",
      receivedBy: "收款人:",
      carRental: "租车服务",
      houseRental: "租房服务"
    },
    vi: {
      customerName: "Tên khách hàng",
      phone: "Số điện thoại",
      amount: "Số tiền",
      paymentOf: "Thanh toán cho",
      expired: "Ngày hết hạn",
      nonRefundable: "Thanh toán không hoàn lại",
      cash: "Tiền mặt",
      bank: "Chuyển khoản",
      date: "Ngày:",
      no: "Số:",
      invoice: "Hóa đơn điện tử",
      receipt: "Biên lai điện tử",
      issuedBy: "Người phát hành:",
      receivedBy: "Người nhận:",
      carRental: "THUÊ XE",
      houseRental: "THUÊ NHÀ"
    },
    ru: {
      customerName: "Имя клиента",
      phone: "Номер телефона",
      amount: "Сумма",
      paymentOf: "Оплата за",
      expired: "Срок действия",
      nonRefundable: "Оплата не подлежит возврату",
      cash: "Наличные",
      bank: "Банковский перевод",
      date: "Дата:",
      no: "№:",
      invoice: "Электронный счет",
      receipt: "Электронная квитанция",
      issuedBy: "Выдано:",
      receivedBy: "Получено:",
      carRental: "АРЕНДА АВТО",
      houseRental: "АРЕНДА ЖИЛЬЯ"
    },
    ko: {
      customerName: "고객 이름",
      phone: "전화번호",
      amount: "금액",
      paymentOf: "결제 항목",
      expired: "만료일",
      nonRefundable: "환불 불가 결제",
      cash: "현금",
      bank: "계좌이체",
      date: "날짜:",
      no: "번호:",
      invoice: "전자 청구서",
      receipt: "전자 영수증",
      issuedBy: "발행인:",
      receivedBy: "수령인:",
      carRental: "렌터카",
      houseRental: "주택 임대"
    },
    ja: {
      customerName: "お客様名",
      phone: "電話番号",
      amount: "金額",
      paymentOf: "お支払い内容",
      expired: "有効期限",
      nonRefundable: "返金不可",
      cash: "現金",
      bank: "銀行振込",
      date: "日付:",
      no: "番号:",
      invoice: "電子請求書",
      receipt: "電子領収書",
      issuedBy: "発行者:",
      receivedBy: "受領者:",
      carRental: "レンタカー",
      houseRental: "住宅賃貸"
    },
    fr: {
      customerName: "Nom du client",
      phone: "Numéro de téléphone",
      amount: "Montant",
      paymentOf: "En paiement de",
      expired: "Date d'expiration",
      nonRefundable: "Paiement non remboursable",
      cash: "Espèces",
      bank: "Virement bancaire",
      date: "Date :",
      no: "N° :",
      invoice: "Facture électronique",
      receipt: "Reçu électronique",
      issuedBy: "Émis par :",
      receivedBy: "Reçu par :",
      carRental: "LOCATION DE VOITURE",
      houseRental: "LOCATION DE MAISON"
    }
  };
  const t = translations[lang];

  const headerText = serviceType === 'car' ? 'សេវាកម្មជួលរថយន្ត' : 'សេវាកម្មជួលផ្ទះ';
  const headerEn = serviceType === 'car' ? t.carRental : t.houseRental;
  const watermarkText = serviceType === 'car' ? 'RENTAL' : 'LEADING';

  return (
    <>
      <style>{`
        .invoice-receipt-wrapper {
          zoom: 0.42;
        }
        @media (min-width: 360px) {
          .invoice-receipt-wrapper {
            zoom: 0.45;
          }
        }
        @media (min-width: 390px) {
          .invoice-receipt-wrapper {
            zoom: 0.48;
          }
        }
        @media (min-width: 440px) {
          .invoice-receipt-wrapper {
            zoom: 0.55;
          }
        }
        @media (min-width: 520px) {
          .invoice-receipt-wrapper {
            zoom: 0.65;
          }
        }
        @media (min-width: 640px) {
          .invoice-receipt-wrapper {
            zoom: 0.8;
          }
        }
        @media (min-width: 768px) {
          .invoice-receipt-wrapper {
            zoom: 0.85;
          }
        }
        @media (min-width: 1024px) {
          .invoice-receipt-wrapper {
            zoom: 1;
          }
        }
        @media print {
          @page {
            size: A5 landscape;
            margin: 0;
          }
          .invoice-receipt-wrapper {
            zoom: 1 !important;
            width: 210mm !important;
            height: 148mm !important;
            max-height: 148mm !important;
            overflow: hidden !important;
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          #invoice-card {
            zoom: 1 !important;
            transform: none !important;
            width: 210mm !important;
            height: 148mm !important;
            max-width: 210mm !important;
            max-height: 148mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            background-color: white !important;
            overflow: hidden !important;
          }
        }
      `}</style>
      <div className="w-full flex justify-center invoice-receipt-wrapper print:m-0 print:p-0">
        <div id="invoice-card" className="flex flex-col w-[210mm] h-[148.5mm] bg-slate-50 md:bg-white shadow-none md:shadow-xl rounded-none md:rounded-xl mx-auto relative text-slate-800 print:text-[0.85rem] overflow-hidden"
           style={{
               backgroundImage: 'radial-gradient(circle at center, #f8fafc 0%, #f1f5f9 100%)'
           }}>
           
           <div className="p-3 md:p-4 print:p-2 flex-1 flex flex-col justify-between relative z-10 print:min-h-0">
      
      {/* Type selectors (hidden on print) */}
      <div className="absolute top-4 right-4 flex gap-2 print:hidden z-20">
        {(() => {
          const languages = [
            { id: 'en', code: 'gb', title: 'English' },
            { id: 'zh', code: 'cn', title: '中文' },
            { id: 'vi', code: 'vn', title: 'Tiếng Việt' },
            { id: 'ru', code: 'ru', title: 'Русский' },
            { id: 'ko', code: 'kr', title: '한국어' },
            { id: 'ja', code: 'jp', title: '日本語' },
            { id: 'fr', code: 'fr', title: 'Français' },
          ];
          const currentLang = languages.find(l => l.id === lang) || languages[0];
          
          return (
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 bg-white border border-slate-300 text-xs rounded-md px-2 py-1 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#631633]"
              >
                <img src={`https://flagcdn.com/w20/${currentLang.code}.png`} width="20" alt={currentLang.title} className="rounded-sm" />
                <span className="hidden sm:inline">{currentLang.title}</span>
                <svg className={`w-3 h-3 text-slate-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden z-50">
                  {languages.map(l => (
                    <button
                      key={l.id}
                      onClick={() => { setLang(l.id as any); setIsLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-100 transition-colors ${lang === l.id ? 'bg-slate-50 font-semibold text-[#631633]' : 'text-slate-700'}`}
                    >
                      <img src={`https://flagcdn.com/w20/${l.code}.png`} width="20" alt={l.title} className="rounded-sm shadow-sm" />
                      {l.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
        <select 
          value={serviceType}
          onChange={(e) => { 
            const nextType = e.target.value as 'car' | 'house';
            setServiceType(nextType); 
            
            // Load saved logo or default empty
            const savedLogo = localStorage.getItem(`permanent_invoice_logo_${nextType}`) || '';
            setLogoUrl(savedLogo);
            
            // Load saved phone or default
            const defaultPhone = nextType === 'car' ? '096 671 4442' : '012 444 062';
            const savedPhone = localStorage.getItem(`permanent_invoice_phone_${nextType}`) || defaultPhone;
            setPhone(savedPhone);
          }}
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
          <option value="invoice">E-Invoice</option>
          <option value="receipt">E-Receipt</option>
        </select>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center ">
         <h1 className="text-[120px] font-black rotate-[-30deg] uppercase tracking-widest">{watermarkText}</h1>
      </div>
      
      <div className="relative z-10 font-sans flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-1 mt-1 print:mb-0 print:mt-0">
          <div className="flex items-center gap-4">
            <div className="relative group shrink-0">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain rounded-xl shadow-sm" />
              ) : (
                <div className="bg-[#4d0924] text-white rounded-xl shadow-lg border-b-4 border-slate-700 w-16 h-16 flex flex-col items-center justify-center shrink-0 overflow-hidden relative">
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
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          const base64 = event.target.result as string;
                          setLogoUrl(base64);
                          try {
                            localStorage.setItem(`permanent_invoice_logo_${serviceType}`, base64);
                          } catch (err) {
                            console.error('Failed to save logo to localStorage', err);
                          }
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }} 
                />
              </label>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-moul text-slate-800 mb-0.5" style={{ color: '#631633' }}>{headerText}</h1>
              <h2 className="text-lg font-bold uppercase tracking-wider" style={{ color: '#631633' }}>{headerEn}</h2>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end mb-1 px-2 relative z-10 print:mb-0">
          <div className="flex items-end gap-2 text-sm font-semibold relative group/date">
            <span>{t.date}</span>
            <input 
              type="text" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-b border-dashed border-[#631633]/30 bg-transparent w-32 focus:outline-none relative z-20" 
            />
            <button 
              onClick={setDateToToday}
              className="absolute -top-6 left-10 text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded opacity-0 group-hover/date:opacity-100 transition-opacity print:hidden whitespace-nowrap"
            >
              Today
            </button>
          </div>
          <div className="text-center cursor-pointer group" onClick={() => setType(type === 'invoice' ? 'receipt' : 'invoice')}>
            <h2 className="text-2xl font-moul text-slate-800 transition-colors group-hover:text-indigo-600 ">
               {type === 'invoice' ? 'វិក្កយបត្រ' : 'បង្កាន់ដៃ'}
            </h2>
            <h3 className="text-lg font-bold uppercase transition-colors group-hover:text-indigo-600 ">
               {type === 'invoice' ? t.invoice : t.receipt}
            </h3>
          </div>
          <div className="flex items-end gap-2 text-sm font-semibold relative group/no">
            <span>{t.no}</span>
            <input 
              type="text" 
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="border-b border-dashed border-[#631633]/30 bg-transparent w-32 focus:outline-none relative z-20" 
            />
            <button 
              onClick={generateNewNo}
              className="absolute -top-6 left-6 text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded opacity-0 group-hover/no:opacity-100 transition-opacity print:hidden whitespace-nowrap"
            >
              Generate
            </button>
          </div>
        </div>

        <div className="border-[3px] border-slate-800 rounded-xl p-2 mb-2 print:mb-1 print:p-1.5 bg-white/50 backdrop-blur-sm shadow-inner relative z-10" style={{ borderColor: '#631633' }}>
          <div className="flex flex-col gap-1">
            <div className="flex gap-4">
              <div className="flex-1 flex border-b border-[#631633]/30 pb-1 relative">
                <div className="w-36 font-semibold shrink-0">
                  <div className="font-moul text-sm">ឈ្មោះអតិថិជន:</div>
                  <div className="text-xs">{t.customerName}</div>
                </div>
                <input type="text" className="flex-1 bg-transparent focus:outline-none text-slate-800 font-bold px-2 relative z-20" />
              </div>
              <div className="w-64 flex border-b border-[#631633]/30 pb-1 relative">
                <div className="w-24 font-semibold shrink-0">
                  <div className="font-moul text-sm">លេខទូរស័ព្ទ:</div>
                  <div className="text-xs">{t.phone}</div>
                </div>
                <input type="text" className="flex-1 bg-transparent focus:outline-none text-slate-800 font-bold px-2 relative z-20" />
              </div>
            </div>

            <div className="flex border-b border-[#631633]/30 pb-1 relative">
              <div className="w-36 font-semibold shrink-0">
                <div className="font-moul text-sm">ចំនួន:</div>
                <div className="text-xs">{t.amount}</div>
              </div>
              <input type="text" className="flex-1 bg-transparent focus:outline-none text-slate-800 font-bold px-2 relative z-20" />
            </div>

            <div className="flex border-b border-[#631633]/30 pb-1 relative">
              <div className="w-36 font-semibold shrink-0">
                <div className="font-moul text-sm">សម្រាប់:</div>
                <div className="text-xs">{t.paymentOf}</div>
              </div>
              <input type="text" className="flex-1 bg-transparent focus:outline-none text-slate-800 font-bold px-2 relative z-20" />
            </div>

            <div className="flex border-b border-[#631633]/30 pb-1 relative">
              <div className="w-36 font-semibold shrink-0">
                <div className="font-moul text-sm">ថ្ងៃផុតកំណត់:</div>
                <div className="text-xs">{t.expired}</div>
              </div>
              <input type="text" className="flex-1 bg-transparent focus:outline-none text-slate-800 font-bold px-2 relative z-20" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end mb-1 print:mb-0 px-2 relative z-10">
          <div className="font-semibold text-sm">
            <div className="font-moul">ប្រាក់បង់រួចហើយមិនអាចដកវិញបានទេ</div>
            <div>{t.nonRefundable}</div>
          </div>
        </div>

        <div className="flex justify-between items-end mb-1 print:mb-0 relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#002f6c] text-white px-4 py-1.5 rounded-lg flex flex-col items-center justify-center font-bold h-[42px]">
                <div className="text-xs leading-none">ABA</div>
                <div className="text-[8px] leading-tight">MOBILE</div>
              </div>
              <div className="bg-[#631633] text-white px-4 py-1 rounded-lg font-bold flex flex-col justify-center h-[42px]">
                <input type="text" className="text-sm leading-none bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-32 text-center" defaultValue="000 248 201" />
                <input type="text" className="text-[9px] bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-40 text-center uppercase" defaultValue="TOUCH CHANDARAHEANG" />
              </div>
            </div>
            
            <div className="relative w-[84px] h-[84px] rounded border-2 border-[#002f6c] bg-white overflow-hidden flex items-center justify-center shrink-0">
              <img src="/qr-code.png.jpg" alt="QR Code" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/qr-placeholder.svg'; }} />
            </div>
          </div>

          <div 
            onClick={() => setIsSigModalOpen(true)}
            className="flex flex-col items-center relative cursor-pointer group/sig self-end mb-2 mr-2"
            title="ចុចដើម្បីគូស ឬប្តូរហត្ថលេខា (Click to Draw or Change Signature)"
          >
            {/* Interactive tooltip shown only in preview/edit, hidden in print */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover/sig:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none print:hidden">
              ប្តូរហត្ថលេខា (Change Signature)
            </div>

            <div className="flex items-end gap-1.5 text-sm font-semibold relative z-20">
              <span>{type === 'receipt' ? t.receivedBy : t.issuedBy}</span>
              <div className="relative">
                {/* Elegant Hand-drawn Blue Signature SVG / Uploaded or drawn image, centered perfectly in the red box */}
                {type === 'receipt' && (
                  <div className={`absolute left-[58%] -translate-x-1/2 select-none z-10 transition-transform group-hover/sig:scale-105 pointer-events-none ${signatureUrl && !signatureImageError ? '-top-32' : '-top-28'}`}>
                    {signatureUrl && !signatureImageError ? (
                      <img 
                        src={signatureUrl} 
                        alt="Signature" 
                        className="w-[21rem] h-[10.5rem] object-contain" 
                        style={{ transform: 'rotate(-4deg)' }} 
                        onError={() => setSignatureImageError(true)}
                      />
                    ) : (
                      <svg viewBox="0 0 100 130" className="w-24 h-28 text-blue-600 opacity-95" style={{ transform: 'rotate(-4deg)' }}>
                        {/* Left Loop */}
                        <path
                          d="M 56 27 C 45 32, 35 42, 35 52 C 35 62, 45 62, 54 50 C 58 45, 62 35, 63 30 C 64 25, 66 30, 66 35 C 66 45, 55 55, 41 66"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Center Vertical Line */}
                        <path
                          d="M 56 25 L 56 48"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Right Tall Stroke with wiggle */}
                        <path
                          d="M 81 10 C 77 25, 72 35, 72 40 C 72 44, 75 43, 77 45 C 78 47, 73 48, 70 51"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Bottom sharp triangle and long tail */}
                        <path
                          d="M 41 66 L 46 120 C 46 120, 58 85, 71 60"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                )}
                
                <input 
                  type="text" 
                  defaultValue="TOUCH CHANDARAHEANG" 
                  className="border-b border-dashed border-[#631633]/30 bg-transparent w-48 focus:outline-none text-center font-bold text-slate-800 text-xs sm:text-sm" 
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
      
      <div className="mt-auto bg-[#631633] text-white p-2 print:p-1.5 flex justify-between items-center text-[10px] sm:text-[11px] shrink-0 w-full relative z-20">
        <div className="flex items-start gap-1.5 w-full">
          <svg className="w-4 h-4 mt-1 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <div className="flex flex-col w-full">
            <input type="text" className="font-moul bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-[350px] max-w-[350px]" defaultValue="ផ្ទះលេខ128E0 ផ្លូវ136 សង្កាត់ផ្សារថ្មី2 ខណ្ឌដូនពេញ ភ្នំពេញ" />
            <input type="text" className="text-[8px] opacity-90 mt-0.5 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-[350px] max-w-[350px]" defaultValue="No. 128E0, St. 136, Phsar Thmey 2, Daun Penh, Phnom Penh" />
          </div>
        </div>
        <div className="flex items-center gap-4 font-bold shrink-0 pr-2">
          <div className="flex items-center gap-1">
            <span>Whatsapp/Telegram</span>
          </div>
          <div className="flex items-center gap-1 text-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
            <input 
              type="text" 
              className="bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-1 w-36" 
              value={phone} 
              onChange={(e) => {
                const val = e.target.value;
                setPhone(val);
                try {
                  localStorage.setItem(`permanent_invoice_phone_${serviceType}`, val);
                } catch (err) {
                  console.error('Failed to save phone to localStorage', err);
                }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
    </div>

    {/* Elegant Signature Pad / Upload Modal */}
    {isSigModalOpen && (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 print:hidden">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-moul text-sm text-slate-800">ហត្ថលេខា (Signature)</h3>
              <p className="text-[10px] text-slate-500 font-medium">គូស ឬ បង្ហោះហត្ថលេខាផ្ទាល់ខ្លួនរបស់អ្នក (Draw or Upload Signature)</p>
            </div>
            <button 
              onClick={() => setIsSigModalOpen(false)}
              className="text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Option 1: Upload Signature */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-indigo-400 transition-colors bg-slate-50/50">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-700">បង្ហោះរូបភាពហត្ថលេខា (Upload Signature PNG/JPG)</p>
              <p className="text-[10px] text-slate-500 mt-0.5">រូបភាពដែលមានផ្ទៃថ្លា (Transparent PNG is recommended)</p>
            </div>
            <label className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg cursor-pointer transition-colors shadow-sm">
              ជ្រើសរើសរូបភាព (Choose File)
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        saveSignature(event.target.result as string);
                        setIsSigModalOpen(false);
                      }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }} 
              />
            </label>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-150"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase">ឬ (Or)</span>
            <div className="flex-grow border-t border-slate-150"></div>
          </div>

          {/* Option 2: Draw on Pad */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">គូសនៅលើផ្ទាំងខាងក្រោម (Draw on signature pad)</span>
              <button 
                onClick={clearCanvas}
                className="text-rose-500 hover:text-rose-700 text-[10px] font-semibold border border-rose-200 px-2 py-0.5 rounded hover:bg-rose-50 transition-colors"
              >
                លុបគូសឡើងវិញ (Clear)
              </button>
            </div>
            <div className="border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden h-[180px] flex items-center justify-center relative touch-none">
              <canvas
                ref={canvasRef}
                width={350}
                height={180}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="cursor-crosshair w-full h-full bg-white"
              />
            </div>
          </div>

          <div className="flex justify-between gap-3 pt-2 border-t border-slate-100 mt-2">
            <button 
              onClick={() => {
                saveSignature('');
                setIsSigModalOpen(false);
              }}
              className="px-3 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
              </svg>
              ហត្ថលេខាដើម (Default Signature)
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsSigModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors"
              >
                បោះបង់ (Cancel)
              </button>
              <button 
                onClick={saveCanvas}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-md shadow-indigo-100"
              >
                រក្សាទុក (Save)
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
