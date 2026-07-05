import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The container for Edit, Preview, and Language is:
// <div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl ml-1 md:ml-4 relative ring-1 ring-slate-200/50">
content = content.replace(
  '<div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl ml-1 md:ml-4 relative ring-1 ring-slate-200/50">',
  '{activeTab !== \'invoice\' && (<div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl ml-1 md:ml-4 relative ring-1 ring-slate-200/50">'
);

// find the closing of that div. We know it ends right before:
// <button onClick={() => { setShowClearConfirm(true); ... Clear All button
// Let's find exactly where it ends.
const clearBtnStart = `<button 
               onClick={() => {
                 if (Object.keys(state.landlord).length > 0 || Object.keys(state.tenant).length > 0 || Object.keys(state.contract).length > 0) {
                   setShowClearConfirm(true);`;

content = content.replace(
  clearBtnStart,
  `)}
            <button 
               onClick={() => {
                 if (Object.keys(state.landlord).length > 0 || Object.keys(state.tenant).length > 0 || Object.keys(state.contract).length > 0) {
                   setShowClearConfirm(true);`
);

fs.writeFileSync('src/App.tsx', content);
