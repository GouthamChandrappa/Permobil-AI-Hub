
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Plus, Search } from 'lucide-react';
import MLModelCard from './MLModelCard';

const MLModelsGrid = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const models = [
    {
      id: 1,
      name: "Complaint Classifier",
      description: " ",
      type: "Classification",
      status: "active" as const,
      accuracy: "96.2%",
      usage: "1.2K/day",
      users: 45,
      category: "classification" as const
    }
  ];

  const filteredModels = models.filter(model => {
    const matchesFilter = filter === 'all' || model.status === filter;
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleLaunchModel = (id: number) => {
    console.log(`Launching model ${id}`);
    // Handle model launch logic here
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-4xl font-bold text-gradient-blue mb-2">ML Model Library</h2>
          <p className="text-xl text-gray-600">Deploy and manage AI models for your workflow automation</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white blue-glow">
          <Plus className="w-5 h-5 mr-2" />
          Deploy New Model
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="futuristic-card p-6 bg-white/95">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-start md:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filters */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex space-x-2">
              {['all', 'active', 'deployed', 'training', 'idle'].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className={filter === status 
                    ? "bg-blue-600 text-white" 
                    : "hover:bg-blue-50 text-gray-600"
                  }
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModels.map((model, index) => (
          <div 
            key={model.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <MLModelCard 
              model={model} 
              onLaunch={handleLaunchModel}
            />
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-600 mb-2">No models found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default MLModelsGrid;
