import { useCreateTravelPlan } from '../../hooks/useTravelPlan';
import type { CreateTravelPlanRequest } from '../../services/types/travel-plan.types';

interface GeneratePlanButtonProps {
  onGenerate?: () => void;
  planData: CreateTravelPlanRequest;
  onSuccess?: (planId: string) => void;
  onError?: (error: string) => void;
}

const GeneratePlanButton = ({ 
  onGenerate, 
  planData, 
  onSuccess, 
  onError 
}: GeneratePlanButtonProps) => {
  const createTravelPlan = useCreateTravelPlan();

  const handleGenerate = async () => {
    try {
      const newPlan = await createTravelPlan.mutateAsync(planData);
      onSuccess?.(newPlan.id);
      onGenerate?.();
    } catch (error: any) {
      const errorMessage = error.message || 'Erro ao gerar plano de viagem';
      onError?.(errorMessage);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={createTravelPlan.isPending}
      className="bg-blue-400 hover:bg-blue-500 disabled:bg-blue-300 text-white font-semibold px-10 py-2 rounded-md flex items-center justify-center gap-2 shadow-md transition w-full sm:w-auto disabled:cursor-not-allowed"
    >
      {createTravelPlan.isPending ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Gerando Plano...
        </>
      ) : (
        'Generate My Plan'
      )}
    </button>
  );
};

export default GeneratePlanButton;
