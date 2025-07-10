
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "🎉 Welcome Back!",
        description: "Successfully connected to Permobil AI Hub",
        className: "futuristic-card border-green-400/30 bg-gradient-to-br from-blue-900/95 to-blue-800/95 backdrop-blur-xl text-white",
      });
      onClose();
      setEmail('');
      setPassword('');
    } catch (error) {
      toast({
        title: "🚫 Access Denied",
        description: "Authentication failed. Please verify your credentials.",
        variant: "destructive",
        className: "futuristic-card border-red-400/30 bg-gradient-to-br from-red-900/95 to-red-800/95 backdrop-blur-xl text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-blue-900/95 to-blue-800/95 backdrop-blur-xl border-blue-400/30 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white text-center">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-center text-blue-100">
            Please sign in to continue using the Permobil AI Hub.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-200" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-blue-800/50 border-blue-400/30 focus:border-blue-300 text-white placeholder:text-blue-200"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-white">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-200" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-blue-800/50 border-blue-400/30 focus:border-blue-300 text-white placeholder:text-blue-200"
                required
              />
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        
        <div className="text-center text-sm text-blue-200 mt-4">
          Forgot password?{' '+'Contact administrator! '}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
