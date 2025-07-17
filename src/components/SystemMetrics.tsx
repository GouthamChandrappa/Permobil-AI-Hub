import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Activity, 
  Shield, 
  Users, 
  TrendingUp, 
  Server, 
  Cpu, 
  Database,
  Zap,
  CheckCircle
} from 'lucide-react';

const SystemMetrics = () => {
  const metrics = [
    { 
      label: 'Active Models', 
      value: '1',  
      icon: Brain, 
      color: 'blue',
      description: 'ML models running'
    },
    { 
      label: 'System Uptime', 
      value: '99.9%',  
      icon: Shield, 
      color: 'emerald',
      description: 'Reliability score'
    },
    { 
      label: 'Active Users', 
      value: '0', 
      icon: Users, 
      color: 'purple',
      description: 'Internal users'
    },
  
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600 text-blue-600',
      green: 'from-green-500 to-green-600 text-green-600',
      emerald: 'from-emerald-500 to-emerald-600 text-emerald-600',
      purple: 'from-purple-500 to-purple-600 text-purple-600',
      orange: 'from-orange-500 to-orange-600 text-orange-600',
      cyan: 'from-cyan-500 to-cyan-600 text-cyan-600'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={metric.label} 
          className="bg-black/10 backdrop-blur-xl border border-cyan-400/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:border-cyan-400/40 hover:bg-black/20 transition-all duration-500 group animate-fade-in hover:scale-105"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${getColorClasses(metric.color).split(' ')[0]} ${getColorClasses(metric.color).split(' ')[1]} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 animate-floating`}>
              <metric.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          
          <div className="space-y-1 sm:space-y-2">
            <div className={`text-2xl sm:text-3xl font-bold ${getColorClasses(metric.color).split(' ')[2]} group-hover:scale-110 transition-transform duration-300`}>
              {metric.value}
            </div>
            <div className="text-base sm:text-lg font-semibold text-cyan-100">
              {metric.label}
            </div>
            <div className="text-xs sm:text-sm text-cyan-300">
              {metric.description}
            </div>
          </div>

          {/* Progress bar for some metrics */}
          {metric.label.includes('Uptime') || metric.label.includes('Accuracy') ? (
            <div className="mt-3 sm:mt-4">
              <div className="h-1.5 sm:h-2 bg-black/30 rounded-full overflow-hidden border border-cyan-400/20">
                <div 
                  className={`h-full bg-gradient-to-r ${getColorClasses(metric.color).split(' ')[0]} ${getColorClasses(metric.color).split(' ')[1]} transition-all duration-1000 shadow-lg`}
                  style={{ width: metric.value }}
                />
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SystemMetrics;