import SeeFeaturesButton from "../Buttons/SeeFeaturesButton";
import StartPlanButton from "../Buttons/StartPlanButton";

export default function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gradient-to-br from-blue-100 to-yellow-100">
      <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
        Travel smart, <br />
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-400">
          TravelWise
        </span>
      </h1>

      <p className="max-w-lvh text-2xl text-gray-700 mb-6">
        From vacation planning to relocation guidance – get personalized
        recommendations, real-time costs, and local insights for any destination
        worldwide.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <StartPlanButton>Start Planning Now</StartPlanButton>
        <SeeFeaturesButton>See Features</SeeFeaturesButton>

      </div>
    </div>
  );
}
