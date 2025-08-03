interface BudgetBreakdownBoxProps {
  accommodation: number;
  activities: number;
  meals: number;
  transport: number;
}

const BudgetBreakdownBox = ({ accommodation, activities, meals, transport }: BudgetBreakdownBoxProps) => {
  const total = accommodation + activities + meals + transport;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-10 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Budget Breakdown</h3>
      <p className="text-gray-500 text-sm mb-6 text-center">Estimated costs for your trip</p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        <div>
          <p className="text-xl font-semibold text-gray-800">€{accommodation}</p>
          <p className="text-sm text-gray-500">Accommodation</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-800">€{activities}</p>
          <p className="text-sm text-gray-500">Activities</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-800">€{meals}</p>
          <p className="text-sm text-gray-500">Meals</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-800">€{transport}</p>
          <p className="text-sm text-gray-500">Transport</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-pink-500">€{total}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetBreakdownBox;
