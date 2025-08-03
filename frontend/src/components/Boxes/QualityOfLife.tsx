interface QualityOfLifeMetric {
  label: string;
  score: number;
}

interface QualityOfLifeProps {
  metrics: QualityOfLifeMetric[];
}

const QualityOfLife = ({ metrics }: QualityOfLifeProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-10">
      <h2 className="text-lg font-bold mb-4">Quality of Life Indicators</h2>
      <div className="space-y-4">
        {metrics.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span>{item.score}/100</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualityOfLife;
