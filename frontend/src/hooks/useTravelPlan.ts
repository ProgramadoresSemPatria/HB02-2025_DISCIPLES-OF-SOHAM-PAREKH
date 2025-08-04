import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { travelPlanService } from '../services/travel-plan';
import type {
  CreateTravelPlanRequest,
  UpdateTravelPlanRequest,
} from '../services/types/travel-plan.types';
import type { TravelPlanFilters } from '../services/types/api.types';

// Query keys para React Query
export const travelPlanKeys = {
  all: ['travel-plans'] as const,
  lists: () => [...travelPlanKeys.all, 'list'] as const,
  list: (filters?: TravelPlanFilters) => [...travelPlanKeys.lists(), filters] as const,
  details: () => [...travelPlanKeys.all, 'detail'] as const,
  detail: (id: string) => [...travelPlanKeys.details(), id] as const,
};

/**
 * Hook para gerenciar planos de viagem
 */
export function useTravelPlan() {
  const queryClient = useQueryClient();

  /**
   * Query para listar todos os planos de viagem
   */
  const useTravelPlans = (filters?: TravelPlanFilters) => {
    return useQuery({
      queryKey: travelPlanKeys.list(filters),
      queryFn: () => travelPlanService.getTravelPlans(filters),
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000,   // 10 minutos
    });
  };

  /**
   * Query para obter um plano específico
   */
  const useTravelPlan = (id: string) => {
    return useQuery({
      queryKey: travelPlanKeys.detail(id),
      queryFn: () => travelPlanService.getTravelPlan(id),
      enabled: !!id, // Só executa se o ID existir
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });
  };

  /**
   * Mutation para criar um novo plano
   */
  const createTravelPlan = useMutation({
    mutationFn: (data: CreateTravelPlanRequest) => travelPlanService.createTravelPlan(data),
    onSuccess: (newPlan) => {
      // Invalidar queries de listagem
      queryClient.invalidateQueries({ queryKey: travelPlanKeys.lists() });
      
      // Adicionar o novo plano ao cache
      queryClient.setQueryData(
        travelPlanKeys.detail(newPlan.id),
        newPlan
      );
    },
    onError: (error) => {
      console.error('Erro ao criar plano de viagem:', error);
    },
  });

  /**
   * Mutation para atualizar um plano
   */
  const updateTravelPlan = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTravelPlanRequest }) =>
      travelPlanService.updateTravelPlan(id, data),
    onSuccess: (updatedPlan) => {
      // Invalidar queries de listagem
      queryClient.invalidateQueries({ queryKey: travelPlanKeys.lists() });
      
      // Atualizar o plano no cache
      queryClient.setQueryData(
        travelPlanKeys.detail(updatedPlan.id),
        updatedPlan
      );
    },
    onError: (error) => {
      console.error('Erro ao atualizar plano de viagem:', error);
    },
  });

  /**
   * Mutation para deletar um plano
   */
  const deleteTravelPlan = useMutation({
    mutationFn: (id: string) => travelPlanService.deleteTravelPlan(id),
    onSuccess: (_, deletedId) => {
      // Invalidar queries de listagem
      queryClient.invalidateQueries({ queryKey: travelPlanKeys.lists() });
      
      // Remover o plano do cache
      queryClient.removeQueries({ queryKey: travelPlanKeys.detail(deletedId) });
    },
    onError: (error) => {
      console.error('Erro ao deletar plano de viagem:', error);
    },
  });

  return {
    // Queries
    useTravelPlans,
    useTravelPlan,
    
    // Mutations
    createTravelPlan,
    updateTravelPlan,
    deleteTravelPlan,
    
    // Utilitários
    invalidateQueries: () => {
      queryClient.invalidateQueries({ queryKey: travelPlanKeys.all });
    },
  };
}

/**
 * Hook simplificado para criar planos de viagem
 */
export function useCreateTravelPlan() {
  const { createTravelPlan } = useTravelPlan();
  return createTravelPlan;
}

/**
 * Hook simplificado para listar planos de viagem
 */
export function useTravelPlansList(filters?: TravelPlanFilters) {
  return useQuery({
    queryKey: travelPlanKeys.list(filters),
    queryFn: () => travelPlanService.getTravelPlans(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000,   // 10 minutos
  });
}

/**
 * Hook simplificado para obter um plano específico
 */
export function useTravelPlanById(id: string) {
  return useQuery({
    queryKey: travelPlanKeys.detail(id),
    queryFn: () => travelPlanService.getTravelPlan(id),
    enabled: !!id, // Só executa se o ID existir
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 