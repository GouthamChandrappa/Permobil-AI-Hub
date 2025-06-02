
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Zap, Cpu, Activity } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6 relative">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 neural-grid opacity-30" />
      
      {/* Floating Neural Network Visualization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-1/4 left-1/4 w-64 h-64 opacity-20 animate-hologram">
          <defs>
            <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFCC" />
              <stop offset="100%" stopColor="#8A2BE2" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="4" fill="url(#neuralGrad)" />
          <circle cx="150" cy="80" r="4" fill="url(#neuralGrad)" />
          <circle cx="100" cy="150" r="4" fill="url(#neuralGrad)" />
          <circle cx="200" cy="120" r="4" fill="url(#neuralGrad)" />
          <path d="M 50 50 L 150 80 L 100 150 L 200 120" 
                stroke="url(#neuralGrad)" 
                strokeWidth="1" 
                fill="none" 
                strokeDasharray="5,5"
                className="animate-circuit-flow" />
        </svg>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Floating AI Icons */}
          <div className="relative mb-12">
            <div className="absolute -top-10 left-1/4 animate-float">
              <div className="w-12 h-12 neural-card flex items-center justify-center">
                <Brain className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="absolute -top-6 right-1/3 animate-float" style={{ animationDelay: '2s' }}>
              <div className="w-16 h-16 neural-card flex items-center justify-center ai-glow">
                <Cpu className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <div className="absolute top-4 left-2/3 animate-float" style={{ animationDelay: '4s' }}>
              <div className="w-10 h-10 neural-card flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in">
            <span className="text-ai-gradient block mb-4">Neural Intelligence</span>
            <span className="text-white/90">Command Center</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-emerald-400/80 mb-12 max-w-4xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Advanced AI workload orchestration for Permobil's next-generation machine learning infrastructure. 
            Deploy, monitor, and scale intelligent systems with unprecedented efficiency.
          </p>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="neural-card p-8 hover:ai-glow transition-all duration-500 group">
              <div className="flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-ai-gradient mb-2">127</div>
              <div className="text-sm text-emerald-400/70">Active Models</div>
              <div className="data-flow h-1 w-full mt-3 rounded" />
            </div>
            <div className="neural-card p-8 hover:ai-glow transition-all duration-500 group">
              <div className="flex items-center justify-center mb-4">
                <Cpu className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-ai-gradient mb-2">99.97%</div>
              <div className="text-sm text-emerald-400/70">System Uptime</div>
              <div className="data-flow h-1 w-full mt-3 rounded" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="neural-card p-8 hover:ai-glow transition-all duration-500 group">
              <div className="flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-ai-gradient mb-2">2.4TB</div>
              <div className="text-sm text-emerald-400/70">Data Processed</div>
              <div className="data-flow h-1 w-full mt-3 rounded" style={{ animationDelay: '1s' }} />
            </div>
            <div className="neural-card p-8 hover:ai-glow transition-all duration-500 group">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-ai-gradient mb-2">15ms</div>
              <div className="text-sm text-emerald-400/70">Avg Response</div>
              <div className="data-flow h-1 w-full mt-3 rounded" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-400 to-purple-600 hover:from-emerald-400/80 hover:to-purple-600/80 text-white px-10 py-4 text-lg ai-glow transition-all duration-300 hover:scale-105"
            >
              Initialize AI Systems
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-emerald-400/30 hover:bg-emerald-400/10 hover:border-emerald-400/50 px-10 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              Neural Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
