import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, LogOut} from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  userName?: string;
}

const Header = ({ isAuthenticated, onLogin, onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-blue-200 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <img 
              src="/favicon.ico" 
              alt="Permobil Logo" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Permobil AI Hub
              </h1>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <p className="text-xs sm:text-sm text-blue-600 font-medium hidden sm:block">Neural Intelligence Center</p>
                <p className="text-xs sm:text-sm text-blue-600 font-medium sm:hidden">Neural AI</p>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="border-blue-300 bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={onLogin}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Access System
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-blue-200 bg-blue-50/50 backdrop-blur-xl rounded-xl p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {/* Mobile Auth */}
              <div className="pt-2 border-t border-blue-200">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Button
                      onClick={onLogout}
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-300 bg-white hover:bg-blue-50 text-blue-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={onLogin}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Access System
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Dynamic border effect */}
      <div className="absolute bottom-0 left-0 w-full h-px">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 animate-pulse" />
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-blue-400 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
      </div>
    </header>
  );
};

export default Header;