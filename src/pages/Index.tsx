
import React from "react";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center">
        <PromptInput />
      </main>
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Concepto.ai – Generate PRDs in seconds
      </footer>
    </div>
  );
};

export default Index;
