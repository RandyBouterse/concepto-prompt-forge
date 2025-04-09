
import React, { createContext, useState, useContext } from "react";

interface ConceptoContextType {
  prompt: string;
  setPrompt: (prompt: string) => void;
  generatedContent: string;
  setGeneratedContent: (content: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const ConceptoContext = createContext<ConceptoContextType | undefined>(undefined);

export const ConceptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <ConceptoContext.Provider
      value={{
        prompt,
        setPrompt,
        generatedContent,
        setGeneratedContent,
        isGenerating,
        setIsGenerating,
      }}
    >
      {children}
    </ConceptoContext.Provider>
  );
};

export const useConcepto = (): ConceptoContextType => {
  const context = useContext(ConceptoContext);
  if (context === undefined) {
    throw new Error("useConcepto must be used within a ConceptoProvider");
  }
  return context;
};
