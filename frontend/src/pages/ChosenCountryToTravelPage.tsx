import { useState } from "react";
import TravelBox from "@/components/Boxes/TravelBox";
import HeaderButtons from "@/components/Header/HeaderButtons";
import BudgetBreakdownBox from "@/components/Boxes/BudgetBreakdownBox";
import ItineraryBox from "@/components/Boxes/IteneraryBox";
import { motion } from "framer-motion";

type ItineraryItem = {
  day: number;
  estimatedCost: number;
  activities: string[];
  dining: string[];
  highlights: string[];
};

const ChosenCountryToTravelPage = () => {

  const [showResults, setShowResults] = useState(false);

  const [budgetData, setBudgetData] = useState({
    accommodation: 0,
    activities: 0,
    meals: 0,
    transport: 0,
  });

  const [itineraryData, setItineraryData] = useState<ItineraryItem[]>([]);

  function handleGenerate() {
    // Simulação de resposta da IA/API
    setBudgetData({
      accommodation: 320,
      activities: 192,
      meals: 192,
      transport: 96,
    });

    setItineraryData([
      {
        day: 1,
        estimatedCost: 130,
        activities: [
          "Explore Gothic Quarter",
          "Visit Sagrada Família",
          "Walk down Las Ramblas",
        ],
        dining: ["Churros for breakfast", "Tapas lunch", "Paella dinner"],
        highlights: ["Photo at Park Güell", "Flamenco show", "Sunset at beach"],
      },
      {
        day: 2,
        estimatedCost: 120,
        activities: ["Day trip to Montserrat", "Museum visit", "Evening walk"],
        dining: ["Hotel breakfast", "Picnic lunch", "Seafood dinner"],
        highlights: [
          "Cable car ride",
          "Viewpoint sunset",
          "Local crafts market",
        ],
      },
    ]);

    setShowResults(true);
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
      <HeaderButtons country="Spain" city="Barcelona" />

      <div className="px-4 py-8 max-w-5xl w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold mt-6 bg-gradient-to-r from-pink-500 via-orange-300 to-green-900 bg-clip-text text-transparent text-center">
          Plan Your Perfect Vacation
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto text-center">
          Create your personalized itinerary with AI-powered recommendations
        </p>

        <TravelBox onGenerate={handleGenerate} />

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-10 space-y-10"
          >
            <BudgetBreakdownBox {...budgetData} />
            <ItineraryBox itinerary={itineraryData} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChosenCountryToTravelPage;
