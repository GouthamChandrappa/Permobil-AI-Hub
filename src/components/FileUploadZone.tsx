import { useCallback, useState } from 'react';
import { Upload, X, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
  onReset: () => void;
}

const FileUploadZone = ({ onFileUpload, uploadedFile, onReset }: FileUploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      // Reset the input value so the same file can be selected again
      e.target.value = '';
    }
  };

  const handleBrowseClick = () => {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragOver
          ? 'border-blue-400 bg-blue-100/20'
          : 'border-blue-600 hover:border-blue-500'
      }`}
      >
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-white mb-2">Drag and drop your Excel file here</p>
      <p className="text-gray-400 mb-4">or</p>
      <Button 
        onClick={handleBrowseClick}
        className="bg-blue-600 hover:bg-blue-700 text-white"
        type="button"
      >
        Browse Files
      </Button>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload Excel or CSV file for complaint classification"
        title="Select an Excel or CSV file to upload"
      />
      <p className="text-gray-500 text-sm mt-2">
        Supports: .xlsx, .xls, .csv files.
      </p>
      {uploadedFile && (
        <div className="mt-6 flex items-center justify-between bg-gray-800/10 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-6 h-6 text-blue-400" />
            <span className="text-white">{uploadedFile.name}</span>
          </div>
          <Button
            variant="ghost"
            onClick={onReset}
            className="text-red-500 hover:text-red-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
