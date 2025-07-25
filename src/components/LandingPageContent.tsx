interface LandingPageContentProps {
  onLogin: () => void;
}

const LandingPageContent = ({ onLogin }: LandingPageContentProps) => {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 bg-white dark:bg-slate-900">
      <div className="text-center max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 animate-fade-in">
            <span className="text-blue-600 dark:text-blue-400 drop-shadow-lg">
              Permobil AI Hub
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 sm:mb-12 animate-fade-in drop-shadow-sm px-4" style={{ animationDelay: '0s' }}>
            Harnessing Intelligence, Built by us, For us.
          </p>
        </div>
         
         {/* Login Card */}
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-6 sm:p-8 animate-fade-in" style={{ animationDelay: '0s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-3">Access Portal</h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">
              Sign in to access the AI Hub dashboard and tools.
            </p>
            <button
              onClick={onLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg font-medium border border-blue-600 hover:border-blue-700">
              Sign In
            </button>
          </div>
          {/* Instructions*/}
        <div className="grid grid-cols-1 w-full max-w-7xl mx-auto gap-4 sm:gap-6 mb-2 mt-4 sm:mt-6 px-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-md p-6 sm:p-8 md:p-10 animate-fade-in" style={{ animationDelay: '0s' }}>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-2">What you can do?</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4"> 
              Leverage state of the art AI tools and models to enhance your workflow and productivity.
            </p>
        </div>
        <div className="grid grid-cols-1 w-full max-w-7xl mx-auto gap-4 sm:gap-6 mb-2 mt-1 px-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-md p-6 sm:p-8 md:p-10 animate-fade-in" style={{ animationDelay: '0s' }}>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-2">How you do it!</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Remember to close the browser tab of the model card you use after you are done using it.        
            </p>
          </div>
        </div>
        </div>
        {/* Warning Message */}
        <div className="fixed bottom-0 left-0 w-full bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-sans py-2 px-2 sm:px-4 text-center animate-fade-in z-50" style={{ animationDelay: '0s' }}>
          <span className="font-medium text-amber-600 dark:text-amber-400">Warning:</span> AI models are not always accurate, please make sure to verify the results.
        </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageContent;