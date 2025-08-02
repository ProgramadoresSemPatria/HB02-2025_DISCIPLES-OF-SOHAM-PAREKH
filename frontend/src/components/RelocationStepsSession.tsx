import TutorialStepCard from "./Home/TutorialStepCard";


interface Step {
  number: number;
  title: string;
  description: string;
}

interface RelocationStepsSectionProps {
  steps: Step[];
}

const RelocationStepsSection = ({ steps }: RelocationStepsSectionProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-10">
      <h2 className="text-lg font-bold mb-6 text-center">Steps to Relocate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <TutorialStepCard
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
};

export default RelocationStepsSection;
