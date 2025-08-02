interface CostItem {
  label: string;
  value: number;
  percent: number;
}

interface CostBreakdownProps {
  total: string;
  breakdown: CostItem[];
}

const CostBreakdown = ({ total, breakdown }: CostBreakdownProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-10">
      <h2 className="text-xl font-bold mb-4">Monthly Cost of Living</h2>
      {breakdown.map((item) => (
        <div key={item.label} className="mb-4">
          <div className="flex justify-between mb-1">
            <span>{item.label}</span>
            <span>€{item.value}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-500 rounded"
              style={{ width: `${item.percent}%` }}
            />
          </div>
        </div>
      ))}
      <div className="text-right mt-4 text-green-600 font-semibold">
        Total Monthly Cost: {total}
      </div>
    </div>
  );
};

export default CostBreakdown;
