
import React from 'react';
// import MetricCard from './MetricCard';


interface MetricCardProps {
    number: string;
    label: string;
    description: string;
  }
  
  const MetricCard: React.FC<MetricCardProps> = ({ number, label, description }) => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
        <div className="text-4xl font-bold text-primary mb-2">{number}</div>
        <h3 className="text-xl font-semibold mb-3">{label}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

const ImpactMetricsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-black-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-advizo-lightgray">Real Business Impact</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our consulting services deliver measurable results for our clients across various industries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard 
            number="3X"
            label="Revenue Growth"
            description="Average revenue increase for our clients within 12 months"
          />
          <MetricCard 
            number="10-20%"
            label="Cost Reduction"
            description="Typical reduction in sales and operational costs"
          />
          <MetricCard 
            number="40%"
            label="Efficiency Gain"
            description="Average improvement in operational efficiency"
          />
          <MetricCard 
            number="85%"
            label="Client Satisfaction"
            description="Clients report exceeding their business goals"
          />
        </div>
      </div>
    </section>
  );
};

export default ImpactMetricsSection;
