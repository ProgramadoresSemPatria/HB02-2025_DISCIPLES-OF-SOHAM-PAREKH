interface CostBreakdown {
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
}

interface BudgetBreakdownBoxProps {
  costs: CostBreakdown;
}

const BudgetBreakdownBox = ({ costs }: BudgetBreakdownBoxProps) => {
  const totalMin = costs.accommodation.min + costs.food.min + costs.transportation.min + costs.attractions.min + costs.miscellaneous.min;
  const totalMax = costs.accommodation.max + costs.food.max + costs.transportation.max + costs.attractions.max + costs.miscellaneous.max;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-10 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Daily Budget Breakdown</h3>
      <p className="text-gray-500 text-sm mb-6 text-center">Estimated costs for your trip</p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        <div>
          <p className="text-xl font-semibold text-gray-800">€{costs.accommodation.min}-{costs.accommodation.max}</p>
          <p className="text-sm text-gray-500">Accommodation</p>
          <p className="text-xs text-gray-400 mt-1">{costs.accommodation.notes}</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-800">€{costs.food.min}-{costs.food.max}</p>
          <p className="text-sm text-gray-500">Food</p>
          <p className="text-xs text-gray-400 mt-1">{costs.food.notes}</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-800">€{costs.transportation.min}-{costs.transportation.max}</p>
          <p className="text-sm text-gray-500">Transport</p>
          <p className="text-xs text-gray-400 mt-1">{costs.transportation.notes}</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-800">€{costs.attractions.min}-{costs.attractions.max}</p>
          <p className="text-sm text-gray-500">Attractions</p>
          <p className="text-xs text-gray-400 mt-1">{costs.attractions.notes}</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-pink-500">€{totalMin}-{totalMax}</p>
          <p className="text-sm text-gray-500">Total Daily</p>
          <p className="text-xs text-gray-400 mt-1">Estimated range</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Budget Tips</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• Accommodation: {costs.accommodation.notes}</p>
          <p>• Food: {costs.food.notes}</p>
          <p>• Transportation: {costs.transportation.notes}</p>
          <p>• Attractions: {costs.attractions.notes}</p>
          <p>• Extras: {costs.miscellaneous.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetBreakdownBox;
