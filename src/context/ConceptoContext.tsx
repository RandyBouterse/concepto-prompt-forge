import React, { createContext, useState, useContext, ReactNode } from 'react';
import apiService, { DocumentType, GenerateDocumentResponse } from '../services/api';

// Define the context state interface
interface ConceptoContextState {
  prompt: string;
  response: string;
  documentUrl: string | null;
  documentType: DocumentType;
  isLoading: boolean;
  error: string | null;
  setPrompt: (prompt: string) => void;
  setDocumentType: (type: DocumentType) => void;
  generateDocument: () => Promise<void>;
  clearResponse: () => void;
}

// Create context with default values
const ConceptoContext = createContext<ConceptoContextState | undefined>(undefined);

// Provider component
export const ConceptoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<DocumentType>(DocumentType.PRD);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Generate document based on current prompt and document type
  const generateDocument = async (): Promise<void> => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result: GenerateDocumentResponse = await apiService.generateDocument({
        prompt,
        documentType
      });
      
      if (result.status === 'success') {
        setResponse(result.document);
        setDocumentUrl(result.documentUrl || null);
      } else {
        setError('Failed to generate document. Please try again.');
      }
    } catch (err) {
      setError('An error occurred connecting to the API.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the current response
  const clearResponse = () => {
    setResponse('');
    setDocumentUrl(null);
  };

  // Context value
  const value = {
    prompt,
    response,
    documentUrl,
    documentType,
    isLoading,
    error,
    setPrompt,
    setDocumentType,
    generateDocument,
    clearResponse
  };

  return <ConceptoContext.Provider value={value}>{children}</ConceptoContext.Provider>;
};

// Custom hook for using the context
export const useConcepto = (): ConceptoContextState => {
  const context = useContext(ConceptoContext);
  if (context === undefined) {
    throw new Error('useConcepto must be used within a ConceptoProvider');
  }
  return context;
};
