import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 p-6 flex items-center justify-center">
      <Card className="bg-white/10 backdrop-blur-lg border-red-500/20 max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-red-400" />
          </div>
          <CardTitle className="text-4xl font-bold text-white mb-2">
            404
          </CardTitle>
          <CardDescription className="text-red-200 text-lg">
            Page Not Found
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <p className="text-red-100">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="bg-white/10 border-red-500/30 text-red-100 hover:bg-red-500/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            
            <Button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;