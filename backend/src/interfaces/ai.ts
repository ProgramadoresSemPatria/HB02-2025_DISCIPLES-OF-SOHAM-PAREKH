import { 
  VacationResponse,
  DestinationOverview,
  DayItinerary,
  CostBreakdown,
  Attraction,
  Tip,
  DestinationComparison,
  RelocationResponse
} from "./travel-plan";

export interface AIGenerationRequest {
  prompt: string;
  model?: string;
  destination: string;
  planType: 'VACATION' | 'RELOCATION';
  context?: Record<string, any>;
}

export interface StructuredAIResponse {
  vacation?: VacationResponse;
  relocation?: StructuredRelocationResponse;
  rawResponse: string;
  sources?: string[];
  planType: 'VACATION' | 'RELOCATION';
}

export interface VacationAIResponse {
  overview: DestinationOverview;
  itinerary: DayItinerary[];
  costs: CostBreakdown;
  attractions: Attraction[];
  tips: Tip[];
  comparisons: DestinationComparison[];
  rawResponse: string;
  sources?: string[];
}

export interface StructuredRelocationResponse {
  overview: RelocationOverview;
  costOfLiving: MonthlyCosts;
  visaRequirements: VisaInfo;
  taxation: TaxInfo;
  climate: ClimateInfo;
  jobMarket: JobMarketInfo;
  lifestyle: LifestyleInfo;
  comparisons: RelocationComparison[];
}

export interface RelocationOverview {
  population: string;
  language: string;
  currency: string;
  timeZone: string;
  generalInfo: string;
}

export interface MonthlyCosts {
  housing: CostRange;
  utilities: CostRange;
  food: CostRange;
  transportation: CostRange;
  healthcare: CostRange;
  entertainment: CostRange;
  totalMonthly: { min: number; max: number };
}

export interface CostRange {
  min: number;
  max: number;
  notes: string;
}

export interface VisaInfo {
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

export interface TaxInfo {
  incomeTax: {
    rate: string;
    brackets: Array<{
      min: number;
      max: number;
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
  otherTaxes: Array<{
    name: string;
    rate: string;
    description: string;
  }>;
}

export interface ClimateInfo {
  averageTemperature: {
    summer: { min: number; max: number };
    winter: { min: number; max: number };
  };
  sunnyDaysPerYear: number;
  rainyDaysPerYear: number;
  humidity: string;
  bestMonths: string[];
  comparison: Array<{
    country: string;
    sunnyDays: number;
    notes: string;
  }>;
}

export interface JobMarketInfo {
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

export interface LifestyleInfo {
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
    language: string;
  };
}

export interface RelocationComparison {
  destination: string;
  monthlyCost: { min: number; max: number };
  qualityOfLife: number;
  sunnyDays: number;
  safetyIndex: number;
  notes: string;
}

export interface AIProcessingResult {
  success: boolean;
  data?: VacationResponse | RelocationResponse;
  error?: string;
  processingTime: number;
}

export interface CachedAIResponse {
  key: string;
  data: StructuredAIResponse;
  createdAt: Date;
  expiresAt: Date;
}
