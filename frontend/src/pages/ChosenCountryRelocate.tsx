import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeaderButtons from "@/components/Header/HeaderButtons";
import ClimateLifestyle from "@/components/Boxes/ClimateLifestyle";
import CostBreakdown from "@/components/Boxes/CostBreakdown";
import InfoCard from "@/components/Boxes/InfoCard";
import JobMarket from "@/components/Boxes/JobMarket";
import QualityOfLife from "@/components/Boxes/QualityOfLife";
import TaxInfo from "@/components/Boxes/TaxInfo";
import VisaResidency from "@/components/Boxes/VisaResidency";
import RelocationStepsSection from "@/components/RelocationStepsSession";

interface RelocateData {
  country: string;
  city: string;
  population: string;
  expatCommunity: string;
  annualSunshine: string;
  monthlyCost: string;

  relocationSteps: {
    number: number;
    title: string;
    description: string;
  }[];

  costBreakdown: {
    label: string;
    value: number;
    percent: number;
  }[];

  taxInfo: {
    incomeTax: string;
    vatRate: string;
    socialSecurity: string;
  };

  visaResidency: {
    euCitizens: string;
    nonEuCitizens: string;
    citizenshipPath: string;
  };

  qualityOfLifeMetrics: {
    label: string;
    score: number;
  }[];

  climateLifestyleText: string;
  annualSunshineHours: string;

  jobMarketText: string;
}

const ChosenCountryRelocate = () => {
  const [data, setData] = useState<RelocateData | null>(null);

  useEffect(() => {
    // Simulação fetch API - substitua com fetch/axios real
    async function fetchData() {
      const apiResponse: RelocateData = {
        country: "Japan",
        city: "Tokyo",
        population: "14M",
        expatCommunity: "Growing expat community",
        annualSunshine: "1880h",
        monthlyCost: "€2950",
        relocationSteps: [
          {
            number: 1,
            title: "Research Visa",
            description: "Understand the visa requirements for Japan.",
          },
          {
            number: 2,
            title: "Estimate Your Budget",
            description: "Calculate housing, food, and other costs.",
          },
          {
            number: 3,
            title: "Find Accommodation",
            description: "Search for housing options within your budget.",
          },
          {
            number: 4,
            title: "Prepare Documents",
            description: "Get your documents ready for the move.",
          },
        ],
        costBreakdown: [
          { label: "Housing", value: 1300, percent: 44 },
          { label: "Food", value: 500, percent: 17 },
          { label: "Utilities", value: 200, percent: 7 },
          { label: "Transport", value: 150, percent: 5 },
          { label: "Entertainment", value: 300, percent: 10 },
        ],
        taxInfo: {
          incomeTax: "5–45%",
          vatRate: "10%",
          socialSecurity: "15%",
        },
        visaResidency: {
          euCitizens: "Work visa required",
          nonEuCitizens: "Work visa required",
          citizenshipPath: "After 5 years, very strict requirements",
        },
        qualityOfLifeMetrics: [
          { label: "Safety", score: 98 },
          { label: "Healthcare", score: 95 },
          { label: "Education", score: 92 },
          { label: "Climate", score: 70 },
          { label: "Culture", score: 90 },
        ],
        climateLifestyleText:
          "Compared to London (1,633 hours) and Berlin (1,626 hours), Tokyo offers comparable sunshine throughout the year.",
        annualSunshineHours: "1880h",
        jobMarketText:
          "Excellent for tech, finance, and education. Research specific job opportunities in your field and consider networking with local professionals.",
      };

      setData(apiResponse);
    }

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
      <HeaderButtons country="Japan" city="Tokyo" />

    
        <h1 className=" text-3xl bg-gradient-to-r from-blue-600 to-purple-800 bg-clip-text text-transparent font-bold">
           Living in {""} Tokyo, Japan
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
          <InfoCard label="Population" value={data.population} />
          <InfoCard label="Expat Community" value={data.expatCommunity} />
          <InfoCard label="Annual Sunshine" value={data.annualSunshine} />
          <InfoCard label="Monthly Cost" value={data.monthlyCost} />
        </div>

        <RelocationStepsSection steps={data.relocationSteps} />

        <CostBreakdown
          total={data.monthlyCost}
          breakdown={data.costBreakdown}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <TaxInfo {...data.taxInfo} />
          <VisaResidency {...data.visaResidency} />
        </div>

        <QualityOfLife metrics={data.qualityOfLifeMetrics} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <ClimateLifestyle
            description={data.climateLifestyleText}
            annualSunshine={data.annualSunshineHours}
          />
          <JobMarket description={data.jobMarketText} />
        </div>
      </motion.div>
    </div>
  );
};

export default ChosenCountryRelocate;
