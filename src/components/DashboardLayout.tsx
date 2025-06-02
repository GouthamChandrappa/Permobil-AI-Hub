import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Activity, 
  Zap, 
  Database, 
  Globe, 
  Shield,
  ChevronRight,
  Play,
  Pause,
  Settings,
  BarChart3,
  Network,
  Cpu,
  Users
} from 'lucide-react';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const quickStats = [
    { label: 'Active Models', value: '42', change: '+12%', icon: Brain, color: 'emerald' },
    { label: 'Processing Rate', value: '2.4M/hr', change: '+8%', icon: Activity, color: 'blue' },
    { label: 'Success Rate', value: '99.3%', change: '+0.2%', icon: Shield, color: 'green' },
    { label: 'Users Online', value: '156', change: '+24%', icon: Users, color: 'purple' }
  ];

  const recentModels = [
    { 
      name: 'Mobility Pattern Recognition V3.2', 
      status: 'training', 
      progress: 87, 
      eta: '2h 15m',
      priority: 'high',
      dataset: 'Wheelchair Movement Data 2024'
    },
    { 
      name: 'Predictive Maintenance Neural Net', 
      status: 'deployed', 
      progress: 100, 
      eta: 'Complete',
      priority: 'critical',
      dataset: 'Component Failure Patterns'
    },
    { 
      name: 'User Behavior Analytics Engine', 
      status: 'optimizing', 
      progress: 64, 
      eta: '4h 32m',
      priority: 'medium',
      dataset: 'User Interaction Logs'
    },
    { 
      name: 'Speech Recognition Enhancement', 
      status: 'queued', 
      progress: 0, 
      eta: 'Pending',
      priority: 'low',
      dataset: 'Voice Command Dataset V2'
    }
  ];

  const systemAlerts = [
    { type: 'success', message: 'Model deployment completed successfully', time: '2 min ago' },
    { type: 'warning', message: 'High memory usage detected on GPU cluster 3', time: '15 min ago' },
    { type: 'info', message: 'Scheduled maintenance window in 6 hours', time: '1 hour ago' }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-ai-gradient mb-2">AI Command Center</h1>
          <p className="text-emerald-400/70">Real-time orchestration and monitoring</p>
        </div>
        <div className="flex space-x-4">
          <Button className="bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-emerald-400/80 hover:to-blue-500/80">
            <Play className="w-4 h-4 mr-2" />
            Deploy Model
          </Button>
          <Button variant="outline" className="border-emerald-400/30">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={stat.label} className="neural-card p-6 hover:ai-glow transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-400/20 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <Badge className={`bg-${stat.color}-400/20 text-${stat.color}-400 border-0`}>
                {stat.change}
              </Badge>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Models Panel */}
        <div className="lg:col-span-2 neural-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-ai-gradient">Active AI Workloads</h2>
            <Button variant="ghost" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentModels.map((model, index) => (
              <div key={index} className="neural-card p-4 hover:bg-white/5 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      model.status === 'deployed' ? 'bg-green-400' :
                      model.status === 'training' ? 'bg-blue-400' :
                      model.status === 'optimizing' ? 'bg-yellow-400' : 'bg-gray-400'
                    } animate-pulse`} />
                    <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {model.name}
                    </h3>
                  </div>
                  <Badge className={`${
                    model.priority === 'critical' ? 'bg-red-400/20 text-red-400' :
                    model.priority === 'high' ? 'bg-orange-400/20 text-orange-400' :
                    model.priority === 'medium' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-green-400/20 text-green-400'
                  } border-0`}>
                    {model.priority}
                  </Badge>
                </div>
                
                <div className="text-sm text-muted-foreground mb-2">{model.dataset}</div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{model.progress}%</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          model.status === 'deployed' ? 'bg-green-400' :
                          model.status === 'training' ? 'bg-blue-400' :
                          model.status === 'optimizing' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}
                        style={{ width: `${model.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">ETA: {model.eta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* System Health */}
          <div className="neural-card p-6">
            <h3 className="text-xl font-bold text-ai-gradient mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Neural Network</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-green-400">Optimal</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Pipeline</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-sm text-blue-400">Processing</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Model Registry</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-green-400">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="neural-card p-6">
            <h3 className="text-xl font-bold text-ai-gradient mb-4">System Alerts</h3>
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 neural-card">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'success' ? 'bg-green-400' :
                    alert.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-white">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="neural-card p-6">
            <h3 className="text-xl font-bold text-ai-gradient mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-400/10">
                <Network className="w-4 h-4 mr-3" />
                Neural Network Designer
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-400/10">
                <Database className="w-4 h-4 mr-3" />
                Dataset Manager
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-400/10">
                <Cpu className="w-4 h-4 mr-3" />
                Resource Monitor
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
