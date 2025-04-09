
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { useConcepto } from "@/contexts/ConceptoContext";
import { useToast } from "@/components/ui/use-toast";

const PromptInput: React.FC = () => {
  const { prompt, setPrompt, setIsGenerating } = useConcepto();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);

  const handleGeneratePRD = () => {
    if (prompt.trim().length < 10) {
      toast({
        title: "Input too short",
        description: "Please provide more details about your concept",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call - in a real app, this would be an actual API call
    setTimeout(() => {
      // Mock generated content
      const mockContent = `# Product Requirement Document: ${prompt.split(" ").slice(0, 3).join(" ")}...
      
## Overview
This PRD outlines the requirements for developing a new product based on the concept: "${prompt}".

## User Problems
- Problem 1
- Problem 2
- Problem 3

## Proposed Solution
(Content generated based on your prompt)

## Success Metrics
- Metric 1
- Metric 2

## Timeline
- Phase 1: Research & Planning
- Phase 2: Development
- Phase 3: Testing
- Phase 4: Launch

## Resources Needed
- Engineering: 3 developers
- Design: 1 designer
- QA: 1 tester

## Risks & Mitigations
(Content generated based on your prompt)`;
      
      navigate("/loading");
      
      // In a real app, this would happen after the API returns a response
      setTimeout(() => {
        setIsGenerating(false);
        setPrompt(prompt);
        sessionStorage.setItem("generatedContent", mockContent);
        navigate("/result");
      }, 3000);
    }, 500);
  };

  return (
    <div className="max-w-3xl w-full mx-auto mt-8 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Generate your PRD</h2>
        <p className="text-gray-600">
          Describe your product concept in detail. The more specific you are, the better the output will be.
        </p>
      </div>
      
      <div className="bg-white rounded-xl border shadow-sm p-4 transition-all relative">
        <Textarea
          placeholder="Describe your product concept... (e.g., 'A mobile app that helps remote teams collaborate better by providing visual project timelines, integrated communication tools, and AI-powered task prioritization')"
          className="min-h-[200px] resize-y border-0 focus-visible:ring-0 text-base p-0"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setIsTyping(e.target.value.length > 0);
          }}
        />
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="text-sm text-gray-500">
            {isTyping ? "Pro tip: Add target users, goals, and constraints for better results" : "Start typing your concept..."}
          </div>
          <Button 
            onClick={handleGeneratePRD}
            className="bg-concepto-purple hover:bg-concepto-purple/90"
          >
            <Sparkles className="h-4 w-4 mr-2" /> Generate PRD
          </Button>
        </div>
      </div>
      
      <div className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-100">
        <h3 className="text-lg font-medium mb-3">Tips for effective prompts:</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Describe your <strong>target users</strong> and their needs</li>
          <li>Include the <strong>core problem</strong> your product solves</li>
          <li>Mention key <strong>features and functionality</strong></li>
          <li>Add any <strong>constraints or requirements</strong> (timeline, resources, etc.)</li>
          <li>Consider <strong>success metrics</strong> to include in the PRD</li>
        </ul>
      </div>
    </div>
  );
};

export default PromptInput;
