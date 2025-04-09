import axios from 'axios';

// API base URL configuration
const API_BASE_URL = 'http://35.204.242.1:8001';

// Document types supported by the API
export enum DocumentType {
  PRD = 'prd',
  USER_STORIES = 'user-stories',
  TECH_STACK = 'tech-stack',
  SYSTEM_DESIGN = 'system-design'
}

// Interface for API request payload
export interface GenerateDocumentRequest {
  prompt: string;
  documentType: DocumentType;
  additionalContext?: string;
}

// Interface for API response
export interface GenerateDocumentResponse {
  document: string;
  documentUrl?: string;
  status: string;
}

// API Service
const apiService = {
  /**
   * Generate a document based on the specified type and prompt
   */
  generateDocument: async (request: GenerateDocumentRequest): Promise<GenerateDocumentResponse> => {
    try {
      const { documentType, prompt, additionalContext } = request;
      
      const response = await axios.post(`${API_BASE_URL}/generate/${documentType}`, {
        prompt,
        additional_context: additionalContext || ''
      });
      
      return {
        document: response.data.document,
        documentUrl: response.data.document_url,
        status: 'success'
      };
    } catch (error) {
      console.error('Error generating document:', error);
      return {
        document: '',
        status: 'error',
      };
    }
  },
  
  /**
   * Check API health status
   */
  checkHealth: async (): Promise<boolean> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data.status === 'healthy';
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }
};

export default apiService;
