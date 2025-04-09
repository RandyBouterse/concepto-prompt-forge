
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import Header from "@/components/Header";
import { useConcepto } from "@/contexts/ConceptoContext";

const LoadingPage: React.FC = () => {
  const { isGenerating, prompt } = useConcepto();
  const navigate = useNavigate();

  useEffect(() => {
    // If someone navigates directly to this page without a prompt, send them back to the homepage
    if (!prompt) {
      navigate("/");
    }
    
    // If we're not in the generating state, something went wrong - go back to home
    if (!isGenerating) {
      navigate("/");
    }
  }, [isGenerating, navigate, prompt]);

  const loadingMessages = [
    "Analyzing your concept...",
    "Crafting your PRD structure...",
    "Generating detailed sections...",
    "Adding product requirements...",
    "Finalizing your document..."
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="flex justify-center mb-8">
            <Loader className="h-12 w-12 text-concepto-purple animate-spin" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Generating your PRD</h2>
          
          <div className="mb-8">
            {loadingMessages.map((message, index) => (
              <div 
                key={index} 
                className={`py-2 text-lg transition-all ${
                  index === Math.floor(Date.now() / 1500) % loadingMessages.length 
                    ? "text-concepto-purple font-medium" 
                    : "text-gray-400"
                }`}
              >
                {message}
              </div>
            ))}
          </div>
          
          <p className="text-gray-600 animate-pulse-opacity">
            This may take a few moments...
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoadingPage;
