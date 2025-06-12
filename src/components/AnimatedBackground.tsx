import { useState, useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create particles on mouse movement
      if (Math.random() < 0.3) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 60,
          maxLife: 60,
          size: Math.random() * 3 + 1,
          color: ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]
        };
        
        setParticles(prev => [...prev.slice(-50), newParticle]);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create burst of particles on click
      for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        const newParticle = {
          id: Date.now() + Math.random() + i,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 80,
          maxLife: 80,
          size: Math.random() * 4 + 2,
          color: ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]
        };
        
        setParticles(prev => [...prev.slice(-100), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Particle animation loop
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98 + 0.1
        })).filter(particle => particle.life > 0)
      );
    };

    const interval = setInterval(animateParticles, 16);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-[1]">
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '2s', animationDuration: '6s' }} />
      <div className="absolute top-1/2 left-3/4 w-56 h-56 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '1s', animationDuration: '5s' }} />

      {/* Floating AI Neural Nodes with Physics */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/80 rounded-full shadow-lg shadow-blue-400/50" 
           style={{
             animation: 'float 6s ease-in-out infinite',
             transform: `translate(${Math.sin(Date.now() * 0.001) * 50}px, ${Math.cos(Date.now() * 0.0008) * 30}px)`
           }} />
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400/80 rounded-full shadow-lg shadow-purple-400/50" 
           style={{
             animation: 'float 8s ease-in-out infinite reverse',
             transform: `translate(${Math.cos(Date.now() * 0.0012) * 40}px, ${Math.sin(Date.now() * 0.001) * 25}px)`
           }} />
      <div className="absolute top-1/2 left-3/4 w-5 h-5 bg-emerald-400/70 rounded-full shadow-lg shadow-emerald-400/50" 
           style={{
             animation: 'float 7s ease-in-out infinite',
             transform: `translate(${Math.sin(Date.now() * 0.0015) * 35}px, ${Math.cos(Date.now() * 0.0011) * 45}px)`
           }} />
      <div className="absolute top-1/6 right-1/3 w-3 h-3 bg-cyan-400/80 rounded-full shadow-lg shadow-cyan-400/50" 
           style={{
             animation: 'float 5s ease-in-out infinite reverse',
             transform: `translate(${Math.cos(Date.now() * 0.0009) * 30}px, ${Math.sin(Date.now() * 0.0013) * 20}px)`
           }} />
      <div className="absolute bottom-1/4 left-1/6 w-4 h-4 bg-pink-400/70 rounded-full shadow-lg shadow-pink-400/50" 
           style={{
             animation: 'float 9s ease-in-out infinite',
             transform: `translate(${Math.sin(Date.now() * 0.0007) * 55}px, ${Math.cos(Date.now() * 0.0014) * 35}px)`
           }} />
      
      {/* Dynamic Neural Connections with Animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <defs>
          <linearGradient id="dynamicGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8">
              <animate attributeName="stop-opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3">
              <animate attributeName="stop-opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          <linearGradient id="dynamicGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.7">
              <animate attributeName="stop-opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4">
              <animate attributeName="stop-opacity" values="0.7;0.4;0.7" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          <linearGradient id="dynamicGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6">
              <animate attributeName="stop-opacity" values="0.4;0.8;0.4" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3">
              <animate attributeName="stop-opacity" values="0.8;0.3;0.8" dur="5s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        
        <line x1="25%" y1="25%" x2="75%" y2="50%" stroke="url(#dynamicGradient1)" strokeWidth="2">
          <animate attributeName="stroke-dasharray" values="0,200;40,160;0,200" dur="4s" repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="1;3;1" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="75%" y1="75%" x2="25%" y2="25%" stroke="url(#dynamicGradient2)" strokeWidth="2">
          <animate attributeName="stroke-dasharray" values="0,200;30,170;0,200" dur="5s" repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="1;2.5;1" dur="5s" repeatCount="indefinite" />
        </line>
        <line x1="17%" y1="75%" x2="67%" y2="17%" stroke="url(#dynamicGradient3)" strokeWidth="2">
          <animate attributeName="stroke-dasharray" values="0,200;50,150;0,200" dur="6s" repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="1;2;1" dur="6s" repeatCount="indefinite" />
        </line>
        
        {/* Additional Dynamic Connections */}
        <circle cx="25%" cy="25%" r="3" fill="#3b82f6" opacity="0.6">
          <animate attributeName="r" values="2;6;2" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="75%" cy="50%" r="3" fill="#8b5cf6" opacity="0.6">
          <animate attributeName="r" values="2;5;2" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="67%" cy="17%" r="3" fill="#10b981" opacity="0.6">
          <animate attributeName="r" values="2;4;2" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="5s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Mouse-Following Interactive Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            boxShadow: `0 0 10px ${particle.color}`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Enhanced Floating Data Particles */}
      <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-blue-300/80 rounded-full shadow-lg shadow-blue-300/50" 
           style={{
             animation: 'bounce 3s infinite, float 4s ease-in-out infinite',
             animationDelay: '0.2s'
           }} />
      <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-purple-300/80 rounded-full shadow-lg shadow-purple-300/50" 
           style={{
             animation: 'bounce 4s infinite, float 5s ease-in-out infinite reverse',
             animationDelay: '1.2s'
           }} />
      <div className="absolute top-1/2 left-2/3 w-2.5 h-2.5 bg-emerald-300/80 rounded-full shadow-lg shadow-emerald-300/50" 
           style={{
             animation: 'bounce 3.5s infinite, float 6s ease-in-out infinite',
             animationDelay: '2.2s'
           }} />
      
      {/* Dynamic Data Stream Lines with Glow */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent opacity-70 shadow-lg shadow-blue-400/20" 
           style={{
             animation: 'pulse 2s infinite',
             filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))'
           }} />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent opacity-60 shadow-lg shadow-purple-400/20" 
           style={{
             animation: 'pulse 3s infinite',
             animationDelay: '1s',
             filter: 'drop-shadow(0 0 5px rgba(139, 92, 246, 0.5))'
           }} />
      <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent opacity-80 shadow-lg shadow-emerald-400/20" 
           style={{
             animation: 'pulse 2.5s infinite',
             animationDelay: '0.5s',
             filter: 'drop-shadow(0 0 5px rgba(16, 185, 129, 0.5))'
           }} />
      
      {/* Enhanced Binary Code Rain with Glow */}
      <div className="absolute inset-0 opacity-15 overflow-hidden">
        <div className="absolute top-0 left-1/6 text-sm text-blue-400 font-mono animate-pulse shadow-lg"
             style={{ 
               animation: 'float 8s ease-in-out infinite, fadeInOut 4s infinite',
               textShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
             }}>
          01101001
        </div>
        <div className="absolute top-1/4 right-1/6 text-sm text-purple-400 font-mono animate-pulse shadow-lg" 
             style={{ 
               animationDelay: '1s',
               animation: 'float 6s ease-in-out infinite reverse, fadeInOut 3s infinite',
               textShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
             }}>
          11001010
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-sm text-emerald-400 font-mono animate-pulse shadow-lg" 
             style={{ 
               animationDelay: '2s',
               animation: 'float 7s ease-in-out infinite, fadeInOut 5s infinite',
               textShadow: '0 0 10px rgba(16, 185, 129, 0.8)'
             }}>
          10110101
        </div>
        <div className="absolute top-1/6 left-1/2 text-sm text-cyan-400 font-mono animate-pulse shadow-lg" 
             style={{ 
               animationDelay: '0.5s',
               animation: 'float 9s ease-in-out infinite reverse, fadeInOut 4.5s infinite',
               textShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
             }}>
          11010110
        </div>
        <div className="absolute bottom-1/4 right-1/3 text-sm text-orange-400 font-mono animate-pulse shadow-lg" 
             style={{ 
               animationDelay: '1.5s',
               animation: 'float 5s ease-in-out infinite, fadeInOut 3.5s infinite',
               textShadow: '0 0 10px rgba(251, 146, 60, 0.8)'
             }}>
          01010111
        </div>
      </div>

      {/* Ripple Effects */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-blue-400/20 rounded-full" 
           style={{
             animation: 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite'
           }} />
      <div className="absolute bottom-1/3 left-1/5 w-24 h-24 border border-purple-400/20 rounded-full" 
           style={{
             animation: 'ping 6s cubic-bezier(0, 0, 0.2, 1) infinite',
             animationDelay: '2s'
           }} />

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;