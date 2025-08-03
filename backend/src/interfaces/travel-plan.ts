import { z } from 'zod';
import { vacationAIResponseSchema, relocationAIResponseSchema, createTravelPlanSchema } from '../schemas/travel-plan';

export interface TravelPlanRequest {
  destination: string;
  type: 'VACATION' | 'RELOCATION';
  budgetLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  days?: number;
  budget?: number;
}

export type CreateTravelPlanDTO = z.infer<typeof createTravelPlanSchema>;
export type VacationAIResponseData = z.infer<typeof vacationAIResponseSchema>;
export type RelocationAIResponseData = z.infer<typeof relocationAIResponseSchema>;

export interface VacationResponse extends VacationAIResponseData {
  id: string;
  destination: string;
  type: 'VACATION';
  budgetLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  days: number;
  metadata: {
    generatedAt: Date;
    estimatedTotalCost?: number;
    model?: string;
    sdk?: string;
  };
}

export interface RelocationResponse extends RelocationAIResponseData {
  id: string;
  destination: string;
  type: 'RELOCATION';
  budgetLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  metadata: {
    generatedAt: Date;
    model?: string;
    sdk?: string;
  };
}

// ===== ENTITY INTERFACE =====
export interface TravelPlanEntity {
  id: string;
  clerkUserId: string;
  type: 'VACATION' | 'RELOCATION';
  budget?: number;
  budgetLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  destination: string;
  days?: number;
  itinerary?: VacationAIResponseData | RelocationAIResponseData;
  costSummary?: any;
  additionalInfo?: {
    rawResponse?: string;
    model?: string;
    sdk?: string;
    generationTime?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface GeminiServiceConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerationMetadata {
  model: string;
  sdk: string;
  generationTime: number;
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface GeminiGenerationResult<T> {
  data: T;
  metadata: GenerationMetadata;
}
