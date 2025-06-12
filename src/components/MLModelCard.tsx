import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Activity, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MLModelCardProps {
  title: string;
  description: string;
  accuracy: number;
  status: "active" | "training" | "idle";
  lastUpdated: string;
  predictions: number;
  route?: string;
}

const MLModelCard = ({ 
  title, 
  description, 
  accuracy, 
  status, 
  lastUpdated, 
  predictions,
  route 
}: MLModelCardProps) => {
  const navigate = useNavigate();
  
  const statusColors = {
    active: "bg-green-500/20 text-green-300 border-green-500/30",
    training: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    idle: "bg-gray-500/20 text-gray-300 border-gray-500/30"
  };

  const handleLaunch = () => {
    if (route) {
      navigate(route);
    } else {
      // Default route for models without specific routes
      navigate('/ml-prediction');
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-lg border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-400" />
            <CardTitle className="text-white text-lg">{title}</CardTitle>
          </div>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <p className="text-blue-200 text-sm">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-xs text-blue-200">Accuracy</span>
            </div>
            <p className="text-lg font-bold text-white">{accuracy}%</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-blue-200">Predictions</span>
            </div>
            <p className="text-lg font-bold text-white">{predictions.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-orange-400" />
            <span className="text-xs text-blue-200">Last Updated</span>
          </div>
          <p className="text-sm text-white">{lastUpdated}</p>
        </div>
        
        <Button 
          onClick={handleLaunch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none"
        >
        Intialize Model
        </Button>
      </CardContent>
    </Card>
  );
};

export default MLModelCard;