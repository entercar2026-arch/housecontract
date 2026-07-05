import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  "{activeTab !== 'invoice' && (<div className=\"flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl ml-1 md:ml-4 relative ring-1 ring-slate-200/50\">",
  '<div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl ml-1 md:ml-4 relative ring-1 ring-slate-200/50">'
);

const targetStr = `              )}
            </div>
            )}
            <button 
               onClick={() => {
                 const isLandlordFilled`;

const newStr = `              )}
            </div>
            <button 
               onClick={() => {
                 const isLandlordFilled`;

content = content.replace(targetStr, newStr);

fs.writeFileSync('src/App.tsx', content);
