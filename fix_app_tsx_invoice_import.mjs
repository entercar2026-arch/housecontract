import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

if (!content.includes('import { InvoiceReceipt }')) {
  content = content.replace(
    "import ContractPreview from './components/ContractPreview';",
    "import ContractPreview from './components/ContractPreview';\nimport { InvoiceReceipt } from './components/InvoiceReceipt';"
  );
}

if (!content.includes('Receipt')) {
  content = content.replace(
    "import { Edit, Eye, RotateCcw, User, Users, FileText, AlertTriangle, ChevronDown, Home, Car } from 'lucide-react';",
    "import { Edit, Eye, RotateCcw, User, Users, FileText, AlertTriangle, ChevronDown, Home, Car, Receipt, Monitor, FileCode } from 'lucide-react';"
  );
}

fs.writeFileSync('src/App.tsx', content);
