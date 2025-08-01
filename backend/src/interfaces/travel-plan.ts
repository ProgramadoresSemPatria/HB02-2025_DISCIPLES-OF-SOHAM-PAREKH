export interface TravelPlanRequest {
  destination: string;
  type: 'VACATION' | 'RELOCATION';
  budgetLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  days?: number;
  budget?: number;
}

export interface VacationResponse {
  id: string;
  destination: string;
  type: 'VACATION';
  budgetLevel: string;
  days: number;
  overview: DestinationOverview;
  itinerary: DayItinerary[];
  costs: CostBreakdown;
  attractions: Attraction[];
  tips: Tip[];
  comparisons: DestinationComparison[];
  metadata: ResponseMetadata;
}

export interface RelocationResponse {
  id: string;
  destination: string;
  type: 'RELOCATION';
  budgetLevel: string;
  overview: RelocationOverview;
  costOfLiving: MonthlyCosts;
  visaRequirements: VisaInfo;
  taxation: TaxInfo;
  climate: ClimateInfo;
  jobMarket: JobMarketInfo;
  lifestyle: LifestyleInfo;
  banking: BankingInfo;
  comparisons: RelocationComparison[];
  metadata: ResponseMetadata;
}

export interface DestinationOverview {
  climate: string;
  bestTime: string;
  characteristics: string;
}

export interface RelocationOverview {
  population: string;
  language: string;
  currency: string;
  timeZone: string;
  generalInfo: string;
}

export interface DayItinerary {
  day: number;
  morning: Activity;
  afternoon: Activity;
  evening: Activity;
  dailyCost: number;
  notes: string[];
}

export interface Activity {
  name: string;
  location: string;
  cost: number;
  duration: string;
  description: string;
}

export interface CostBreakdown {
  accommodation: CostRange;
  food: CostRange;
  transportation: CostRange;
  attractions: CostRange;
  miscellaneous: CostRange;
  totalDaily: { min: number; max: number };
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

export interface Attraction {
  name: string;
  cost: number;
  category: 'free' | 'paid' | 'optional';
  description: string;
  tips: string[];
}

export interface Tip {
  category: string;
  title: string;
  content: string;
}

export interface DestinationComparison {
  destination: string;
  dailyBudget: { min: number; max: number };
  notes: string;
}

export interface RelocationComparison {
  destination: string;
  monthlyCost: { min: number; max: number };
  climate: string;
  safety: string;
  languageBarrier: string;
  jobMarket: string;
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

export interface ClimateInfo {
  averageTemperature: {
    summer: { min: number; max: number };
    winter: { min: number; max: number };
  };
  sunnyDaysPerYear: number;
  rainyDaysPerYear: number;
  humidity: string;
  bestMonths: string[];
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
    languageBarrier: string;
  };
}

export interface BankingInfo {
  requirements: string[];
  majorBanks: string[];
  services: string[];
  tips: string[];
}

export interface ResponseMetadata {
  generatedAt: Date;
  estimatedTotalCost?: number;
}

export interface TravelPlanEntity {
  id: string;
  clerkUserId: string;
  type: 'VACATION' | 'RELOCATION';
  budget?: number;
  budgetLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  destination: string;
  days?: number;
  itinerary?: any;
  costSummary?: any;
  additionalInfo?: any;
  createdAt: Date;
  updatedAt: Date;
}
