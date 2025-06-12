import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, FileSpreadsheet, TrendingUp, MessageSquare } from 'lucide-react';
import FileUploadZone from '@/components/FileUploadZone';
import DataPreview from '@/components/DataPreview';
import DataAnalytics from '@/components/DataAnalytics';
import AnalysisResults from '@/components/AnalysisResults';
import { toast } from "sonner";
import * as XLSX from 'xlsx';

interface UploadedData {
  headers: string[];
  rows: any[][];
  totalRows: number;
}

interface AnalysisResultData {
  complaintCount: number;
  nonComplaintCount: number;
  totalProcessed: number;
  accuracy: number;
  downloadData: Blob;
  filename: string;
}

const ComplaintClassifier = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedData, setUploadedData] = useState<UploadedData | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResultData | null>(null);

  const parseExcelFile = (file: File): Promise<UploadedData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (jsonData.length === 0) {
            reject(new Error('File is empty'));
            return;
          }
          
          const headers = (jsonData[0] as string[]).map(h => String(h || '').trim());
          const allRows = jsonData.slice(1).map(row => 
            (row as any[]).map(cell => String(cell || '').trim())
          );
          
          // Show first 10 rows for preview
          const previewRows = allRows.slice(0, 10);
          
          resolve({
            headers,
            rows: previewRows,
            totalRows: allRows.length
          });
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const parseCSVFile = (file: File): Promise<UploadedData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\n').filter(line => line.trim());
          
          if (lines.length === 0) {
            reject(new Error('File is empty'));
            return;
          }
          
          const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
          const allRows = lines.slice(1).map(line => 
            line.split(',').map(cell => cell.trim().replace(/"/g, ''))
          );
          
          // Show first 10 rows for preview
          const previewRows = allRows.slice(0, 10);
          
          resolve({
            headers,
            rows: previewRows,
            totalRows: allRows.length
          });
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    
    try {
      let data: UploadedData;
      
      if (file.name.endsWith('.csv')) {
        data = await parseCSVFile(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        data = await parseExcelFile(file);
      } else {
        throw new Error('Unsupported file format');
      }
      
      setUploadedData(data);
      setSelectedColumn('');
      setAnalysisResults(null);
      
      toast.success('File uploaded and parsed successfully');
    } catch (error) {
      toast.error('Error parsing file: ' + (error as Error).message);
      console.error('File parsing error:', error);
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

    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 800);

      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('text_column', selectedColumn);

      // Replace with your actual complaint classifier API endpoint
      const response = await fetch('/api/complaint-classifier', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const blob = await response.blob();
      
      // Create mock results for demonstration
      const mockResults: AnalysisResultData = {
        complaintCount: Math.floor(Math.random() * 200) + 50,
        nonComplaintCount: Math.floor(Math.random() * 300) + 100,
        totalProcessed: uploadedData?.totalRows || 0,
        accuracy: 87.5 + Math.random() * 10,
        downloadData: blob,
        filename: `complaint_analysis_${uploadedFile.name}`
      };
      
      setAnalysisResults(mockResults);
      toast.success('Complaint analysis completed successfully');
    } catch (error) {
      toast.error('Error analyzing complaints. Using mock result for demonstration.');
      
      // Mock successful result for demonstration
      setTimeout(() => {
        const mockData = new Blob(['Mock complaint classification results'], { type: 'application/vnd.ms-excel' });
        const mockResults: AnalysisResultData = {
          complaintCount: 75,
          nonComplaintCount: 125,
          totalProcessed: uploadedData?.totalRows || 200,
          accuracy: 89.2,
          downloadData: mockData,
          filename: `complaint_analysis_${uploadedFile.name}`
        };
        
        setAnalysisResults(mockResults);
        setProgress(100);
      }, 1000);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = () => {
    if (!analysisResults) return;

    const url = URL.createObjectURL(analysisResults.downloadData);
    const a = document.createElement('a');
    a.href = url;
    a.download = analysisResults.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Analysis results downloaded successfully');
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadedData(null);
    setSelectedColumn('');
    setAnalysisResults(null);
    setProgress(0);
    setIsAnalyzing(false);
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
              <DataAnalytics data={uploadedData} />
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
                    <span>Analyzing complaints...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-blue-300">
                    AI is classifying your complaints and generating insights...
                  </p>
                </div>
              )}
              
              <div className="flex gap-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !uploadedFile || !selectedColumn}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Complaints'}
                </Button>
              </div>

              {!selectedColumn && uploadedData && (
                <p className="text-yellow-300 text-sm">
                  Please select a text column to enable analysis.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {analysisResults && (
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Analysis Results</CardTitle>
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
