
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  MessageSquare, 
  FileText, 
  Shield, 
  Eye, 
  Play, 
  Settings,
  TrendingUp,
  Users,
  Clock,
  Zap
} from 'lucide-react';

interface MLModelCardProps {
  model: {
    id: number;
    name: string;
    description: string;
    type: string;
    status: 'active' | 'training' | 'deployed' | 'idle';
    accuracy?: string;
    usage: string;
    users: number;
    category: 'nlp' | 'classification' | 'rag' | 'analysis' | 'automation';
  };
  onLaunch: (id: number) => void;
}

const MLModelCard = ({ model, onLaunch }: MLModelCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (category: string) => {
    switch (category) {
      case 'nlp': return MessageSquare;
      case 'classification': return Brain;
      case 'rag': return FileText;
      case 'analysis': return TrendingUp;
      case 'automation': return Zap;
      default: return Brain;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'training': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'deployed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'idle': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nlp': return 'from-blue-500 to-cyan-500';
      case 'classification': return 'from-purple-500 to-pink-500';
      case 'rag': return 'from-green-500 to-emerald-500';
      case 'analysis': return 'from-orange-500 to-red-500';
      case 'automation': return 'from-indigo-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const IconComponent = getIcon(model.category);

  return (
    <div 
      className={`relative bg-black/10 backdrop-blur-xl border border-cyan-400/20 p-6 rounded-2xl cursor-pointer transition-all duration-500 group hover:border-cyan-400/40 hover:bg-black/20 ${
        isHovered ? 'scale-[1.02] shadow-lg shadow-cyan-500/25' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(model.category)} rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 animate-floating`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-cyan-100 group-hover:text-white transition-colors">
              {model.name}
            </h3>
            <Badge className={`text-xs backdrop-blur-sm ${getStatusColor(model.status)}`}>
              {model.status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 backdrop-blur-sm">
            {model.type}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-cyan-200 mb-6 leading-relaxed">
        {model.description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {model.accuracy && (
          <div className="text-center p-3 bg-cyan-500/10 backdrop-blur-sm rounded-xl border border-cyan-400/20">
            <TrendingUp className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-cyan-300">{model.accuracy}</div>
            <div className="text-xs text-cyan-400">Accuracy</div>
          </div>
        )}
        <div className="text-center p-3 bg-green-500/10 backdrop-blur-sm rounded-xl border border-green-400/20">
          <Users className="w-4 h-4 text-green-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-green-300">{model.users}</div>
          <div className="text-xs text-green-400">Active Users</div>
        </div>
        <div className="text-center p-3 bg-purple-500/10 backdrop-blur-sm rounded-xl border border-purple-400/20">
          <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-purple-300">{model.usage}</div>
          <div className="text-xs text-purple-400">Usage</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button 
          onClick={() => onLaunch(model.id)}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25 backdrop-blur-sm border border-cyan-400/30 transition-all duration-300"
        >
          <Play className="w-4 h-4 mr-2" />
          Launch Model
        </Button>
        <Button variant="outline" size="icon" className="border-cyan-400/30 bg-black/20 backdrop-blur-sm hover:bg-cyan-500/20 text-cyan-300 hover:text-white">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="border-cyan-400/30 bg-black/20 backdrop-blur-sm hover:bg-cyan-500/20 text-cyan-300 hover:text-white">
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default MLModelCard;
