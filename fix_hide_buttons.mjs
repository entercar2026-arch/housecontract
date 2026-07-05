import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `              )}
            </div>
            <button 
               onClick={() => {
                 const isLandlordFilled`;

const newStr = `              )}
            </div>
            )}
            <button 
               onClick={() => {
                 const isLandlordFilled`;

content = content.replace(targetStr, newStr);
fs.writeFileSync('src/App.tsx', content);
