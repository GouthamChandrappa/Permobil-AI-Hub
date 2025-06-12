
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';

const ProjectsGrid = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Image Classification Model",
      description: "Deep learning model for classifying medical images with high accuracy",
      status: "deployed" as const,
      type: "Computer Vision",
      accuracy: "94.2%",
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      title: "NLP Sentiment Analysis",
      description: "Real-time sentiment analysis for social media monitoring",
      status: "active" as const,
      type: "Natural Language Processing",
      accuracy: "89.7%",
      lastUpdated: "1 day ago"
    },
    {
      id: 3,
      title: "Fraud Detection System",
      description: "ML model for detecting fraudulent transactions in real-time",
      status: "training" as const,
      type: "Anomaly Detection",
      accuracy: "96.1%",
      lastUpdated: "3 hours ago"
    },
    {
      id: 4,
      title: "Recommendation Engine",
      description: "Collaborative filtering model for product recommendations",
      status: "pending" as const,
      type: "Recommendation System",
      lastUpdated: "5 days ago"
    },
    {
      id: 5,
      title: "Time Series Forecasting",
      description: "LSTM model for predicting stock prices and market trends",
      status: "deployed" as const,
      type: "Time Series",
      accuracy: "87.3%",
      lastUpdated: "6 hours ago"
    },
    {
      id: 6,
      title: "Object Detection API",
      description: "YOLO-based object detection for autonomous vehicles",
      status: "active" as const,
      type: "Computer Vision",
      accuracy: "91.8%",
      lastUpdated: "4 hours ago"
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gradient mb-4">Active Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor, deploy, and manage your machine learning models from a unified dashboard
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex space-x-2">
              {['all', 'active', 'deployed', 'training', 'pending'].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className={filter === status 
                    ? "bg-neon-blue text-white" 
                    : "hover:bg-white/10 text-muted-foreground"
                  }
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <Button className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                status={project.status}
                type={project.type}
                accuracy={project.accuracy}
                lastUpdated={project.lastUpdated}
                onClick={() => console.log(`Clicked project: ${project.title}`)}
              />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">
              No projects found for the selected filter.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;
