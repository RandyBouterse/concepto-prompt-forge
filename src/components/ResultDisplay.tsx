import React from 'react';
import { useConcepto } from '../context/ConceptoContext';

const ResultDisplay: React.FC = () => {
  const { response, documentUrl, isLoading, clearResponse } = useConcepto();

  if (isLoading) {
    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
          <p className="ml-3 text-gray-700">Generating your document...</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-900">Generated Document</h2>
        <div className="flex space-x-2">
          {documentUrl && (
            <a
              href={documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Open in Google Docs
            </a>
          )}
          <button
            onClick={clearResponse}
            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br />') }} />
      </div>
    </div>
  );
};

export default ResultDisplay;
