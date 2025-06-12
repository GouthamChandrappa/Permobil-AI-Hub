import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UploadedData {
  headers: string[];
  rows: any[][];
  totalRows: number;
}

interface DataAnalyticsProps {
  data: UploadedData;
}

const DataAnalytics = ({ data }: DataAnalyticsProps) => {
  // Calculate basic statistics
  const columnStats = data.headers.map((header, colIndex) => {
    const columnData = data.rows.map(row => row[colIndex]).filter(val => val && val.trim());
    const numericData = columnData.filter(val => !isNaN(parseFloat(val))).map(val => parseFloat(val));
    
    return {
      name: header,
      totalValues: columnData.length,
      emptyValues: data.rows.length - columnData.length,
      isNumeric: numericData.length > 0,
      min: numericData.length > 0 ? Math.min(...numericData) : null,
      max: numericData.length > 0 ? Math.max(...numericData) : null,
      avg: numericData.length > 0 ? (numericData.reduce((a, b) => a + b, 0) / numericData.length) : null,
    };
  });

  const totalCells = data.headers.length * data.totalRows;
  const filledCells = columnStats.reduce((sum, col) => sum + col.totalValues, 0);
  const completeness = ((filledCells / totalCells) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/20 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-200">Total Rows</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{data.totalRows.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-500/20 border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-200">Columns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{data.headers.length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-500/20 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-200">Data Completeness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{completeness}%</p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-500/20 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-200">Numeric Columns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">
              {columnStats.filter(col => col.isNumeric).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Column Statistics */}
      <Card className="bg-white/5 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white">Column Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-500/30">
                  <th className="text-left py-2 text-blue-200">Column</th>
                  <th className="text-left py-2 text-blue-200">Type</th>
                  <th className="text-left py-2 text-blue-200">Filled</th>
                  <th className="text-left py-2 text-blue-200">Empty</th>
                  <th className="text-left py-2 text-blue-200">Min</th>
                  <th className="text-left py-2 text-blue-200">Max</th>
                  <th className="text-left py-2 text-blue-200">Average</th>
                </tr>
              </thead>
              <tbody>
                {columnStats.map((stat, index) => (
                  <tr key={index} className="border-b border-blue-500/20">
                    <td className="py-2 text-white font-medium">{stat.name}</td>
                    <td className="py-2 text-blue-100">
                      {stat.isNumeric ? 'Numeric' : 'Text'}
                    </td>
                    <td className="py-2 text-green-300">{stat.totalValues}</td>
                    <td className="py-2 text-red-300">{stat.emptyValues}</td>
                    <td className="py-2 text-blue-100">
                      {stat.min !== null ? stat.min.toFixed(2) : '-'}
                    </td>
                    <td className="py-2 text-blue-100">
                      {stat.max !== null ? stat.max.toFixed(2) : '-'}
                    </td>
                    <td className="py-2 text-blue-100">
                      {stat.avg !== null ? stat.avg.toFixed(2) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataAnalytics;
