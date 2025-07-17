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
      <div className="relative container mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 md:pb-16">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-lg border border-cyan-400/30 rounded-2xl sm:rounded-3xl flex items-center justify-center blue-glow animate-floating mx-auto mb-6 sm:mb-8 cyber-border gpu-processing">
            <Brain className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-cyan-400 animate-data-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gradient-blue mb-6 sm:mb-8 text-center animate-data-stream">
            AI Workbench
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-cyan-100 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in px-4">
            Internal Machine Learning Platform for Workflow Automation & Intelligence
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 px-3 sm:px-4 py-2 text-sm sm:text-base md:text-lg backdrop-blur-sm animate-data-pulse cyber-border">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-orbit" />
              1 Active Models
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 px-3 sm:px-4 py-2 text-sm sm:text-base md:text-lg backdrop-blur-sm animate-data-pulse cyber-border">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-neural-pulse" />
              Real-time Processing
            </Badge>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mb-0 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-40 py-0 relative z-20">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-black/20 backdrop-blur-xl border border-cyan-400/20 p-1 sm:p-2 inline-flex rounded-xl sm:rounded-2xl cyber-border overflow-x-auto max-w-full">
            <div className="flex space-x-1 min-w-max">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3, shortLabel: 'Overview' },
                { id: 'models', label: 'ML Models', icon: Brain, shortLabel: 'Models' },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp, shortLabel: 'Analytics' },
                { id: 'infrastructure', label: 'Infrastructure', icon: Server, shortLabel: 'Infra' }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveSection(tab.id)}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300 cyber-border animate-fade-in hover:scale-105 text-xs sm:text-sm md:text-base whitespace-nowrap ${
                    activeSection === tab.id 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 data-flow animate-neural-pulse' 
                      : 'hover:bg-cyan-400/10 text-cyan-200 hover:text-white gpu-processing'
                  }`}
                >
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 animate-data-pulse" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Content based on active section */}
        {activeSection === 'overview' && (
          <div className="space-y-12">
            {/* System Metrics */}
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-blue mb-6 sm:mb-8 text-center animate-data-stream">System Overview</h2>
              <SystemMetrics />
            </div>

            {/* Recent Alerts */}
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-blue mb-6 sm:mb-8 text-center animate-data-stream">System Alerts</h2>
              <div className="bg-black/10 backdrop-blur-xl border border-cyan-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 cyber-border gpu-processing">
                <div className="space-y-3 sm:space-y-4">
                  {alerts.map((alert, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm border-l-4 animate-fade-in hover:scale-105 transition-all duration-300 cyber-border ${
                        alert.type === 'info' ? 'bg-blue-500/10 border-blue-400' :
                        alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-400' :
                        'bg-green-500/10 border-green-400'
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 animate-data-pulse ${
                        alert.type === 'info' ? 'text-blue-400' :
                        alert.type === 'warning' ? 'text-yellow-400' :
                        'text-green-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-cyan-100 font-medium text-sm sm:text-base">{alert.message}</p>
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
          <div className="text-center py-12 sm:py-16 md:py-20 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-floating cyber-border gpu-processing">
              <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-cyan-400 animate-data-pulse" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-blue mb-3 sm:mb-4 animate-neural-pulse">Analytics Dashboard</h2>
            <p className="text-base sm:text-lg md:text-xl text-cyan-200 mb-6 sm:mb-8 animate-fade-in max-w-2xl mx-auto">Advanced ML performance metrics and insights coming soon</p>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25 backdrop-blur-sm border border-cyan-400/30 animate-neural-pulse hover:scale-105 transition-all duration-300 cyber-border data-flow px-4 sm:px-6 py-2 sm:py-3">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-data-pulse" />
              View Analytics
            </Button>
          </div>
        )}

        {activeSection === 'infrastructure' && (
          <div className="text-center py-12 sm:py-16 md:py-20 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-400/20 to-blue-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-floating cyber-border gpu-processing">
              <Server className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-green-400 animate-data-pulse" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-blue mb-3 sm:mb-4 animate-neural-pulse">Infrastructure Monitor</h2>
            <p className="text-base sm:text-lg md:text-xl text-cyan-200 mb-6 sm:mb-8 animate-fade-in max-w-2xl mx-auto">Real-time system health and resource management</p>
            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white shadow-lg shadow-green-500/25 backdrop-blur-sm border border-green-400/30 animate-neural-pulse hover:scale-105 transition-all duration-300 cyber-border data-flow px-4 sm:px-6 py-2 sm:py-3">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-data-pulse" />
              Monitor System
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuturisticDashboard;