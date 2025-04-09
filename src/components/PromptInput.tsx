import React from 'react';
import { useConcepto } from '../context/ConceptoContext';
import DocumentTypeSelector from './DocumentTypeSelector';

const PromptInput: React.FC = () => {
  const { prompt, setPrompt, generateDocument, isLoading, error } = useConcepto();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateDocument();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Describe Your Product
          </label>
          <textarea
            id="prompt"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your product idea, target market, and key features..."
            required
          />
        </div>
        
        <DocumentTypeSelector />
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Document'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
