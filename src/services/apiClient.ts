// Direct API client for complaint classifier service
export class ComplaintClassifierAPI {
  private baseURL: string;

  constructor() {
    // Use environment variable for different environments
    this.baseURL = import.meta.env.VITE_COMPLAINT_CLASSIFIER_URL || 'http://localhost:8001';
  }

  // Get service info for model card
  async getServiceInfo() {
    const response = await fetch(`${this.baseURL}/info`);
    return response.json();
  }

  // Initialize model (Initialize Model button)
  async initializeModel() {
    const response = await fetch(`${this.baseURL}/initialize`, { method: 'POST' });
    return response.json();
  }

  // Get model status
  async getModelStatus() {
    const response = await fetch(`${this.baseURL}/status`);
    return response.json();
  }

  // Upload file
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${this.baseURL}/upload-file`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }

  // Analyze file (Analyze Complaints button)
  async analyzeFile(fileId: string, textColumn: string) {
    const response = await fetch(`${this.baseURL}/analyze-file`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_id: fileId, text_column: textColumn })
    });
    return response.json();
  }

  // Download results
  downloadResults(resultId: string) {
    const link = document.createElement('a');
    link.href = `${this.baseURL}/download/${resultId}`;
    link.download = `complaint_analysis_${resultId}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const complaintAPI = new ComplaintClassifierAPI();