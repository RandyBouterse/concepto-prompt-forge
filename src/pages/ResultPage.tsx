
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useConcepto } from "@/contexts/ConceptoContext";
import { useToast } from "@/components/ui/use-toast";

const ResultPage: React.FC = () => {
  const { prompt, setPrompt } = useConcepto();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // If someone navigates directly to this page without a prompt, send them back to homepage
    if (!prompt) {
      navigate("/");
      return;
    }
    
    // Get content from sessionStorage (in a real app, this would come from API)
    const content = sessionStorage.getItem("generatedContent");
    if (content) {
      setGeneratedContent(content);
    } else {
      navigate("/");
    }
  }, [navigate, prompt]);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "PRD content has been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "concepto-prd.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded successfully",
      description: "Your PRD has been downloaded as a markdown file",
    });
  };

  const handleStartOver = () => {
    setPrompt("");
    sessionStorage.removeItem("generatedContent");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handleStartOver}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Start over
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleCopyContent}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleDownload}
              className="bg-concepto-purple hover:bg-concepto-purple/90 flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Download PRD
            </Button>
          </div>
        </div>
        
        <div className="bg-white border rounded-xl shadow-sm p-8">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-800">{generatedContent}</pre>
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Concepto.ai – Generate PRDs in seconds
      </footer>
    </div>
  );
};

export default ResultPage;
