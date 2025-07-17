interface LandingPageContentProps {
  onLogin: () => void;
}

const LandingPageContent = ({ onLogin }: LandingPageContentProps) => {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 animate-fade-in">
            <span className="text-gradient-blue drop-shadow-2xl">
              Permobil AI Hub
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-200/80 mb-8 sm:mb-12 animate-fade-in drop-shadow-lg px-4" style={{ animationDelay: '0s' }}>
            Harnessing Intelligence, Built by us, For us.
          </p>
        </div>
         
         {/* Login Card */}
        <div className="max-w-md mx-auto px-4">
          <div className="futuristic-card p-6 sm:p-8 animate-fade-in backdrop-blur-sm" style={{ animationDelay: '0s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">Access Portal</h2>
            <p className="text-sm sm:text-base text-blue-200/70 mb-3">
              Sign in to access the AI Hub dashboard and tools.
            </p>
            <button
              onClick={onLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium blue-glow" >
              Sign In
            </button>
          </div>
          {/* Instructions*/}
        <div className="grid grid-cols-1 w-full max-w-7xl mx-auto gap-4 sm:gap-6 mb-2 mt-4 sm:mt-6 px-4">
          <div className="futuristic-card p-6 sm:p-8 md:p-10 animate-fade-in backdrop-blur-sm" style={{ animationDelay: '0s' }}>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">What you can do?</h3>
            <p className="text-sm sm:text-base text-blue-100/70 mb-4"> 
              Leverage state of the art AI tools and models to enhance your workflow and productivity.
            </p>
        </div>
        <div className="grid grid-cols-1 w-full max-w-7xl mx-auto gap-4 sm:gap-6 mb-2 mt-1 px-4">
          <div className="futuristic-card p-6 sm:p-8 md:p-10 animate-fade-in backdrop-blur-sm" style={{ animationDelay: '0s' }}>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">How you do it!</h3>
            <p className="text-sm sm:text-base text-blue-200/70">
              Remember to close the browser tab of the model card you use after you are done using it.        
            </p>
          </div>
        </div>
        </div>
        {/* Warning Message */}
        <div className="fixed bottom-0 left-0 w-full text-white text-xs sm:text-sm font-sans py-2 px-2 sm:px-4 text-center animate-fade-in z-50" style={{ animationDelay: '0s' }}>
          <span className="text-white">Warning:</span> AI models are not always accurate, please make sure to verify the results.
        </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageContent;