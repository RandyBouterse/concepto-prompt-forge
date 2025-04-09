import React from 'react';
import { ConceptoProvider } from './context/ConceptoContext';
import PromptInput from './components/PromptInput';
import ResultDisplay from './components/ResultDisplay';

function App() {
  return (
    <ConceptoProvider>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Concepto AI</h1>
            <p className="mt-2 text-lg text-gray-600">
              AI-Powered Product Management Document Generator
            </p>
          </div>
          
          <PromptInput />
          <ResultDisplay />
        </div>
      </div>
    </ConceptoProvider>
  );
}

export default App;
