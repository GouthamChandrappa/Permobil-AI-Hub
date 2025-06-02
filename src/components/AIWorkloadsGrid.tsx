
import { useState } from 'react';
import WorkloadCard from './WorkloadCard';
import WorkloadFilters from './WorkloadFilters';
import WorkloadEmptyState from './WorkloadEmptyState';

const AIWorkloadsGrid = () => {
  const [filter, setFilter] = useState('all');

  const workloads = [
    {
      id: 1,
      name: "Mobility Pattern Recognition",
      description: "Deep learning model analyzing wheelchair movement patterns for optimization",
      status: "running" as const,
      type: "Computer Vision",
      accuracy: "96.3%",
      gpuUsage: "78%",
      throughput: "1.2K/sec",
      lastActive: "2 minutes ago",
      priority: "high"
    },
    {
      id: 2,
      name: "Predictive Maintenance AI",
      description: "LSTM-based system predicting component failures before they occur",
      status: "training" as const,
      type: "Time Series",
      accuracy: "94.1%",
      gpuUsage: "92%",
      throughput: "850/sec",
      lastActive: "Active now",
      priority: "critical"
    },
    {
      id: 3,
      name: "User Behavior Analytics",
      description: "Real-time analysis of user interaction patterns and preferences",
      status: "deployed" as const,
      type: "Recommendation",
      accuracy: "91.7%",
      gpuUsage: "45%",
      throughput: "2.1K/sec",
      lastActive: "5 seconds ago",
      priority: "medium"
    },
    {
      id: 4,
      name: "Speech Recognition Engine",
      description: "Advanced NLP model for voice command processing and interpretation",
      status: "idle" as const,
      type: "Natural Language",
      accuracy: "89.4%",
      gpuUsage: "12%",
      throughput: "0/sec",
      lastActive: "1 hour ago",
      priority: "low"
    },
    {
      id: 5,
      name: "Safety Anomaly Detection",
      description: "Real-time safety monitoring using computer vision and sensor fusion",
      status: "running" as const,
      type: "Anomaly Detection",
      accuracy: "98.2%",
      gpuUsage: "67%",
      throughput: "3.4K/sec",
      lastActive: "Active now",
      priority: "critical"
    },
    {
      id: 6,
      name: "Route Optimization Neural Net",
      description: "AI-powered path planning and navigation optimization system",
      status: "deployed" as const,
      type: "Reinforcement Learning",
      accuracy: "93.8%",
      gpuUsage: "34%",
      throughput: "890/sec",
      lastActive: "30 seconds ago",
      priority: "high"
    }
  ];

  const filteredWorkloads = filter === 'all' 
    ? workloads 
    : workloads.filter(workload => workload.status === filter);

  return (
    <section id="workloads" className="py-20 px-6 relative">
      {/* Section Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-transparent to-purple-600/5" />
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-ai-gradient mb-6">AI Workload Orchestration</h2>
          <p className="text-xl text-emerald-400/80 max-w-3xl mx-auto leading-relaxed">
            Monitor, deploy, and scale machine learning workloads across Permobil's neural infrastructure with real-time performance analytics.
          </p>
        </div>

        {/* Controls Panel */}
        <WorkloadFilters filter={filter} onFilterChange={setFilter} />

        {/* Advanced Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWorkloads.map((workload, index) => (
            <WorkloadCard key={workload.id} workload={workload} index={index} />
          ))}
        </div>

        {filteredWorkloads.length === 0 && <WorkloadEmptyState />}
      </div>
    </section>
  );
};

export default AIWorkloadsGrid;
