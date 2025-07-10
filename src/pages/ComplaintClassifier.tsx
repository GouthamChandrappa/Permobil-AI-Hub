import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, FileSpreadsheet, TrendingUp, MessageSquare, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import FileUploadZone from '@/components/FileUploadZone';
import DataPreview from '@/components/DataPreview';
import DataAnalytics from '@/components/DataAnalytics';
import AnalysisResults from '@/components/AnalysisResults';
import { toast } from "sonner";

// API Client for complaint classifier service
class ComplaintClassifierAPI {
  private baseURL: string;

  constructor() {
    // Use environment variable for different environments
    this.baseURL = import.meta.env.VITE_COMPLAINT_CLASSIFIER_URL || 'http://localhost:8001';
  }

  // Get service info for model card
  async getServiceInfo() {
    const response = await fetch(`${this.baseURL}/info`);
    if (!response.ok) throw new Error('Failed to get service info');
    return response.json();
  }

  // Initialize model (Initialize Model button)
  async initializeModel() {
    const response = await fetch(`${this.baseURL}/initialize`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to initialize model');
    return response.json();
  }

  // Get model status
  async getModelStatus() {
    const response = await fetch(`${this.baseURL}/status`);
    if (!response.ok) throw new Error('Failed to get model status');
    return response.json();
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${this.baseURL}/health`);
    if (!response.ok) throw new Error('Health check failed');
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
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to upload file');
    }
    
    return response.json();
  }

  // Analyze file (Analyze Complaints button)
  async analyzeFile(fileId: string, textColumn: string) {
    const response = await fetch(`${this.baseURL}/analyze-file`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_id: fileId, text_column: textColumn })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to analyze file');
    }
    
    return response.json();
  }

  // Download results
  downloadResults(resultId: string, filename?: string) {
    const link = document.createElement('a');
    link.href = `${this.baseURL}/download/${resultId}`;
    link.download = filename || `complaint_analysis_${resultId}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Create API client instance
const complaintAPI = new ComplaintClassifierAPI();

// Updated interfaces
interface UploadedData {
  headers: string[];
  rows: (string | number | boolean | null)[][];
  totalRows: number;
}

interface AnalysisResultData {
  complaintCount: number;
  nonComplaintCount: number;
  totalProcessed: number;
  accuracy: number;
  averageConfidence?: number;
  processingTime?: number;
  downloadData?: Blob; // Made optional since we use result_id now
  filename: string;
  resultId?: string; // Added for download functionality
}

interface ModelStatus {
  status: string;
  model_loaded: boolean;
  memory_usage?: string;
  device?: string;
  predictions_today?: number;
}

const ComplaintClassifier = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedData, setUploadedData] = useState<UploadedData | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResultData | null>(null);
  const [fileId, setFileId] = useState<string>('');
  
  // Model status states
  const [modelStatus, setModelStatus] = useState<ModelStatus | null>(null);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  // Check model status on component mount
  useEffect(() => {
    checkModelStatus();
    const interval = setInterval(checkModelStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkModelStatus = async () => {
    try {
      const [statusResponse, healthResponse] = await Promise.all([
        complaintAPI.getModelStatus(),
        complaintAPI.healthCheck()
      ]);
      
      setModelStatus(statusResponse);
      setIsModelReady(statusResponse.status === 'ready' && healthResponse.status === 'healthy');
    } catch (error) {
      console.error('Failed to check model status:', error);
      setIsModelReady(false);
      setModelStatus({
        status: 'error',
        model_loaded: false
      });
    }
  };

  const initializeModel = async () => {
    setIsInitializing(true);
    try {
      const result = await complaintAPI.initializeModel();
      toast.success(result.message || 'Model initialized successfully');
      await checkModelStatus(); // Refresh status
    } catch (error) {
      toast.error('Failed to initialize model: ' + (error as Error).message);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    
    if (!isModelReady) {
      toast.error('Please initialize the model first');
      return;
    }
    
    try {
      const result = await complaintAPI.uploadFile(file);
      
      if (result.success) {
        setUploadedData({
          headers: result.columns,
          rows: result.preview.map((row: Record<string, string | number | boolean | null>) => Object.values(row)),
          totalRows: result.total_rows
        });
        
        setFileId(result.file_id);
        setSelectedColumn('');
        setAnalysisResults(null);
        
        toast.success('File uploaded and parsed successfully');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast.error('Error uploading file: ' + (error as Error).message);
      console.error('File upload error:', error);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast.error('Please upload a file first');
      return;
    }

    if (!selectedColumn) {
      toast.error('Please select a column containing the text data');
      return;
    }

    if (!isModelReady) {
      toast.error('Model is not ready. Please initialize the model first.');
      return;
    }

    if (!fileId) {
      toast.error('File ID not found. Please upload the file again.');
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Simulate progress while waiting for analysis
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 1000);

      const result = await complaintAPI.analyzeFile(fileId, selectedColumn);

      clearInterval(progressInterval);
      setProgress(100);

      if (result.success) {
        const analysisData: AnalysisResultData = {
          complaintCount: result.summary.complaintCount,
          nonComplaintCount: result.summary.nonComplaintCount,
          totalProcessed: result.summary.totalProcessed,
          accuracy: result.summary.accuracy,
          averageConfidence: result.summary.averageConfidence,
          processingTime: result.summary.processingTime,
          filename: `complaint_analysis_${uploadedFile.name}`,
          resultId: result.result_id
        };
        
        setAnalysisResults(analysisData);
        toast.success(`Analysis completed! Found ${result.summary.complaintCount} complaints out of ${result.summary.totalProcessed} records.`);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Analysis failed: ${errorMessage}`);
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = () => {
    if (!analysisResults?.resultId) {
      toast.error('No results available for download');
      return;
    }

    try {
      complaintAPI.downloadResults(analysisResults.resultId, analysisResults.filename);
      toast.success('Download started successfully');
    } catch (error) {
      toast.error('Failed to download results: ' + (error as Error).message);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadedData(null);
    setSelectedColumn('');
    setAnalysisResults(null);
    setProgress(0);
    setIsAnalyzing(false);
    setFileId('');
  };

  const getStatusBadge = () => {
    if (!modelStatus) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          Checking...
        </Badge>
      );
    }

    switch (modelStatus.status) {
      case 'ready':
        return (
          <Badge variant="default" className="bg-green-600 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Ready
          </Badge>
        );
      case 'loading':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            Loading...
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Error
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <MessageSquare className="w-10 h-10 text-blue-400" />
            Complaint Classifier
          </h1>
          <p className="text-blue-200">Upload your complaint data and get AI-powered classification results</p>
          
          {/* Model Status */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="text-blue-200">Model Status:</span>
            {getStatusBadge()}
            {modelStatus && (
              <span className="text-sm text-blue-300">
                {modelStatus.device && `${modelStatus.device} • `}
                {modelStatus.memory_usage && `${modelStatus.memory_usage} • `}
                {modelStatus.predictions_today && `${modelStatus.predictions_today} predictions`}
              </span>
            )}
          </div>
          
          {/* Initialize Model Button */}
          {!isModelReady && (
            <div className="mt-4">
              <Button
                onClick={initializeModel}
                disabled={isInitializing}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isInitializing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Initializing Model...
                  </>
                ) : (
                  'Initialize Model'
                )}
              </Button>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Complaint Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploadZone 
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFile}
              onReset={resetUpload}
            />
            {!isModelReady && (
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  Please initialize the model before uploading files.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Column Selection */}
        {uploadedData && (
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Select Text Column</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-200">
                  Please select the column that contains the complaint text data:
                </p>
                <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                  <SelectTrigger className="bg-white/10 border-blue-500/30 text-white">
                    <SelectValue placeholder="Choose a column..." />
                  </SelectTrigger>
                  <SelectContent>
                    {uploadedData.headers.map((header, index) => (
                      <SelectItem key={index} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedColumn && (
                  <p className="text-green-300 text-sm">
                    Selected column: <strong>{selectedColumn}</strong>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Preview Section */}
        {uploadedData && (
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5" />
                Data Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataPreview data={uploadedData} />
            </CardContent>
          </Card>
        )}

        {/* Analytics Section */}
        {uploadedData && (
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Data Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataAnalytics
                data={
                  uploadedData
                    ? {
                        ...uploadedData,
                        rows: uploadedData.rows.map(row =>
                          row.map(cell =>
                            typeof cell === 'boolean' ? String(cell) : cell
                          )
                        ),
                      }
                    : uploadedData
                }
              />
            </CardContent>
          </Card>
        )}

        {/* Analysis Section */}
        {uploadedFile && uploadedData && (
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Analyze Complaints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-blue-200">
                    <span>Analyzing complaints with AI...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-blue-300">
                    BERT model is processing your data and classifying complaints...
                  </p>
                </div>
              )}
              
              <div className="flex gap-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !uploadedFile || !selectedColumn || !isModelReady || !fileId}
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-600"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Complaints with AI'
                  )}
                </Button>
              </div>

              {!selectedColumn && uploadedData && (
                <p className="text-yellow-300 text-sm">
                  Please select a text column to enable analysis.
                </p>
              )}
              
              {!isModelReady && (
                <p className="text-red-300 text-sm">
                  Model is not ready. Please initialize the model first.
                </p>
              )}

              {!fileId && uploadedFile && (
                <p className="text-yellow-300 text-sm">
                  Please upload the file again to get a valid file ID.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {analysisResults && (
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnalysisResults 
                results={analysisResults} 
                onDownload={handleDownload}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ComplaintClassifier;