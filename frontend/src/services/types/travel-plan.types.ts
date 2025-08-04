// Tipos para Vacation AI Response baseado na estrutura real do backend
export interface VacationAIResponseData {
  overview: {
    climate: string;
    bestTime: string;
    characteristics: string;
  };
  itinerary: Array<{
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
  }>;
  costs: {
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
  };
  attractions: Array<{
    name: string;
    cost: number;
    category: 'free' | 'paid' | 'optional';
    description: string;
    tips: string[];
  }>;
  tips: Array<{
    category: string;
    title: string;
    content: string;
  }>;
  comparisons: Array<{
    destination: string;
    dailyBudget: {
      min: number;
      max: number;
    };
    notes: string;
  }>;
}

// Tipos para Relocation AI Response baseado na estrutura real do backend
export interface RelocationAIResponseData {
  overview: {
    population: string;
    language: string;
    currency: string;
    timeZone: string;
    generalInfo: string;
  };
  costOfLiving: {
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
  };
  visaRequirements: {
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
  };
  taxation: {
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
  };
  climate: {
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
  };
  jobMarket: {
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
  };
  lifestyle: {
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
  };
  banking: {
    requirements: string[];
    majorBanks: string[];
    services: string[];
    tips: string[];
  };
  comparisons: Array<{
    destination: string;
    monthlyCost: {
      min: number;
      max: number;
    };
    climate: string;
    safety: string;
    languageBarrier: string;
    jobMarket: string;
    notes: string;
  }>;
}

// Tipos para requests
export interface CreateTravelPlanRequest {
  destination: string;
  type: 'VACATION' | 'RELOCATION';
  budgetLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  days?: number;
  budget?: number;
}

export interface UpdateTravelPlanRequest {
  destination?: string;
  type?: 'VACATION' | 'RELOCATION';
  budgetLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  days?: number;
  budget?: number;
}

// Tipos para responses
export interface TravelPlanResponse {
  id: string;
  destination: string;
  type: 'VACATION' | 'RELOCATION';
  budgetLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  days?: number;
  budget?: number;
  overview?: VacationAIResponseData['overview'] | RelocationAIResponseData['overview'];
  itinerary?: VacationAIResponseData['itinerary'];
  costs?: VacationAIResponseData['costs'] | RelocationAIResponseData['costOfLiving'];
  attractions?: VacationAIResponseData['attractions'];
  tips?: VacationAIResponseData['tips'];
  comparisons?: VacationAIResponseData['comparisons'] | RelocationAIResponseData['comparisons'];
  visaRequirements?: RelocationAIResponseData['visaRequirements'];
  taxation?: RelocationAIResponseData['taxation'];
  climate?: VacationAIResponseData['overview'] | RelocationAIResponseData['climate'];
  jobMarket?: RelocationAIResponseData['jobMarket'];
  lifestyle?: RelocationAIResponseData['lifestyle'];
  banking?: RelocationAIResponseData['banking'];
  createdAt?: Date;
  updatedAt?: Date;
  metadata?: {
    generatedAt: string;
  };
}

// Tipos para listagem
export interface TravelPlansListResponse {
  travelPlans: TravelPlanResponse[];
  total: number;
  page: number;
  limit: number;
}

// Tipos para API responses
export interface TravelPlanApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface TravelPlanApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
} 