import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import HeaderButtons from "@/components/Header/HeaderButtons";
import BudgetBreakdownBox from "@/components/Boxes/BudgetBreakdownBox";
import ItineraryBox from "@/components/Boxes/IteneraryBox";
import AttractionsBox from "@/components/Boxes/AttractionsBox";
import TipsBox from "@/components/Boxes/TipsBox";
import OverviewBox from "@/components/Boxes/OverviewBox";
import { motion } from "framer-motion";
import { useTravelPlanById } from "@/hooks/useTravelPlan";

// Tipos baseados na estrutura do backend
interface Overview {
  climate: string;
  bestTime: string;
  characteristics: string;
}

interface ItineraryItem {
  day: number;
  morning: {
    name: string;
    location: string;
    cost: number;
    duration: string;
    description: string;
  };
  afternoon: {
    name: string;
    location: string;
    cost: number;
    duration: string;
    description: string;
  };
  evening: {
    name: string;
    location: string;
    cost: number;
    duration: string;
    description: string;
  };
  dailyCost: number;
  notes: string[];
}

interface CostBreakdown {
  accommodation: {
    min: number;
    max: number;
    notes: string;
  };
  food: {
    min: number;
    max: number;
    notes: string;
  };
  transportation: {
    min: number;
    max: number;
    notes: string;
  };
  attractions: {
    min: number;
    max: number;
    notes: string;
  };
  miscellaneous: {
    min: number;
    max: number;
    notes: string;
  };
  totalDaily: {
    min: number;
    max: number;
  };
}

interface Attraction {
  name: string;
  cost: number;
  category: 'free' | 'paid' | 'optional';
  description: string;
  tips: string[];
}

interface Tip {
  category: string;
  title: string;
  content: string;
}

const VacationResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isSignedIn, isLoaded } = useAuth();
  const [showResults, setShowResults] = useState(false);
  const [travelData, setTravelData] = useState<{
    destination?: string;
    overview?: Overview;
    itinerary?: ItineraryItem[];
    costs?: CostBreakdown;
    attractions?: Attraction[];
    tips?: Tip[];
  }>({});

  const { data: existingPlan, isLoading, error } = useTravelPlanById(id || "");

  // Função para extrair city e country do destination
  const extractLocationFromDestination = (destination: string) => {
    const parts = destination.split(', ');
    return {
      city: parts[0] || '',
      country: parts[1] || ''
    };
  };

  // Carregar dados existentes se um ID foi fornecido
  useEffect(() => {
    if (existingPlan && id) {
      // Converter os dados da API para o formato esperado pelos componentes
      const apiData = existingPlan;
      
      setTravelData({
        destination: apiData.destination,
        overview: apiData.overview as Overview,
        itinerary: apiData.itinerary as ItineraryItem[],
        costs: apiData.costs as CostBreakdown,
        attractions: apiData.attractions as Attraction[],
        tips: apiData.tips as Tip[],
      });
      setShowResults(true);
    }
  }, [existingPlan, id, isLoaded, isSignedIn]);

  // Verificar se o usuário está autenticado
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Acesso Negado</h2>
          <p className="text-gray-600 mb-4">Você precisa estar logado para acessar esta página.</p>
          <button
            onClick={() => window.location.href = '/authenticate'}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  // Tratamento de erro de autenticação
  if (error && (error as any)?.response?.status === 401) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Erro de Autenticação</h2>
          <p className="text-gray-600 mb-4">Sua sessão expirou ou você não tem permissão para acessar este plano.</p>
          <button
            onClick={() => window.location.href = '/authenticate'}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Fazer Login Novamente
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    const location = travelData.destination ? extractLocationFromDestination(travelData.destination) : { city: 'Spain', country: 'Alicante' };
    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
        <HeaderButtons country={location.country} city={location.city} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your travel plan...</p>
          </div>
        </div>
      </div>
    );
  }

  const location = travelData.destination ? extractLocationFromDestination(travelData.destination) : { city: 'Spain', country: 'Alicante' };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
      <HeaderButtons country={location.country} city={location.city} />

      <div className="px-4 py-8 max-w-5xl w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold mt-6 bg-gradient-to-r from-pink-500 via-orange-300 to-green-900 bg-clip-text text-transparent text-center">
          {id ? "Your Travel Plan" : "Plan Your Perfect Vacation"}
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto text-center">
          {id ? "Your personalized itinerary with AI-powered recommendations" : "Create your personalized itinerary with AI-powered recommendations"}
        </p>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-10 space-y-10"
          >
            {travelData.overview && <OverviewBox overview={travelData.overview} />}
            {travelData.costs && <BudgetBreakdownBox costs={travelData.costs} />}
            {travelData.itinerary && <ItineraryBox itinerary={travelData.itinerary} />}
            {travelData.attractions && <AttractionsBox attractions={travelData.attractions} />}
            {travelData.tips && <TipsBox tips={travelData.tips} />}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VacationResultPage;
