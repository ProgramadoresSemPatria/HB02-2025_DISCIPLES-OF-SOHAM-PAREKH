import { FaGlobe, FaMapMarkerAlt, FaClock, FaShieldAlt } from "react-icons/fa";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <FaGlobe size={28} className="text-blue-500" />,
    title: "200+ Destinations",
    description: "Comprehensive guides for cities and countries worldwide",
  },
  {
    icon: <FaMapMarkerAlt size={28} className="text-purple-500" />,
    title: "Personalized Itineraries",
    description: "Custom travel plans based on your budget and preferences",
  },
  {
    icon: <FaClock size={28} className="text-orange-400" />,
    title: "Real-time Information",
    description: "Up-to-date costs, weather, and local insights",
  },
  {
    icon: <FaShieldAlt size={28} className="text-green-500" />,
    title: "Trusted Recommendations",
    description: "Verified data from reliable sources and local experts",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 px-4 bg-blue-50 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        Everything you need for your <br/>
        <span className="bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent">
          Travel or Relocation
        </span>
      </h2>

      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Our AI-powered platform provides comprehensive travel planning tools for
        both vacation and relocation needs.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <FeatureCard
            key={idx}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
