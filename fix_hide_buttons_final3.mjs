import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Hide Edit button
const editBtnStart = `            <button 
               onClick={() => {
                 setActiveTab('form');
                 setIsLangMenuOpen(false);
               }}
               className={\`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 \${activeTab === 'form' ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}\`}`;
               
const editBtnNew = `            <button 
               onClick={() => {
                 setActiveTab('form');
                 setIsLangMenuOpen(false);
               }}
               className={\`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 \${activeTab === 'form' ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'} \${activeTab === 'invoice' ? 'hidden' : ''}\`}`;

content = content.replace(editBtnStart, editBtnNew);

// Hide Preview button
const previewBtnStart = `            <div className="relative">
              <button 
                 onClick={() => {
                   if (activeTab === 'preview') {
                     setIsLangMenuOpen(!isLangMenuOpen);
                   } else {
                     setActiveTab('preview');
                     setIsLangMenuOpen(true);
                   }
                 }}
                 className={\`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 \${activeTab === 'preview' ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}\`}`;

const previewBtnNew = `            <div className="relative">
              <button 
                 onClick={() => {
                   if (activeTab === 'preview') {
                     setIsLangMenuOpen(!isLangMenuOpen);
                   } else {
                     setActiveTab('preview');
                     setIsLangMenuOpen(true);
                   }
                 }}
                 className={\`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 \${activeTab === 'preview' ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'} \${activeTab === 'invoice' ? 'hidden' : ''}\`}`;

content = content.replace(previewBtnStart, previewBtnNew);

fs.writeFileSync('src/App.tsx', content);
