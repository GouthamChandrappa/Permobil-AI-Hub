
interface LandingPageContentProps {
  onLogin: () => void;
}

const LandingPageContent = ({ onLogin }: LandingPageContentProps) => {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient-blue drop-shadow-2xl">
              Permobil AI Hub
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200/80 mb-12 animate-fade-in drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
            Harnessing intelligence, built by us, for us
          </p>
        </div>
        
        {/* Login Card */}
        <div className="max-w-md mx-auto">
          <div className="futuristic-card p-8 animate-fade-in backdrop-blur-sm" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold text-white mb-6">Access Portal</h2>
            <p className="text-blue-200/70 mb-8">
              Sign in to access the AI Hub dashboard and tools.
            </p>
            <button
              onClick={onLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium blue-glow"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageContent;