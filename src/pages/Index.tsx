
import { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import FuturisticDashboard from '@/components/FuturisticDashboard';
import FuturisticBackground from '@/components/FuturisticBackground';
import DashboardBackground from '@/components/DashboardBackground';
import LoginModal from '@/components/LoginModal';

const IndexContent = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-600 to-white">
        <FuturisticBackground />
        
        {/* Enhanced Landing Page */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center blue-glow animate-floating mx-auto mb-8 cyber-border">
                <div className="text-6xl animate-data-pulse">🧠</div>
              </div>
              <h1 className="text-7xl md:text-9xl font-bold mb-6">
                <span className="text-gradient-blue block animate-neural-pulse">Permobil</span>
                <span className="text-white animate-fade-in">AI Hub</span>
              </h1>
              <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
                Advanced Neural Intelligence Platform for next-generation mobility solutions.
                Authorized access required.
              </p>
            </div>
            
            <div className="futuristic-card p-10 max-w-lg mx-auto bg-white/95 backdrop-blur-lg gpu-processing">
              <h2 className="text-3xl font-bold text-gradient-blue mb-6 animate-data-stream">Secure Access Portal</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Enter the neural interface to access advanced AI workload management.
              </p>
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-8 rounded-xl blue-glow transition-all duration-300 text-lg font-medium animate-neural-pulse hover:scale-105 cyber-border data-flow"
              >
                Initialize Neural Connection
              </button>
            </div>
          </div>
        </div>

        <LoginModal 
          isOpen={showLoginModal}
          onClose={handleCloseModal}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DashboardBackground />
      
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={logout}
        userName={user?.name}
      />
      
      <main className="relative z-10">
        <FuturisticDashboard />
      </main>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <IndexContent />
    </AuthProvider>
  );
};

export default Index;
