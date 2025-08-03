interface ClimateLifestyleProps {
  description: string;
  annualSunshine: string;
}

const ClimateLifestyle = ({ description, annualSunshine }: ClimateLifestyleProps) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h2 className="text-lg font-bold mb-4">Climate & Lifestyle</h2>
    <p className="text-sm">{description}</p>
    <div className="mt-2 text-blue-600 font-semibold">Annual Sunshine: {annualSunshine}</div>
  </div>
);

export default ClimateLifestyle;
