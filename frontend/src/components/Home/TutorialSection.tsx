import TutorialStepCard from "./TutorialStepCard";

const steps = [
  {
    number: 1,
    title: "Choose Destination",
    description: "Select any city or country you want to visit or move to",
  },
  {
    number: 2,
    title: "Get Insights",
    description: "Receive detailed information about costs, climate, and culture",
  },
  {
    number: 3,
    title: "Plan & Go",
    description: "Get personalized itineraries or relocation guides",
  },
];

export default function TutorialSection() {
  return (
    <section className="py-16 px-4 bg-blue-50 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-10">
        How It Works
      </h2>
      <div className="grid sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <TutorialStepCard
            key={idx}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
}
