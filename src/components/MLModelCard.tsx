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
  status, 
  lastUpdated, 
  predictions,
  route 
}: MLModelCardProps) => {
  // const navigate = useNavigate();
  
  const statusColors = {
    active: "bg-green-500/20 text-green-300 border-green-500/30",
    training: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    idle: "bg-gray-500/20 text-gray-300 border-gray-500/30"
  };

  const handleLaunch = () => {
    if (route) {
      // Open the model's route in a new tab
      window.open(route, '_blank');
    } else {
      // Default URL for models without specific routes
      window.open('/ml-prediction', '_blank');
    }
  };

  // Truncate description if it's longer than 80 characters
  const truncatedDescription = description.length > 50 
    ? description.substring(0, 80) + "..."
    : description;

  return (
    <div className="futuristic-card p-8 animate-fade-in backdrop-blur-sm hover:scale-105 transition-all duration-300 group h-full flex flex-col">
      <div className="mb-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-blue-400/30 rounded-xl flex items-center justify-center blue-glow">
              <Brain className="w-6 h-6 text-blue-400 animate-data-pulse" />
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold">{title}</h3>
              <Badge className={`mt-1 ${statusColors[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-blue-200/80 mb-6 leading-relaxed min-h-[1.5rem]">{truncatedDescription}</p>
      </div>
      
      <div className="space-y-6 mt-auto">
        <div className="grid grid-cols-2 gap-6">
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Activity className="w-4 h-4 text-orange-400" />
            <span className="text-sm mt-0 text-blue-200/70">Last Updated</span>
          </div>
          <p className="text-lg text-white font-medium">{lastUpdated}</p>
        </div>
        
        <button
          onClick={handleLaunch}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium blue-glow"
        >
          Initialize Model
        </button>
      </div>
    </div>
  );
};

export default MLModelCard;