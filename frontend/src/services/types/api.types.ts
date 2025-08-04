// Tipos gerais para API
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  details?: any;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Tipos para filtros
export interface TravelPlanFilters extends PaginationParams {
  type?: 'VACATION' | 'RELOCATION';
  destination?: string;
  budgetLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAfter?: Date;
  createdBefore?: Date;
}

// Tipos para ordenação
export type SortOrder = 'asc' | 'desc';

export interface SortParams {
  field: string;
  order: SortOrder;
} 