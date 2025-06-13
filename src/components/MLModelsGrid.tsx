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
      description: "Automatically categorizes customer complaints using advanced NLP basicallly its trained  on  large datasets to identify underlying patters within the historical datasets, so this enables the model to predict accurately if its trained on a highly quality labeled customer call logs.",
      accuracy: 94.2,
      status: "active" as const,
      lastUpdated: "2 hours ago",
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