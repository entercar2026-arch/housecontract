import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, MapPin, MessageSquare, Plus, Trash2, Check, 
  AlertCircle, ExternalLink, Filter, Search, Bell, CheckCircle, 
  ChevronDown, Phone, FileText, UserPlus, HelpCircle, Users, Pencil
} from 'lucide-react';
import { AppState } from '../types';

export interface AgendaItem {
  id: string;
  title: string;
  category: 'appointment' | 'contract' | 'commission' | 'issue';
  date: string;
  time: string;
  reminder: string; // 'none' | '5m' | '15m' | '30m' | '1h' | '1d'
  location: string;
  contactName: string;
  contactPlatform: 'telegram' | 'whatsapp' | 'none';
  contactHandle: string;
  completed: boolean;
  createdAt: number;
}

export const formatDateToDDMMYY = (dateStr: string): string => {
  if (!dateStr) return '';
  const ymdRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (ymdRegex.test(dateStr)) {
    const [, y, m, d] = dateStr.match(ymdRegex)!;
    return `${d}/${m}/${y.substring(2)}`;
  }
  const dmyFullRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  if (dmyFullRegex.test(dateStr)) {
    const [, d, m, y] = dateStr.match(dmyFullRegex)!;
    return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y.substring(2)}`;
  }
  const dmyRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
  if (dmyRegex.test(dateStr)) {
    const [, d, m, y] = dateStr.match(dmyRegex)!;
    return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
  }
  return dateStr;
};

// Map category key to Khmer / English names and theme colors
export const CATEGORIES = {
  appointment: {
    label: 'Appointment',
    color: 'indigo',
    bgClass: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    badgeClass: 'bg-indigo-500',
    ringClass: 'focus:ring-indigo-500/20',
    borderActive: 'border-indigo-500 bg-indigo-50/20'
  },
  contract: {
    label: 'Contract Signing',
    color: 'yellow',
    bgClass: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    badgeClass: 'bg-yellow-400',
    ringClass: 'focus:ring-yellow-500/20',
    borderActive: 'border-yellow-500 bg-yellow-50/20'
  },
  commission: {
    label: 'Commission Collection',
    color: 'amber',
    bgClass: 'bg-amber-50 text-amber-800 border-amber-100',
    badgeClass: 'bg-amber-600',
    ringClass: 'focus:ring-amber-500/20',
    borderActive: 'border-amber-600 bg-amber-50/20'
  },
  issue: {
    label: 'Issue Resolution',
    color: 'rose',
    bgClass: 'bg-rose-50 text-rose-700 border-rose-100',
    badgeClass: 'bg-rose-500',
    ringClass: 'focus:ring-rose-500/20',
    borderActive: 'border-rose-500 bg-rose-50/20'
  }
};

const REMINDER_OPTIONS = [
  { value: 'none', label: 'No reminder' },
  { value: '5m', label: '5 minutes before' },
  { value: '15m', label: '15 minutes before' },
  { value: '30m', label: '30 minutes before' },
  { value: '1h', label: '1 hour before' },
  { value: '1d', label: '1 day before' },
];

const parseTime24 = (timeStr: string) => {
  if (!timeStr) return { hour: '12', minute: '00', ampm: 'PM' };
  const parts = timeStr.split(':');
  if (parts.length < 2) return { hour: '12', minute: '00', ampm: 'PM' };
  let h = parseInt(parts[0], 10);
  const m = parts[1];
  
  // Nearest allowed minute choice
  let selectedMinute = '00';
  const mInt = parseInt(m, 10);
  if (mInt >= 8 && mInt < 23) {
    selectedMinute = '15';
  } else if (mInt >= 23 && mInt < 38) {
    selectedMinute = '30';
  } else if (mInt >= 38 && mInt < 53) {
    selectedMinute = '45';
  } else {
    selectedMinute = '00';
  }

  const ampm = h >= 12 ? 'PM' : 'AM';
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  const hourStr = h12.toString().padStart(2, '0');
  return { hour: hourStr, minute: selectedMinute, ampm };
};

const formatTime24 = (h12: string, m: string, ampm: string) => {
  let h = parseInt(h12, 10);
  if (ampm === 'PM' && h < 12) {
    h += 12;
  } else if (ampm === 'AM' && h === 12) {
    h = 0;
  }
  return `${h.toString().padStart(2, '0')}:${m}`;
};

const parseEventDateTime = (dateStr: string, timeStr: string): Date | null => {
  if (!dateStr || !timeStr) return null;
  const timeParts = timeStr.split(':');
  if (timeParts.length < 2) return null;
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  // formats can be "DD/MM/YY" or "YYYY-MM-DD"
  const ymdRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (ymdRegex.test(dateStr)) {
    const [, y, m, d] = dateStr.match(ymdRegex)!;
    return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10), hours, minutes);
  }
  const dmyRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/;
  if (dmyRegex.test(dateStr)) {
    const [, d, m, y] = dateStr.match(dmyRegex)!;
    let yearNum = parseInt(y, 10);
    if (yearNum < 100) {
      yearNum += 2000;
    }
    return new Date(yearNum, parseInt(m, 10) - 1, parseInt(d, 10), hours, minutes);
  }
  return null;
};

export default function AgendaSection({ appState }: { appState?: AppState }) {
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  // Contact Picker States
  const [showContactPicker, setShowContactPicker] = useState(false);
  const [pickerPlatform, setPickerPlatform] = useState<'telegram' | 'whatsapp'>('telegram');
  const [linkingEventId, setLinkingEventId] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');

  // New Event Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<keyof typeof CATEGORIES>('appointment');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reminder, setReminder] = useState('none');
  const [location, setLocation] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPlatform, setContactPlatform] = useState<'telegram' | 'whatsapp' | 'none'>('none');
  const [contactHandle, setContactHandle] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);

  // Alarm states
  const [dismissedAlarms, setDismissedAlarms] = useState<string[]>([]);
  const [snoozedAlarms, setSnoozedAlarms] = useState<Record<string, number>>({});
  const [activeAlarmItem, setActiveAlarmItem] = useState<AgendaItem | null>(null);

  const { hour: curHour, minute: curMin, ampm: curAmpm } = parseTime24(time);

  const handleTimeChange = (newHour: string, newMin: string, newAmpm: string) => {
    const formatted = formatTime24(newHour, newMin, newAmpm);
    setTime(formatted);
  };

  // Helper to compile active landlord and tenant contacts
  const getSystemContacts = () => {
    const contacts: { name: string; type: string; handle: string; platform: 'telegram' | 'whatsapp' }[] = [];
    
    if (appState) {
      // Landlord contact
      const lName = appState.landlord.nameEn?.trim() || appState.landlord.nameKh?.trim();
      if (lName) {
        contacts.push({
          name: lName,
          type: appState.contractType === 'car' ? 'Car Owner' : 'Landlord',
          handle: appState.landlord.nameEn 
            ? `@${appState.landlord.nameEn.toLowerCase().replace(/[^a-z0-9_]/g, '')}` 
            : '@landlord_handle',
          platform: 'telegram'
        });
        contacts.push({
          name: lName,
          type: appState.contractType === 'car' ? 'Car Owner' : 'Landlord',
          handle: '+85512345678',
          platform: 'whatsapp'
        });
      }

      // Tenants
      const activeTenants = appState.tenants.slice(0, appState.numTenants);
      activeTenants.forEach((tenant, index) => {
        const tName = tenant.nameEn?.trim() || tenant.nameKh?.trim();
        if (tName) {
          const cleanEnName = tenant.nameEn ? tenant.nameEn.toLowerCase().replace(/[^a-z0-9_]/g, '') : `tenant_${index + 1}`;
          contacts.push({
            name: tName,
            type: `Tenant #${index + 1}`,
            handle: `@${cleanEnName}`,
            platform: 'telegram'
          });
          contacts.push({
            name: tName,
            type: `Tenant #${index + 1}`,
            handle: `+8558765432${index + 1}`,
            platform: 'whatsapp'
          });
        }
      });
    }

    // Default professional sample contacts as fallbacks
    if (contacts.length === 0) {
      contacts.push(
        { name: 'Sokh Chea', type: 'Landlord', handle: '@cheasokh_realestate', platform: 'telegram' },
        { name: 'Sokh Chea', type: 'Landlord', handle: '+85512345678', platform: 'whatsapp' },
        { name: 'Touch Chandraheang', type: 'Tenant', handle: '@chandraheang_rent', platform: 'telegram' },
        { name: 'Touch Chandraheang', type: 'Tenant', handle: '+85587654321', platform: 'whatsapp' },
        { name: 'Nari Tenant', type: 'Tenant', handle: '@nari_tenant102', platform: 'telegram' },
        { name: 'Nari Tenant', type: 'Tenant', handle: '+85599887766', platform: 'whatsapp' }
      );
    }

    return contacts;
  };

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('contract_pro_agenda');
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        // Pre-fill some professional sample events
        const samples: AgendaItem[] = [
          {
            id: 'sample-1',
            title: 'Meet with Sokh Chea for Villa Contract Signing',
            category: 'contract',
            date: new Date().toISOString().split('T')[0],
            time: '14:30',
            reminder: '30m',
            location: 'Borey Peng Huoth Boeng Snor, Villa #24',
            contactName: 'Sokh Chea',
            contactPlatform: 'telegram',
            contactHandle: 'cheasokh_realestate',
            completed: false,
            createdAt: Date.now() - 3600000
          },
          {
            id: 'sample-2',
            title: 'Collect rental commission from CP Company',
            category: 'commission',
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            time: '09:00',
            reminder: '1h',
            location: 'Canadia Tower, 12th Floor',
            contactName: 'Touch Chandraheang',
            contactPlatform: 'whatsapp',
            contactHandle: '+85512345678',
            completed: false,
            createdAt: Date.now() - 1800000
          },
          {
            id: 'sample-3',
            title: 'Resolve leaking water pipe in Room 102',
            category: 'issue',
            date: new Date().toISOString().split('T')[0],
            time: '16:00',
            reminder: '15m',
            location: 'Flat #152, Preah Monivong Blvd',
            contactName: 'Nari Tenant',
            contactPlatform: 'telegram',
            contactHandle: 'nari_tenant102',
            completed: true,
            createdAt: Date.now() - 7200000
          }
        ];
        setItems(samples);
        localStorage.setItem('contract_pro_agenda', JSON.stringify(samples));
      }
      
      const savedDismissed = localStorage.getItem('contract_pro_dismissed_alarms');
      if (savedDismissed) {
        setDismissedAlarms(JSON.parse(savedDismissed));
      }
      const savedSnoozed = localStorage.getItem('contract_pro_snoozed_alarms');
      if (savedSnoozed) {
        setSnoozedAlarms(JSON.parse(savedSnoozed));
      }
    } catch (e) {
      console.error('Error parsing agenda state:', e);
    }
  }, []);

  // Save to LocalStorage helper
  const saveItems = (updated: AgendaItem[]) => {
    setItems(updated);
    localStorage.setItem('contract_pro_agenda', JSON.stringify(updated));
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      // Clear from dismissed/snoozed so it triggers again on new times
      const newDismissed = dismissedAlarms.filter(id => id !== editingId);
      setDismissedAlarms(newDismissed);
      localStorage.setItem('contract_pro_dismissed_alarms', JSON.stringify(newDismissed));

      const newSnoozed = { ...snoozedAlarms };
      delete newSnoozed[editingId];
      setSnoozedAlarms(newSnoozed);
      localStorage.setItem('contract_pro_snoozed_alarms', JSON.stringify(newSnoozed));

      const updated = items.map(item => {
        if (item.id === editingId) {
          return {
            ...item,
            title: title.trim(),
            category,
            date: date || item.date,
            time: time || item.time,
            reminder,
            location: location.trim(),
            contactName: contactName.trim(),
            contactPlatform,
            contactHandle: contactHandle.trim()
          };
        }
        return item;
      });
      saveItems(updated);
      setEditingId(null);
    } else {
      const newItem: AgendaItem = {
        id: `agenda-${Date.now()}`,
        title: title.trim(),
        category,
        date: date || (() => {
          const d = new Date();
          const day = d.getDate().toString().padStart(2, '0');
          const month = (d.getMonth() + 1).toString().padStart(2, '0');
          const year = d.getFullYear().toString().substring(2);
          return `${day}/${month}/${year}`;
        })(),
        time: time || '12:00',
        reminder,
        location: location.trim(),
        contactName: contactName.trim(),
        contactPlatform,
        contactHandle: contactHandle.trim(),
        completed: false,
        createdAt: Date.now()
      };

      const updated = [newItem, ...items];
      saveItems(updated);
    }

    // Reset Form
    setTitle('');
    setCategory('appointment');
    setDate('');
    setTime('');
    setReminder('none');
    setLocation('');
    setContactName('');
    setContactPlatform('none');
    setContactHandle('');
    setIsAdding(false);
  };

  const handleToggleComplete = (id: string) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    saveItems(updated);
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    saveItems(updated);
  };

  // Alarm Dismiss / Snooze Helpers
  const dismissAlarm = (id: string) => {
    const updated = [...dismissedAlarms, id];
    setDismissedAlarms(updated);
    localStorage.setItem('contract_pro_dismissed_alarms', JSON.stringify(updated));
    setActiveAlarmItem(null);
  };

  const snoozeAlarm = (id: string) => {
    // Snooze for 5 minutes (300,000 ms)
    const updated = { ...snoozedAlarms, [id]: Date.now() + 5 * 60 * 1000 };
    setSnoozedAlarms(updated);
    localStorage.setItem('contract_pro_snoozed_alarms', JSON.stringify(updated));
    setActiveAlarmItem(null);
  };

  // Alarm sound synthesis engine (browser native, extremely reliable, no audio files needed)
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let alarmInterval: any = null;

    const startAlarmSound = () => {
      try {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtxClass) return;
        if (!audioCtx) {
          audioCtx = new AudioCtxClass();
        }
        
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        let toggle = false;
        alarmInterval = setInterval(() => {
          if (!audioCtx) return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(toggle ? 880 : 660, audioCtx.currentTime); // dual-tone high-pitch clean chimes
          
          gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
          
          osc.start();
          osc.stop(audioCtx.currentTime + 0.5);
          
          toggle = !toggle;
        }, 850);
      } catch (e) {
        console.warn("Failed to play alarm sound", e);
      }
    };

    const stopAlarmSound = () => {
      if (alarmInterval) {
        clearInterval(alarmInterval);
        alarmInterval = null;
      }
    };

    if (activeAlarmItem) {
      startAlarmSound();
    } else {
      stopAlarmSound();
    }

    return () => {
      stopAlarmSound();
    };
  }, [activeAlarmItem]);

  // Periodic background check for due alarms
  useEffect(() => {
    const checkAlarms = () => {
      if (activeAlarmItem) return; // Wait until current alarm is resolved

      const now = Date.now();
      for (const item of items) {
        if (item.completed) continue;
        if (dismissedAlarms.includes(item.id)) continue;

        // Check if currently snoozed
        const snoozeUntil = snoozedAlarms[item.id];
        if (snoozeUntil && now < snoozeUntil) continue;

        const eventDate = parseEventDateTime(item.date, item.time);
        if (!eventDate) continue;

        let offsetMs = 0;
        if (item.reminder === '5m') offsetMs = 5 * 60 * 1000;
        else if (item.reminder === '15m') offsetMs = 15 * 60 * 1000;
        else if (item.reminder === '30m') offsetMs = 30 * 60 * 1000;
        else if (item.reminder === '1h') offsetMs = 60 * 60 * 1000;
        else if (item.reminder === '1d') offsetMs = 24 * 60 * 60 * 1000;
        else continue; // No reminder or 'none'

        const eventTime = eventDate.getTime();
        const alarmTime = eventTime - offsetMs;

        // Alarm fires if we are past the alarm time but not more than 40 minutes past the event itself
        if (now >= alarmTime && now < eventTime + 40 * 60 * 1000) {
          setActiveAlarmItem(item);
          break; // Trigger only one alarm modal at a time
        }
      }
    };

    // Check immediately and then every 4 seconds
    checkAlarms();
    const interval = setInterval(checkAlarms, 4000);
    return () => clearInterval(interval);
  }, [items, dismissedAlarms, snoozedAlarms, activeAlarmItem]);

  // Filter and search logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'completed' && item.completed) || 
                          (filterStatus === 'pending' && !item.completed);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Helper to generate contact chat links
  const getContactLink = (platform: 'telegram' | 'whatsapp' | 'none', handle: string) => {
    if (!handle) return '#';
    let cleanHandle = handle.trim();
    if (platform === 'telegram') {
      if (cleanHandle.startsWith('http://') || cleanHandle.startsWith('https://')) {
        try {
          const url = new URL(cleanHandle);
          const path = url.pathname.replace(/^\//, '');
          if (path) cleanHandle = path;
        } catch (e) {
          // ignore
        }
      }
      cleanHandle = cleanHandle.replace('@', '');
      // Use standard tg:// custom scheme to open the native Telegram app directly
      return `tg://resolve?domain=${cleanHandle}`;
    }
    if (platform === 'whatsapp') {
      const cleanPhone = handle.replace(/[^0-9]/g, '');
      // Use standard wa.me links which open the native app/web automatically on both desktop and mobile
      return `https://wa.me/${cleanPhone}`;
    }
    return '#';
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 font-sans text-slate-800">
      {/* Upper header action area */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="w-6 h-6 text-indigo-600" />
              <span>Agenda & Tasks</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg shadow-indigo-600/15 transition-all cursor-pointer active:scale-95"
            id="btn-add-event"
          >
            <Plus className="w-4 h-4" />
            <span>{isAdding ? 'Cancel' : 'Add Event'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        <AnimatePresence mode="wait">
          {isAdding ? (
            /* Add Event Form Panel */
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onSubmit={handleAddEvent}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col gap-4"
            >
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>{editingId ? 'Edit Event Details' : 'Create New Event'}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Samsung S25 Ultra Optimized</span>
              </div>

              {/* Event Name Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meet Sokh Chea for Villa Contract Signing..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200/80 shadow-inner rounded-2xl px-3.5 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Category selector pill badges */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Event Category & Color</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map(catKey => {
                    const info = CATEGORIES[catKey];
                    const isActive = category === catKey;
                    return (
                      <button
                        key={catKey}
                        type="button"
                        onClick={() => setCategory(catKey)}
                        className={`text-left p-3 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                          isActive 
                            ? `border-${info.color}-500 bg-${info.color}-50/60 ring-2 ring-${info.color}-500/15` 
                            : 'border-slate-200/70 hover:bg-slate-50 text-slate-600'
                        }`}
                        style={{
                          borderColor: isActive ? `var(--color-${info.color}-500)` : undefined,
                          backgroundColor: isActive ? `rgba(var(--color-${info.color}-50), 0.5)` : undefined
                        }}
                      >
                        <span className={`w-3 h-3 rounded-full shrink-0 ${info.badgeClass}`} />
                        <div className="flex flex-col leading-normal">
                          <span className="text-[11px] font-bold text-slate-800">{info.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Date *</label>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          const day = d.getDate().toString().padStart(2, '0');
                          const month = (d.getMonth() + 1).toString().padStart(2, '0');
                          const year = d.getFullYear().toString().substring(2);
                          setDate(`${day}/${month}/${year}`);
                        }}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] text-indigo-600 font-bold rounded-md transition-colors cursor-pointer"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date(Date.now() + 86400000);
                          const day = d.getDate().toString().padStart(2, '0');
                          const month = (d.getMonth() + 1).toString().padStart(2, '0');
                          const year = d.getFullYear().toString().substring(2);
                          setDate(`${day}/${month}/${year}`);
                        }}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-[10px] text-indigo-600 font-bold rounded-md transition-colors cursor-pointer"
                      >
                        Tomorrow
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={date}
                      onChange={e => {
                        const val = e.target.value;
                        const cleaned = val.replace(/\D/g, '').substring(0, 6);
                        let formatted = '';
                        if (cleaned.length > 0) {
                          formatted += cleaned.substring(0, 2);
                        }
                        if (cleaned.length > 2) {
                          formatted += '/' + cleaned.substring(2, 4);
                        }
                        if (cleaned.length > 4) {
                          formatted += '/' + cleaned.substring(4, 6);
                        }
                        setDate(formatted);
                      }}
                      placeholder="DD/MM/YY"
                      maxLength={8}
                      className="w-full text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200/80 rounded-2xl pl-10 pr-3 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-800"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Time *</label>
                  <div className="relative">
                    <div className="flex gap-1.5 bg-slate-50 border border-slate-200/80 rounded-2xl p-1 items-center">
                      <Clock className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
                      <select
                        value={curHour}
                        onChange={e => handleTimeChange(e.target.value, curMin, curAmpm)}
                        className="flex-1 text-xs font-bold text-slate-900 bg-transparent py-2 focus:outline-none cursor-pointer text-center"
                      >
                        {['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'].map(h => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                      <span className="text-slate-300 text-xs font-semibold">:</span>
                      <select
                        value={curMin}
                        onChange={e => handleTimeChange(curHour, e.target.value, curAmpm)}
                        className="flex-1 text-xs font-bold text-slate-900 bg-transparent py-2 focus:outline-none cursor-pointer text-center"
                      >
                        {['00', '15', '30', '45'].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <div className="flex bg-slate-200 p-0.5 rounded-xl text-[10px] font-extrabold text-slate-600 gap-0.5 select-none shrink-0">
                        <button
                          type="button"
                          onClick={() => handleTimeChange(curHour, curMin, 'AM')}
                          className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${curAmpm === 'AM' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:text-slate-900'}`}
                        >
                          AM
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTimeChange(curHour, curMin, 'PM')}
                          className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${curAmpm === 'PM' ? 'bg-indigo-600 text-white shadow-xs' : 'hover:text-slate-900'}`}
                        >
                          PM
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reminder minutes/hours dropdown & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Reminder Alarm</label>
                  <div className="relative">
                    <Bell className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <select
                      value={reminder}
                      onChange={e => setReminder(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200/80 rounded-2xl pl-10 pr-8 py-3.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                    >
                      {REMINDER_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Location</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Canadia Tower, 12th Floor"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200/80 rounded-2xl pl-10 pr-3 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Direct messaging platform selection & fields */}
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    <span>Contact details</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Contact Name</label>
                      <button
                        type="button"
                        onClick={() => {
                          setLinkingEventId(null);
                          setPickerPlatform('telegram');
                          setShowContactPicker(true);
                        }}
                        className="text-[9px] text-sky-600 hover:text-sky-700 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        <Users className="w-2.5 h-2.5" />
                        <span>Browse Contacts</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Sokh Chea"
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Telegram Username</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. @username"
                        value={contactHandle}
                        onChange={e => {
                          setContactHandle(e.target.value);
                          if (e.target.value.trim()) {
                            setContactPlatform('telegram');
                          } else {
                            setContactPlatform('none');
                          }
                        }}
                        className="flex-1 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                      />
                      {contactHandle.trim() && (
                        <a
                          href={getContactLink('telegram', contactHandle)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-2xl text-[10px] flex items-center gap-1 transition-all cursor-pointer border border-indigo-100 shadow-xs whitespace-nowrap"
                          title="Open App & Browse Contact"
                        >
                          <span>Open App</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-2 justify-end border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    // Reset fields
                    setTitle('');
                    setCategory('appointment');
                    setDate('');
                    setTime('');
                    setReminder('none');
                    setLocation('');
                    setContactName('');
                    setContactPlatform('none');
                    setContactHandle('');
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-2xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-md transition-colors cursor-pointer"
                >
                  {editingId ? 'Update Event' : 'Save Event'}
                </button>
              </div>
            </motion.form>
          ) : (
            /* Items List Panel */
            <div className="flex flex-col gap-3 pb-8">
              {filteredItems.length === 0 ? (
                /* Empty State */
                <div className="bg-white border border-slate-200/70 rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div className="max-w-xs">
                    <h4 className="text-sm font-bold text-slate-800">No events or tasks</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      No matching events found. Create a new event to keep track of your schedules and client contacts.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAdding(true)}
                    className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Create New Event
                  </button>
                </div>
              ) : (
                /* Grid of Staggered Cards (grouped by day, ordered by time) */
                <div className="flex flex-col gap-5">
                  {(() => {
                    // Sort items chronologically first
                    const sortedItems = [...filteredItems].sort((a, b) => {
                      const dateA = parseEventDateTime(a.date, a.time);
                      const dateB = parseEventDateTime(b.date, b.time);
                      if (!dateA && !dateB) return 0;
                      if (!dateA) return 1;
                      if (!dateB) return -1;
                      return dateA.getTime() - dateB.getTime();
                    });

                    // Group sortedItems by date string
                    const groupedByDay: { [dateKey: string]: typeof filteredItems } = {};
                    sortedItems.forEach(item => {
                      const normalizedDate = formatDateToDDMMYY(item.date);
                      if (!groupedByDay[normalizedDate]) {
                        groupedByDay[normalizedDate] = [];
                      }
                      groupedByDay[normalizedDate].push(item);
                    });

                    // Sort unique days in order
                    const uniqueDays = Object.keys(groupedByDay).sort((dayA, dayB) => {
                      const itemA = groupedByDay[dayA][0];
                      const itemB = groupedByDay[dayB][0];
                      const dateA = parseEventDateTime(itemA.date, itemA.time);
                      const dateB = parseEventDateTime(itemB.date, itemB.time);
                      if (!dateA && !dateB) return 0;
                      if (!dateA) return 1;
                      if (!dateB) return -1;
                      return dateA.getTime() - dateB.getTime();
                    });

                    return (
                      <AnimatePresence initial={false}>
                        {uniqueDays.map(dayKey => {
                          const dayEvents = groupedByDay[dayKey];
                          const firstEvent = dayEvents[0];
                          const eventDate = parseEventDateTime(firstEvent.date, firstEvent.time);
                          let readableDate = dayKey;
                          if (eventDate) {
                            readableDate = eventDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            });
                          }

                          return (
                            <div key={dayKey} className="flex flex-col gap-2.5">
                              {/* Day Sub-Header */}
                              <div className="flex items-center gap-2 px-1 py-1 bg-slate-50 border-b border-slate-100 rounded-xl">
                                <Calendar className="w-4 h-4 text-indigo-600 ml-1 shrink-0" />
                                <span className="text-xs font-black text-slate-800 tracking-tight uppercase">
                                  {readableDate}
                                </span>
                                <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full ml-auto">
                                  {dayEvents.length} {dayEvents.length === 1 ? 'Event' : 'Events'}
                                </span>
                              </div>

                              {/* Single-line Events List */}
                              <div className="flex flex-col gap-2 pl-0.5">
                                {dayEvents.map((item, idx) => {
                                  const info = CATEGORIES[item.category];
                                  const hasReminder = item.reminder !== 'none';
                                  const reminderObj = REMINDER_OPTIONS.find(o => o.value === item.reminder);

                                  // Choose beautiful vivid backgrounds corresponding to the category color
                                  let bgClass = "bg-white border-slate-200";
                                  if (!item.completed) {
                                    if (item.category === 'appointment') {
                                      bgClass = "bg-indigo-50/75 hover:bg-indigo-100/70 border-indigo-200 text-indigo-950";
                                    } else if (item.category === 'contract') {
                                      bgClass = "bg-yellow-50 hover:bg-yellow-100/90 border-yellow-200 text-amber-950";
                                    } else if (item.category === 'commission') {
                                      bgClass = "bg-amber-50 hover:bg-amber-100/90 border-amber-200 text-amber-950";
                                    } else if (item.category === 'issue') {
                                      bgClass = "bg-rose-50 hover:bg-rose-100/80 border-rose-200 text-rose-950";
                                    }
                                  } else {
                                    bgClass = "bg-slate-100 hover:bg-slate-100/90 border-slate-200 opacity-60 text-slate-500";
                                  }

                                  return (
                                    <motion.div
                                      key={item.id}
                                      layout
                                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                      transition={{ duration: 0.2 }}
                                      className={`border rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs hover:shadow-xs transition-all ${bgClass}`}
                                    >
                                      {/* 2-line content layout with checkbox */}
                                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                        {/* Checkbox */}
                                        <button
                                          onClick={() => handleToggleComplete(item.id)}
                                          className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer shrink-0 transition-all ${
                                            item.completed 
                                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                                              : 'border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/10'
                                          }`}
                                          title={item.completed ? "Mark pending" : "Mark completed"}
                                        >
                                          {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                                        </button>

                                        {/* 2-line core event details */}
                                        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                                          {/* Line 1: Name / Title + Category Badge */}
                                          <div className="flex items-center gap-2 min-w-0">
                                            <span className={`text-sm sm:text-base font-black truncate leading-tight ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`} title={item.title}>
                                              {item.title}
                                            </span>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold border shrink-0 ${info.bgClass}`}>
                                              {info.label}
                                            </span>
                                          </div>

                                          {/* Line 2: Time and Alarm */}
                                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-bold text-slate-600/90 leading-none">
                                            <div className="flex items-center gap-1 bg-white/60 px-1.5 py-0.5 rounded-md border border-black/5 shrink-0">
                                              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                              <span>{item.time}</span>
                                            </div>

                                            {hasReminder && reminderObj && (
                                              <div className="flex items-center gap-1 text-amber-700 font-extrabold bg-amber-50/60 px-1.5 py-0.5 rounded-md border border-amber-100/40 shrink-0">
                                                <Bell className="w-3 h-3 text-amber-500 shrink-0 animate-pulse" />
                                                <span>Alarm: {reminderObj.label}</span>
                                              </div>
                                            )}

                                            {item.location && (
                                              <div className="flex items-center gap-1 text-slate-500/85 shrink-0 truncate max-w-[120px] sm:max-w-[200px]">
                                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                                <span className="truncate">{item.location}</span>
                                              </div>
                                            )}

                                            {item.contactName && (
                                              <div className="flex items-center gap-1 text-indigo-600/85 shrink-0 truncate max-w-[100px] sm:max-w-[150px]">
                                                <UserPlus className="w-3 h-3 text-indigo-400 shrink-0" />
                                                <span className="truncate">{item.contactName}</span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Right action controls */}
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        {/* Direct Chat shortcut */}
                                        {item.contactPlatform !== 'none' && item.contactHandle && (
                                          <a
                                            href={getContactLink(item.contactPlatform, item.contactHandle)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded-xl bg-white/60 hover:bg-white text-slate-600 border border-black/5 hover:border-indigo-200 transition-all shadow-xs shrink-0"
                                            title={`Chat with ${item.contactName} via ${item.contactPlatform}`}
                                          >
                                            {item.contactPlatform === 'telegram' ? (
                                              <svg className="w-4 h-4 text-sky-500 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15.15-.3.3-.45.45-.63.63-1.26 1.26-1.89 1.89-.3.3-.61.31-.91.01-.11-.11-.22-.22-.33-.33-.32-.32-.32-.83 0-1.15.4-.4.8-.8 1.2-1.2.14-.14.21-.31.2-.5-.02-.34-.29-.53-.6-.53-.16 0-.32.06-.44.18l-1.9 1.9c-.3.3-.3.8 0 1.1l.9.9c.3.3.3.8 0 1.1-.3.3-.8.3-1.1 0l-.9-.9c-.3-.3-.8-.3-1.1 0-.3.3-.3.8 0 1.1l1.8 1.8c.15.15.22.34.19.55-.06.35-.35.53-.66.49-.15-.02-.29-.09-.39-.19l-3-3c-.31-.31-.31-.81 0-1.12l4-4c.31-.31.81-.31 1.12 0l1.12 1.12c.1.1.2.2.3.29.32.32.83.32 1.15 0l.45-.45c.31-.31.81-.31 1.12 0 .32.31.32.81.01 1.12z"/>
                                              </svg>
                                            ) : (
                                              <svg className="w-4 h-4 text-emerald-500 fill-current" viewBox="0 0 24 24">
                                                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.82 14.1c-.26.74-1.52 1.36-2.08 1.42-.51.06-1.17.1-3.36-.81-2.8-1.16-4.61-4.02-4.75-4.21-.14-.19-1.14-1.51-1.14-2.89 0-1.38.72-2.06 1-2.35.28-.3.61-.37.81-.37.2 0 .39 0 .56.01.18.01.41-.07.64.48.24.58.81 2.01.88 2.16.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.39-.45.52-.15.15-.31.31-.13.62.18.3.79 1.3 1.7 2.11.78.7 1.43.91 1.74 1.07.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.2-.31.41-.26.69-.15.28.11 1.77.83 2.08.99.31.15.52.23.59.36.07.12.07.71-.19 1.45z"/>
                                              </svg>
                                            )}
                                          </a>
                                        )}

                                        {/* Link Contact if none */}
                                        {!item.contactName && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setLinkingEventId(item.id);
                                              setPickerPlatform('telegram');
                                              setShowContactPicker(true);
                                            }}
                                            className="p-1.5 rounded-xl bg-white/60 hover:bg-white text-indigo-600 border border-black/5 hover:border-indigo-200 transition-all text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                                            title="Link Contact"
                                          >
                                            <UserPlus className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline">Link</span>
                                          </button>
                                        )}

                                        {/* Edit */}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingId(item.id);
                                            setTitle(item.title);
                                            setCategory(item.category);
                                            setDate(item.date);
                                            setTime(item.time);
                                            setReminder(item.reminder);
                                            setLocation(item.location || '');
                                            setContactName(item.contactName || '');
                                            setContactPlatform(item.contactPlatform || 'none');
                                            setContactHandle(item.contactHandle || '');
                                            setIsAdding(true);
                                          }}
                                          className="p-1.5 rounded-xl bg-white/60 hover:bg-white hover:text-indigo-600 text-slate-400 border border-black/5 hover:border-indigo-200 transition-all cursor-pointer shrink-0"
                                          title="Edit Event"
                                        >
                                          <Pencil className="w-3.5 h-3.5" />
                                        </button>

                                        {/* Delete */}
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteItem(item.id)}
                                          className="p-1.5 rounded-xl bg-white/60 hover:bg-white hover:text-red-600 text-slate-400 border border-black/5 hover:border-red-200 transition-all cursor-pointer shrink-0"
                                          title="Delete Event"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </AnimatePresence>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact Picker Modal */}
      <AnimatePresence>
        {showContactPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Browse Contacts</h3>
                    <p className="text-[10px] text-slate-500 font-medium">Select a landlord or tenant to auto-fill details</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowContactPicker(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Platform Toggle inside browser */}
              <div className="p-3 border-b border-slate-100 flex gap-1.5 bg-white">
                <button
                  type="button"
                  onClick={() => setPickerPlatform('telegram')}
                  className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold text-center transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    pickerPlatform === 'telegram' ? 'bg-sky-50 text-sky-600 border border-sky-100' : 'text-slate-500 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  Telegram Contacts
                </button>
                <button
                  type="button"
                  onClick={() => setPickerPlatform('whatsapp')}
                  className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold text-center transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    pickerPlatform === 'whatsapp' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'text-slate-500 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  WhatsApp Contacts
                </button>
              </div>

              {/* List of Contacts */}
              <div className="max-h-72 overflow-y-auto p-4 flex flex-col gap-2 bg-slate-50/30">
                {getSystemContacts()
                  .filter(c => c.platform === pickerPlatform)
                  .map((contact, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (linkingEventId) {
                          const updated = items.map(item => {
                            if (item.id === linkingEventId) {
                              return {
                                ...item,
                                contactName: contact.name,
                                contactPlatform: contact.platform,
                                contactHandle: contact.handle
                              };
                            }
                            return item;
                          });
                          saveItems(updated);
                          setLinkingEventId(null);
                        } else {
                          setContactName(contact.name);
                          setContactPlatform(contact.platform);
                          setContactHandle(contact.handle);
                        }
                        setShowContactPicker(false);
                      }}
                      className="w-full text-left p-3 rounded-2xl bg-white border border-slate-100 hover:border-indigo-400 hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                          pickerPlatform === 'telegram' ? 'bg-sky-50 text-sky-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{contact.name}</h4>
                          <span className="text-[9px] font-semibold uppercase bg-slate-100 px-1.5 py-0.5 rounded-md text-slate-500">
                            {contact.type}
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end">
                        <span className="text-[10px] font-mono text-slate-500 group-hover:text-indigo-600 transition-colors">
                          {contact.handle}
                        </span>
                        <div className="text-[9px] text-indigo-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          Select & Fill
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Alarm Reminder Modal */}
      <AnimatePresence>
        {activeAlarmItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border-4 border-indigo-500/30 max-w-md w-full overflow-hidden p-6 flex flex-col items-center text-center gap-5"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-amber-500/20 blur-md animate-ping" />
                <div className="w-16 h-16 rounded-full bg-amber-500 border border-amber-400 flex items-center justify-center text-white shadow-lg animate-bounce">
                  <Bell className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
                  ⏰ Event Alarm Reminder
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2 leading-tight">
                  {activeAlarmItem.title}
                </h3>
              </div>

              <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-semibold text-slate-700 flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Date: <strong>{formatDateToDDMMYY(activeAlarmItem.date)}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Time: <strong>{activeAlarmItem.time}</strong></span>
                </div>
                {activeAlarmItem.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="truncate">Location: <strong>{activeAlarmItem.location}</strong></span>
                  </div>
                )}
                {activeAlarmItem.contactName && (
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Contact: <strong>{activeAlarmItem.contactName}</strong></span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <button
                  type="button"
                  onClick={() => snoozeAlarm(activeAlarmItem.id)}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors cursor-pointer active:scale-95"
                >
                  Snooze (5 Min)
                </button>
                <button
                  type="button"
                  onClick={() => dismissAlarm(activeAlarmItem.id)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs transition-colors cursor-pointer shadow-lg shadow-indigo-600/15 active:scale-95"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
