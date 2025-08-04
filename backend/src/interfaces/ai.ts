import { 
  VacationAIResponseData,
  RelocationAIResponseData,
} from "./travel-plan";

export interface AIGenerationRequest {
  prompt: string;
  model?: string;
  destination: string;
  planType: 'VACATION' | 'RELOCATION';
  context?: Record<string, any>;
}

export interface StructuredAIResponse {
  vacation?: VacationAIResponseData;
  relocation?: RelocationAIResponseData;
  rawResponse: string;
  sources?: string[];
  planType: 'VACATION' | 'RELOCATION';
}

export interface AIProcessingResult {
  success: boolean;
  data?: VacationAIResponseData | RelocationAIResponseData;
  error?: string;
  processingTime: number;
}

export interface CachedAIResponse {
  key: string;
  data: StructuredAIResponse;
  createdAt: Date;
  expiresAt: Date;
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
