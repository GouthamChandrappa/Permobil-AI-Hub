
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
  Users,
  TrendingUp,
  Server,
  Layers,
  Rocket,
  Target,
  AlertTriangle
} from 'lucide-react';
import SystemMetrics from './SystemMetrics';
import MLModelsGrid from './MLModelsGrid';

const FuturisticDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const alerts = [
    { type: 'info', message: 'Next - Policy Chatbot'},
    { type: 'warning', message: 'New feature comming soon' },
    { type: 'success', message: 'New feature comming soon'}
  ];

  return (
    <div className="min-h-screen neural-network-bg relative overflow-hidden matrix-rain">
      {/* Main Header */}
      <div className="relative container mx-auto px-8 pt-32 pb-16">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-lg border border-cyan-400/30 rounded-3xl flex items-center justify-center blue-glow animate-floating mx-auto mb-8 cyber-border gpu-processing">
            <Brain className="w-16 h-16 text-cyan-400 animate-data-pulse" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gradient-blue mb-8 text-center animate-data-stream">
            AI Workbench
          </h1>
          <p className="text-2xl text-cyan-100 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Internal Machine Learning Platform for Workflow Automation & Intelligence
          </p>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 px-4 py-2 text-lg backdrop-blur-sm animate-data-pulse cyber-border">
              <Target className="w-5 h-5 mr-2 animate-orbit" />
              1 Active Models
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 px-4 py-2 text-lg backdrop-blur-sm animate-data-pulse cyber-border">
              <Activity className="w-5 h-5 mr-2 animate-neural-pulse" />
              Real-time Processing
            </Badge>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mb-0 mx-auto px-40 py-0 relative z-20">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-black/20 backdrop-blur-xl border border-cyan-400/20 p-2 inline-flex rounded-2xl cyber-border">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'models', label: 'ML Models', icon: Brain },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'infrastructure', label: 'Infrastructure', icon: Server }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setActiveSection(tab.id)}
                className={`px-6 py-3 mx-1 transition-all duration-300 cyber-border animate-fade-in hover:scale-105 ${
                  activeSection === tab.id 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 data-flow animate-neural-pulse' 
                    : 'hover:bg-cyan-400/10 text-cyan-200 hover:text-white gpu-processing'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2 animate-data-pulse" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content based on active section */}
        {activeSection === 'overview' && (
          <div className="space-y-12">
            {/* System Metrics */}
            <div>
              <h2 className="text-3xl font-bold text-gradient-blue mb-8 text-center animate-data-stream">System Overview</h2>
              <SystemMetrics />
            </div>

            {/* Recent Alerts */}
            <div>
              <h2 className="text-3xl font-bold text-gradient-blue mb-8 text-center animate-data-stream">System Alerts</h2>
              <div className="bg-black/10 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 cyber-border gpu-processing">
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-xl backdrop-blur-sm border-l-4 animate-fade-in hover:scale-105 transition-all duration-300 cyber-border ${
                        alert.type === 'info' ? 'bg-blue-500/10 border-blue-400' :
                        alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-400' :
                        'bg-green-500/10 border-green-400'
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <AlertTriangle className={`w-5 h-5 animate-data-pulse ${
                        alert.type === 'info' ? 'text-blue-400' :
                        alert.type === 'warning' ? 'text-yellow-400' :
                        'text-green-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-cyan-100 font-medium">{alert.message}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full animate-pulse bg-current"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'models' && <MLModelsGrid />}

        {activeSection === 'analytics' && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-floating cyber-border gpu-processing">
              <BarChart3 className="w-16 h-16 text-cyan-400 animate-data-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-gradient-blue mb-4 animate-neural-pulse">Analytics Dashboard</h2>
            <p className="text-xl text-cyan-200 mb-8 animate-fade-in">Advanced ML performance metrics and insights coming soon</p>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25 backdrop-blur-sm border border-cyan-400/30 animate-neural-pulse hover:scale-105 transition-all duration-300 cyber-border data-flow">
              <TrendingUp className="w-5 h-5 mr-2 animate-data-pulse" />
              View Analytics
            </Button>
          </div>
        )}

        {activeSection === 'infrastructure' && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-floating cyber-border gpu-processing">
              <Server className="w-16 h-16 text-green-400 animate-data-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-gradient-blue mb-4 animate-neural-pulse">Infrastructure Monitor</h2>
            <p className="text-xl text-cyan-200 mb-8 animate-fade-in">Real-time system health and resource management</p>
            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white shadow-lg shadow-green-500/25 backdrop-blur-sm border border-green-400/30 animate-neural-pulse hover:scale-105 transition-all duration-300 cyber-border data-flow">
              <Shield className="w-5 h-5 mr-2 animate-data-pulse" />
              Monitor System
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuturisticDashboard;
