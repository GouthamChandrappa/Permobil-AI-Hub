import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BarChart3, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

interface AnalysisResultsProps {
  results: {
    complaintCount: number;
    nonComplaintCount: number;
    totalProcessed: number;
    accuracy: number;
    downloadData: Blob;
    filename: string;
  };
  onDownload: () => void;
}

const AnalysisResults = ({ results, onDownload }: AnalysisResultsProps) => {
  const barData = [
    {
      name: 'Complaints',
      count: results.complaintCount,
      percentage: ((results.complaintCount / results.totalProcessed) * 100).toFixed(1)
    },
    {
      name: 'Non-Complaints',
      count: results.nonComplaintCount,
      percentage: ((results.nonComplaintCount / results.totalProcessed) * 100).toFixed(1)
    }
  ];

  const pieData = [
    { name: 'Complaints', value: results.complaintCount, color: '#ef4444' },
    { name: 'Non-Complaints', value: results.nonComplaintCount, color: '#22c55e' }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/20 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-200">Total Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{results.totalProcessed.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-500/20 border-red-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-200">Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{results.complaintCount.toLocaleString()}</p>
            <p className="text-sm text-red-300">
              {((results.complaintCount / results.totalProcessed) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-500/20 border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-200">Non-Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{results.nonComplaintCount.toLocaleString()}</p>
            <p className="text-sm text-green-300">
              {((results.nonComplaintCount / results.totalProcessed) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-500/20 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-200">Model Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{results.accuracy.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Classification Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value, name) => [
                    `${value} (${barData.find(d => d.count === value)?.percentage}%)`,
                    'Count'
                  ]}
                />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Distribution Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <RechartsPieChart data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value, name) => [
                    `${value} (${((value as number / results.totalProcessed) * 100).toFixed(1)}%)`,
                    name
                  ]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm text-white">Complaints</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-white">Non-Complaints</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Section */}
      <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white">Download Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Download the processed file with predictions</p>
              <p className="text-blue-200 text-sm">File: {results.filename}</p>
            </div>
            <Button
              onClick={onDownload}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;