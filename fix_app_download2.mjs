import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const saveImageBtn = `            {(activeTab === 'preview' || activeTab === 'invoice') && (
              <button
                onClick={handleDownloadImage}
                className="ml-1 md:ml-2 flex bg-emerald-600 text-white p-1.5 rounded-2xl px-3 md:px-4 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 hover:bg-emerald-700 shadow-sm"
                title="Save as Image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden md:inline">Save Image</span>
              </button>
            )}

            {(activeTab === 'preview' || activeTab === 'invoice') && (
              <button
                onClick={() => window.print()}
                className="ml-1 md:ml-2 flex bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-1.5 rounded-2xl px-3 md:px-4 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 hover:from-indigo-600 hover:to-indigo-700 shadow-sm shadow-indigo-600/20"
                title="Print to PDF"`;

content = content.replace(
  `            {(activeTab === 'preview' || activeTab === 'invoice') && (
              <button
                onClick={() => window.print()}
                className="ml-1 md:ml-2 flex bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-1.5 rounded-2xl px-3 md:px-4 text-[10px] md:text-xs font-semibold transition-all items-center gap-1.5 hover:from-indigo-600 hover:to-indigo-700 shadow-sm shadow-indigo-600/20"
                title="Print to PDF"`,
  saveImageBtn
);

fs.writeFileSync('src/App.tsx', content);
