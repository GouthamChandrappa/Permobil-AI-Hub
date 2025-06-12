import { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import FuturisticDashboard from '@/components/FuturisticDashboard';
import DashboardBackground from '@/components/DashboardBackground';
import LoginModal from '@/components/LoginModal';
import AnimatedBackground from '@/components/AnimatedBackground';
import LandingPageContent from '@/components/LandingPageContent';

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
      <div className="min-h-screen relative overflow-hidden">
        {/* Dynamic AI Background */}
        <DashboardBackground />
        
        {/* Enhanced Dynamic Elements */}
        <AnimatedBackground />

        {/* Main Content */}
        <LandingPageContent onLogin={handleLogin} />

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