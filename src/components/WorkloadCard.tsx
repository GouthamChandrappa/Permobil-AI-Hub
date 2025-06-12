
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity, Cpu, Eye, Play, Pause, Square } from 'lucide-react';

interface WorkloadCardProps {
  workload: {
    id: number;
    name: string;
    description: string;
    status: 'running' | 'training' | 'deployed' | 'idle';
    type: string;
    accuracy: string;
    gpuUsage: string;
    throughput: string;
    lastActive: string;
    priority: string;
  };
  index: number;
}

const WorkloadCard = ({ workload, index }: WorkloadCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-emerald-400 bg-emerald-400/20';
      case 'training': return 'text-blue-400 bg-blue-400/20';
      case 'deployed': return 'text-purple-400 bg-purple-400/20';
      case 'idle': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div 
      className={`neural-card p-6 hover:ai-glow transition-all duration-500 group border-l-4 ${getPriorityColor(workload.priority)} animate-fade-in`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400/20 to-purple-600/20 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
              {workload.name}
            </h3>
            <Badge className={`text-xs ${getStatusColor(workload.status)} border-0`}>
              {workload.status}
            </Badge>
          </div>
        </div>
        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {workload.description}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="neural-card p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-emerald-400/70">Accuracy</span>
          </div>
          <div className="text-lg font-bold text-emerald-400">{workload.accuracy}</div>
        </div>
        <div className="neural-card p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-400/70">GPU Usage</span>
          </div>
          <div className="text-lg font-bold text-purple-400">{workload.gpuUsage}</div>
        </div>
      </div>

      {/* Throughput Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Throughput</span>
          <span>{workload.throughput}</span>
        </div>
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-purple-600 transition-all duration-1000 data-flow"
            style={{ width: `${Math.random() * 80 + 20}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{workload.lastActive}</span>
        <div className="flex space-x-1">
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hover:bg-emerald-400/10">
            <Play className="w-3 h-3 text-emerald-400" />
          </Button>
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hover:bg-yellow-400/10">
            <Pause className="w-3 h-3 text-yellow-400" />
          </Button>
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hover:bg-red-400/10">
            <Square className="w-3 h-3 text-red-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkloadCard;
