import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  "import { Edit, Eye, RotateCcw, User, Users, FileText, AlertTriangle, ChevronDown, Home, Car } from 'lucide-react';",
  "import { Edit, Eye, RotateCcw, User, Users, FileText, AlertTriangle, ChevronDown, Home, Car, Receipt, Monitor, FileCode } from 'lucide-react';"
);

fs.writeFileSync('src/App.tsx', content);
