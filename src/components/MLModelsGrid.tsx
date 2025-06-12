import MLModelCard from "@/components/MLModelCard";

interface MLModel {
  title: string;
  description: string;
  accuracy: number;
  status: "active" | "training" | "idle";
  lastUpdated: string;
  predictions: number;
  route?: string;
}

const MLModelsGrid = () => {
  const models = [
    {
      title: "Complaint Classifier",
      description: "Automatically categorizes customer complaints using advanced NLP",
      accuracy: 94.2,
      status: "active" as const,
      lastUpdated: "2 hours ago",
      predictions: 15420,
      route: "/complaint-classifier"
    },
    {
      title: "Predictive Maintenance",
      description: "Forecasts equipment failures before they occur",
      accuracy: 91.8,
      status: "active" as const,
      lastUpdated: "4 hours ago",
      predictions: 8930,
      route: "/ml-prediction"
    },
    {
      title: "Demand Forecasting",
      description: "Predicts future product demand patterns",
      accuracy: 88.5,
      status: "training" as const,
      lastUpdated: "1 day ago",
      predictions: 12050
    },
    {
      title: "Quality Control",
      description: "Detects defects in manufacturing processes",
      accuracy: 96.1,
      status: "active" as const,
      lastUpdated: "30 minutes ago",
      predictions: 23100
    },
    {
      title: "Fraud Detection",
      description: "Identifies suspicious transactions in real-time",
      accuracy: 89.7,
      status: "active" as const,
      lastUpdated: "1 hour ago",
      predictions: 18750
    },
    {
      title: "Sentiment Analysis",
      description: "Analyzes customer feedback sentiment",
      accuracy: 92.3,
      status: "idle" as const,
      lastUpdated: "3 days ago",
      predictions: 6420
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model, index) => (
        <MLModelCard
          key={index}
          {...model}
        />
      ))}
    </div>
  );
};

export default MLModelsGrid;