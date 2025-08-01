import { z } from "zod";

export const createTravelPlanSchema = z.object({
  destination: z.string().min(2, "Destination must have at least 2 characters"),
  type: z.enum(["VACATION", "RELOCATION"]),
  budgetLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
  days: z.number().min(1).max(365).optional(),
  budget: z.number().min(0).optional(),
});

export const vacationAIResponseSchema = z.object({
  overview: z.object({
    climate: z.string(),
    bestTime: z.string(),
    characteristics: z.string(),
  }),
  itinerary: z.array(z.object({
    day: z.number(),
    morning: z.object({
      name: z.string(),
      location: z.string(),
      cost: z.number(),
      duration: z.string(),
      description: z.string(),
    }),
    afternoon: z.object({
      name: z.string(),
      location: z.string(),
      cost: z.number(),
      duration: z.string(),
      description: z.string(),
    }),
    evening: z.object({
      name: z.string(),
      location: z.string(),
      cost: z.number(),
      duration: z.string(),
      description: z.string(),
    }),
    dailyCost: z.number(),
    notes: z.array(z.string()),
  })),
  costs: z.object({
    accommodation: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    food: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    transportation: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    attractions: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    miscellaneous: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    totalDaily: z.object({
      min: z.number(),
      max: z.number(),
    }),
  }),
  attractions: z.array(z.object({
    name: z.string(),
    cost: z.number(),
    category: z.enum(['free', 'paid', 'optional']),
    description: z.string(),
    tips: z.array(z.string()),
  })),
  tips: z.array(z.object({
    category: z.string(),
    title: z.string(),
    content: z.string(),
  })),
  comparisons: z.array(z.object({
    destination: z.string(),
    dailyBudget: z.object({
      min: z.number(),
      max: z.number(),
    }),
    notes: z.string(),
  })),
});

export const relocationAIResponseSchema = z.object({
  overview: z.object({
    population: z.string(),
    language: z.string(),
    currency: z.string(),
    timeZone: z.string(),
    generalInfo: z.string(),
  }),
  costOfLiving: z.object({
    housing: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    utilities: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    food: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    transportation: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    healthcare: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    entertainment: z.object({
      min: z.number(),
      max: z.number(),
      notes: z.string(),
    }),
    totalMonthly: z.object({
      min: z.number(),
      max: z.number(),
    }),
  }),
  visaRequirements: z.object({
    touristVisa: z.object({
      required: z.boolean(),
      duration: z.string(),
      process: z.string(),
    }),
    workVisa: z.object({
      types: z.array(z.string()),
      requirements: z.array(z.string()),
      processingTime: z.string(),
    }),
    residency: z.object({
      requirements: z.array(z.string()),
      processingTime: z.string(),
      cost: z.number(),
    }),
    citizenship: z.object({
      available: z.boolean(),
      requirements: z.array(z.string()),
      timeRequired: z.string(),
    }),
  }),
  taxation: z.object({
    incomeTax: z.object({
      rate: z.string(),
      brackets: z.array(z.object({
        min: z.number(),
        max: z.number().nullable(),
        rate: z.number(),
      })),
    }),
    propertyTax: z.object({
      rate: z.string(),
      notes: z.string(),
    }),
    vatSalesTax: z.object({
      rate: z.number(),
      notes: z.string(),
    }),
    socialSecurity: z.object({
      employeeRate: z.number(),
      employerRate: z.number(),
      notes: z.string(),
    }),
  }),
  climate: z.object({
    averageTemperature: z.object({
      summer: z.object({ min: z.number(), max: z.number() }),
      winter: z.object({ min: z.number(), max: z.number() }),
    }),
    sunnyDaysPerYear: z.number(),
    rainyDaysPerYear: z.number(),
    humidity: z.string(),
    bestMonths: z.array(z.string()),
  }),
  jobMarket: z.object({
    unemploymentRate: z.number(),
    averageSalary: z.object({
      min: z.number(),
      max: z.number(),
      currency: z.string(),
    }),
    inDemandSkills: z.array(z.string()),
    majorIndustries: z.array(z.string()),
    workCulture: z.object({
      workingHours: z.string(),
      vacationDays: z.number(),
      workLifeBalance: z.string(),
    }),
  }),
  lifestyle: z.object({
    safetyIndex: z.number(),
    healthcareQuality: z.string(),
    educationSystem: z.object({
      quality: z.string(),
      publicSchools: z.boolean(),
      internationalSchools: z.boolean(),
    }),
    transportation: z.object({
      publicTransport: z.string(),
      carOwnership: z.string(),
      walkability: z.string(),
    }),
    culture: z.object({
      socialLife: z.string(),
      expatCommunity: z.string(),
      languageBarrier: z.string(),
    }),
  }),
  banking: z.object({
    requirements: z.array(z.string()),
    majorBanks: z.array(z.string()),
    services: z.array(z.string()),
    tips: z.array(z.string()),
  }),
  comparisons: z.array(z.object({
    destination: z.string(),
    monthlyCost: z.object({
      min: z.number(),
      max: z.number(),
    }),
    climate: z.string(),
    safety: z.string(),
    languageBarrier: z.string(),
    jobMarket: z.string(),
    notes: z.string(),
  })),
});

export type CreateTravelPlanDTO = z.infer<typeof createTravelPlanSchema>;
export type VacationAIResponseData = z.infer<typeof vacationAIResponseSchema>;
export type RelocationAIResponseData = z.infer<typeof relocationAIResponseSchema>;
