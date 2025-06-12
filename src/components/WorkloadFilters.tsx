
import { Button } from '@/components/ui/button';
import { Filter, Plus } from 'lucide-react';

interface WorkloadFiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const WorkloadFilters = ({ filter, onFilterChange }: WorkloadFiltersProps) => {
  const filterOptions = ['all', 'running', 'deployed', 'training', 'idle'];

  return (
    <div className="neural-card p-6 mb-8">
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-emerald-400" />
          <div className="flex space-x-2">
            {filterOptions.map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "ghost"}
                size="sm"
                onClick={() => onFilterChange(status)}
                className={filter === status 
                  ? "bg-emerald-400 text-black hover:bg-emerald-400/80" 
                  : "hover:bg-emerald-400/10 text-emerald-400/70 hover:text-emerald-400"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        
        <Button className="bg-gradient-to-r from-emerald-400 to-purple-600 hover:from-emerald-400/80 hover:to-purple-600/80 text-white ai-glow">
          <Plus className="w-4 h-4 mr-2" />
          Deploy New Workload
        </Button>
      </div>
    </div>
  );
};

export default WorkloadFilters;
