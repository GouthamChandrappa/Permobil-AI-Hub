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
      description: "Classifies customer call transcripts into categories.",
      accuracy: 0.95,
      status: "active" as const,
      lastUpdated: "06/11/2025",
      predictions: 15420,
      route: "/complaint-classifier"
    }
    
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model, index) => (
        <div key={index} className="h-full">
          <MLModelCard
            {...model}
          />
        </div>
      ))}
    </div>
  );
};

export default MLModelsGrid;