import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface UploadedData {
  headers: string[];
  rows: (string | number | boolean | null)[][];
  totalRows: number;
}

interface DataPreviewProps {
  data: UploadedData;
}

const DataPreview = ({ data }: DataPreviewProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p className="text-blue-200 text-sm sm:text-base">
          Showing first {Math.min(10, data.rows.length)} rows of {data.totalRows} total rows
        </p>
        <p className="text-blue-200 text-sm sm:text-base">
          {data.headers.length} columns
        </p>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-blue-500/30">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-500/50">
              {data.headers.map((header, index) => (
                <TableHead key={index} className="text-white font-medium text-xs sm:text-sm whitespace-nowrap">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.rows.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex} 
                className="border-blue-500/20 hover:bg-blue-500/30"
              >
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="text-blue-100 text-xs sm:text-sm whitespace-nowrap">
                    {cell || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataPreview;