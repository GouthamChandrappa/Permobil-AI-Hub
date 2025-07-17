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
      className={`border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center transition-colors ${
        isDragOver
          ? 'border-blue-400 bg-blue-100/20'
          : 'border-blue-600 hover:border-blue-500'
      }`}
      >
      <Upload className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
      <p className="text-white mb-2 text-sm sm:text-base">Drag and drop your Excel file here</p>
      <p className="text-gray-400 mb-3 sm:mb-4 text-sm">or</p>
      <Button 
        onClick={handleBrowseClick}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
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
      <p className="text-gray-500 text-xs sm:text-sm mt-2">
        Supports: .xlsx, .xls, .csv files.
      </p>
      {uploadedFile && (
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800/10 p-3 sm:p-4 rounded-lg gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
            <span className="text-white text-sm sm:text-base truncate">{uploadedFile.name}</span>
          </div>
          <Button
            variant="ghost"
            onClick={onReset}
            className="text-red-500 hover:text-red-600 self-end sm:self-auto"
            size="sm"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;