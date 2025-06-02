
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Play, Settings, TrendingUp } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  status: 'active' | 'training' | 'deployed' | 'pending';
  type: string;
  accuracy?: string;
  lastUpdated: string;
  onClick?: () => void;
}

const ProjectCard = ({ 
  title, 
  description, 
  status, 
  type, 
  accuracy, 
  lastUpdated, 
  onClick 
}: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'training':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'deployed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="glass-card hover:neon-glow transition-all duration-300 group cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg text-white group-hover:text-neon-blue transition-colors">
              {title}
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {type}
            </Badge>
          </div>
          <Badge className={`text-xs ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {accuracy && (
            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-neon-green" />
                <span className="text-xs text-muted-foreground">Accuracy</span>
              </div>
              <div className="text-lg font-semibold text-neon-green">{accuracy}</div>
            </div>
          )}
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Last Updated</span>
            <div className="text-sm text-white">{lastUpdated}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border-neon-blue/30"
            variant="outline"
          >
            <Play className="w-4 h-4 mr-2" />
            Run
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="hover:bg-white/10"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="hover:bg-white/10"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
