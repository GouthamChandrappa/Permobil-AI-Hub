
import { Brain } from 'lucide-react';

const WorkloadEmptyState = () => {
  return (
    <div className="text-center py-16">
      <Brain className="w-16 h-16 text-emerald-400/30 mx-auto mb-4" />
      <div className="text-emerald-400/70 text-lg">
        No AI workloads found for the selected filter.
      </div>
    </div>
  );
};

export default WorkloadEmptyState;
