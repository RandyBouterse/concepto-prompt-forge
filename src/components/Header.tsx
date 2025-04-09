
import React from "react";
import { Sparkles } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-concepto-purple" />
          <h1 className="text-2xl font-bold">Concepto.ai</h1>
        </div>
        <div className="text-sm text-gray-500">
          PRD Generator for Product Managers
        </div>
      </div>
    </header>
  );
};

export default Header;
