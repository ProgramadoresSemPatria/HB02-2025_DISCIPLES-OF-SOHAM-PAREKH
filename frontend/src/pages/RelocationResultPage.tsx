import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import HeaderButtons from "@/components/Header/HeaderButtons";
import ClimateLifestyle from "@/components/Boxes/ClimateLifestyle";
import CostBreakdown from "@/components/Boxes/CostBreakdown";
import InfoCard from "@/components/Boxes/InfoCard";
import JobMarket from "@/components/Boxes/JobMarket";
import QualityOfLife from "@/components/Boxes/QualityOfLife";
import TaxInfo from "@/components/Boxes/TaxInfo";
import VisaResidency from "@/components/Boxes/VisaResidency";

import { useCreateTravelPlan, useTravelPlanById } from "@/hooks/useTravelPlan";
import { useAuth } from "@clerk/clerk-react";

// Tipos baseados na estrutura do backend para relocation
interface RelocationOverview {
  population: string;
  language: string;
  currency: string;
  timeZone: string;
  generalInfo: string;
}

interface RelocationCostOfLiving {
  housing: {
    min: number;
    max: number;
    notes: string;
  };
  utilities: {
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
  healthcare: {
    min: number;
    max: number;
    notes: string;
  };
  entertainment: {
    min: number;
    max: number;
    notes: string;
  };
  totalMonthly: {
    min: number;
    max: number;
  };
}

interface RelocationVisaRequirements {
  touristVisa: {
    required: boolean;
    duration: string;
    process: string;
  };
  workVisa: {
    types: string[];
    requirements: string[];
    processingTime: string;
  };
  residency: {
    requirements: string[];
    processingTime: string;
    cost: number;
  };
  citizenship: {
    available: boolean;
    requirements: string[];
    timeRequired: string;
  };
}

interface RelocationTaxation {
  incomeTax: {
    rate: string;
    brackets: Array<{
      min: number;
      max: number | null;
      rate: number;
    }>;
  };
  propertyTax: {
    rate: string;
    notes: string;
  };
  vatSalesTax: {
    rate: number;
    notes: string;
  };
  socialSecurity: {
    employeeRate: number;
    employerRate: number;
    notes: string;
  };
}

interface RelocationClimate {
  averageTemperature: {
    summer: {
      min: number;
      max: number;
    };
    winter: {
      min: number;
      max: number;
    };
  };
  sunnyDaysPerYear: number;
  rainyDaysPerYear: number;
  humidity: string;
  bestMonths: string[];
}

interface RelocationJobMarket {
  unemploymentRate: number;
  averageSalary: {
    min: number;
    max: number;
    currency: string;
  };
  inDemandSkills: string[];
  majorIndustries: string[];
  workCulture: {
    workingHours: string;
    vacationDays: number;
    workLifeBalance: string;
  };
}

interface RelocationLifestyle {
  safetyIndex: number;
  healthcareQuality: string;
  educationSystem: {
    quality: string;
    publicSchools: boolean;
    internationalSchools: boolean;
  };
  transportation: {
    publicTransport: string;
    carOwnership: string;
    walkability: string;
  };
  culture: {
    socialLife: string;
    expatCommunity: string;
    languageBarrier: string;
  };
}

interface RelocationBanking {
  requirements: string[];
  majorBanks: string[];
  services: string[];
  tips: string[];
}

const RelocationResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isSignedIn, isLoaded } = useAuth();
  const [data, setData] = useState<{
    destination?: string;
    overview?: RelocationOverview;
    costOfLiving?: RelocationCostOfLiving;
    visaRequirements?: RelocationVisaRequirements;
    taxation?: RelocationTaxation;
    climate?: RelocationClimate;
    jobMarket?: RelocationJobMarket;
    lifestyle?: RelocationLifestyle;
    banking?: RelocationBanking;
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  const createTravelPlan = useCreateTravelPlan();
  const { data: existingPlan, isLoading: isLoadingExisting, error } = useTravelPlanById(id || "");

  // Função para extrair city e country do destination
  const extractLocationFromDestination = (destination: string) => {
    const parts = destination.split(', ');
    return {
      city: parts[0] || '',
      country: parts[1] || ''
    };
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        
        // Aguardar o Clerk estar inicializado
        if (!isLoaded || !isSignedIn) {
          return;
        }
        
        // Se temos um ID, carregar plano existente
        if (id && existingPlan) {
          setData({
            destination: existingPlan.destination,
            overview: existingPlan.overview as RelocationOverview,
            costOfLiving: (existingPlan as any).costOfLiving || existingPlan.costs as RelocationCostOfLiving,
            visaRequirements: existingPlan.visaRequirements as RelocationVisaRequirements,
            taxation: existingPlan.taxation as RelocationTaxation,
            climate: existingPlan.climate as RelocationClimate,
            jobMarket: existingPlan.jobMarket as RelocationJobMarket,
            lifestyle: existingPlan.lifestyle as RelocationLifestyle,
            banking: existingPlan.banking as RelocationBanking,
          });
        } else if (!id) {
          // Se não temos ID, criar novo plano
          const result = await createTravelPlan.mutateAsync({
            destination: "Alicante, Spain",
            type: "RELOCATION",
            budgetLevel: "HIGH",
          });

          // Usar os dados reais da API
          if (result) {
            setData({
              destination: result.destination,
              overview: result.overview as RelocationOverview,
              costOfLiving: (result as any).costOfLiving || result.costs as RelocationCostOfLiving,
              visaRequirements: result.visaRequirements as RelocationVisaRequirements,
              taxation: result.taxation as RelocationTaxation,
              climate: result.climate as RelocationClimate,
              jobMarket: result.jobMarket as RelocationJobMarket,
              lifestyle: result.lifestyle as RelocationLifestyle,
              banking: result.banking as RelocationBanking,
            });
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados de relocation:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id, existingPlan, isLoaded, isSignedIn]);

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

  if (isLoadingExisting) {
    const location = data.destination ? extractLocationFromDestination(data.destination) : { city: 'Spain', country: 'Alicante' };
    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
        <HeaderButtons country={location.country} city={location.city} />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading relocation plan...</p>
          </div>
        </div>
      </div>
    );
  }

  // Se há erro ao carregar plano existente
  if (error && id) {
    const location = data.destination ? extractLocationFromDestination(data.destination) : { city: 'Spain', country: 'Alicante' };
    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
        <HeaderButtons country={location.country} city={location.city} />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erro ao carregar plano de relocação</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    const location = data.destination ? extractLocationFromDestination(data.destination) : { city: 'Spain', country: 'Alicante' };
    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
        <HeaderButtons country={location.country} city={location.city} />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Gerando seu plano de relocação...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data.overview) {
    const location = data.destination ? extractLocationFromDestination(data.destination) : { city: 'Spain', country: 'Alicante' };
    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
        <HeaderButtons country={location.country} city={location.city} />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erro ao carregar dados</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const location = data.destination ? extractLocationFromDestination(data.destination) : { city: 'Spain', country: 'Alicante' };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
      <HeaderButtons country={location.country} city={location.city} />

      <h1 className="text-3xl bg-gradient-to-r from-blue-600 to-purple-800 bg-clip-text text-transparent font-bold">
        Living in {location.city}, {location.country}
      </h1>
     
      <p className="text-center text-gray-600 mt-4 text-lg">
        Complete guide for relocating to your new home
      </p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 py-10 w-full max-w-6xl"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <InfoCard label="Population" value={data.overview?.population || "N/A"} />
          <InfoCard label="Language" value={data.overview?.language || "N/A"} />
          <InfoCard label="Currency" value={data.overview?.currency || "N/A"} />
          <InfoCard label="Monthly Cost" value={data.costOfLiving?.totalMonthly ? `€${data.costOfLiving.totalMonthly.min.toLocaleString()} - €${data.costOfLiving.totalMonthly.max.toLocaleString()}` : "N/A"} />
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Cost of Living Breakdown</h2>
          {data.costOfLiving && data.costOfLiving.totalMonthly ? (
            <CostBreakdown
              total={`€${data.costOfLiving.totalMonthly.min.toLocaleString()} - €${data.costOfLiving.totalMonthly.max.toLocaleString()}`}
              breakdown={[
                { label: "Housing", value: data.costOfLiving.housing?.max || 0, percent: Math.round(((data.costOfLiving.housing?.max || 0) / (data.costOfLiving.totalMonthly.max || 1)) * 100) },
                { label: "Utilities", value: data.costOfLiving.utilities?.max || 0, percent: Math.round(((data.costOfLiving.utilities?.max || 0) / (data.costOfLiving.totalMonthly.max || 1)) * 100) },
                { label: "Food", value: data.costOfLiving.food?.max || 0, percent: Math.round(((data.costOfLiving.food?.max || 0) / (data.costOfLiving.totalMonthly.max || 1)) * 100) },
                { label: "Transportation", value: data.costOfLiving.transportation?.max || 0, percent: Math.round(((data.costOfLiving.transportation?.max || 0) / (data.costOfLiving.totalMonthly.max || 1)) * 100) },
                { label: "Healthcare", value: data.costOfLiving.healthcare?.max || 0, percent: Math.round(((data.costOfLiving.healthcare?.max || 0) / (data.costOfLiving.totalMonthly.max || 1)) * 100) },
                { label: "Entertainment", value: data.costOfLiving.entertainment?.max || 0, percent: Math.round(((data.costOfLiving.entertainment?.max || 0) / (data.costOfLiving.totalMonthly.max || 1)) * 100) },
              ]}
            />
          ) : (
            <p className="text-gray-600">Cost breakdown not available</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <TaxInfo 
            incomeTax={data.taxation?.incomeTax?.rate || "N/A"}
            vatRate={`${data.taxation?.vatSalesTax?.rate || 0}%`}
            socialSecurity={`${data.taxation?.socialSecurity?.employeeRate || 0}%`}
          />
          <VisaResidency 
            euCitizens="Free movement within EU"
            nonEuCitizens={data.visaRequirements?.workVisa?.types?.join(", ") || "Work visa required"}
            citizenshipPath={data.visaRequirements?.citizenship?.available ? `Available after ${data.visaRequirements.citizenship.timeRequired}` : "Not available"}
          />
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Quality of Life</h2>
          <QualityOfLife metrics={[
            { label: "Safety Index", score: data.lifestyle?.safetyIndex || 0 },
            { label: "Healthcare Quality", score: data.lifestyle?.healthcareQuality?.includes("Excellent") ? 90 : data.lifestyle?.healthcareQuality?.includes("Good") ? 75 : 60 },
            { label: "Education Quality", score: data.lifestyle?.educationSystem?.quality?.includes("Excellent") ? 90 : data.lifestyle?.educationSystem?.quality?.includes("Good") ? 75 : 60 },
            { label: "Work-Life Balance", score: data.lifestyle?.culture?.socialLife?.includes("Excellent") ? 90 : data.lifestyle?.culture?.socialLife?.includes("Good") ? 75 : 60 },
          ]} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <ClimateLifestyle
            description={data.climate ? `Average temperatures: Summer ${data.climate.averageTemperature?.summer?.min || 0}°C-${data.climate.averageTemperature?.summer?.max || 0}°C, Winter ${data.climate.averageTemperature?.winter?.min || 0}°C-${data.climate.averageTemperature?.winter?.max || 0}°C. Humidity: ${data.climate.humidity || "N/A"}. Best months: ${data.climate.bestMonths?.join(", ") || "N/A"}` : "Climate information not available"}
            annualSunshine={`${data.climate?.sunnyDaysPerYear || 0} days`}
          />
          <JobMarket description={data.jobMarket ? `Unemployment rate: ${data.jobMarket.unemploymentRate || 0}%. Average salary: ${data.jobMarket.averageSalary?.currency || "EUR"}${data.jobMarket.averageSalary?.min?.toLocaleString() || 0}-${data.jobMarket.averageSalary?.max?.toLocaleString() || 0}. Major industries: ${data.jobMarket.majorIndustries?.join(", ") || "N/A"}. Work culture: ${data.jobMarket.workCulture?.workingHours || "N/A"} hours, ${data.jobMarket.workCulture?.vacationDays || 0} vacation days, ${data.jobMarket.workCulture?.workLifeBalance || "N/A"} work-life balance.` : "Job market information not available"} />
        </div>
      </motion.div>
    </div>
  );
};

export default RelocationResultPage;
