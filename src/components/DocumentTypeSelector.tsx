import React from 'react';
import { useConcepto } from '../context/ConceptoContext';
import { DocumentType } from '../services/api';

const DocumentTypeSelector: React.FC = () => {
  const { documentType, setDocumentType } = useConcepto();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Document Type
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            documentType === DocumentType.PRD
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setDocumentType(DocumentType.PRD)}
        >
          PRD
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            documentType === DocumentType.USER_STORIES
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setDocumentType(DocumentType.USER_STORIES)}
        >
          User Stories
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            documentType === DocumentType.TECH_STACK
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setDocumentType(DocumentType.TECH_STACK)}
        >
          Tech Stack
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            documentType === DocumentType.SYSTEM_DESIGN
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setDocumentType(DocumentType.SYSTEM_DESIGN)}
        >
          System Design
        </button>
      </div>
    </div>
  );
};

export default DocumentTypeSelector;
