interface VisaResidencyProps {
  euCitizens: string;
  nonEuCitizens: string;
  citizenshipPath: string;
}

const VisaResidency = ({ euCitizens, nonEuCitizens, citizenshipPath }: VisaResidencyProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-bold mb-4">Visa & Residency</h2>
      <ul className="text-sm space-y-2">
        <li><strong>EU Citizens:</strong> {euCitizens}</li>
        <li><strong>Non-EU Citizens:</strong> {nonEuCitizens}</li>
        <li><strong>Citizenship Path:</strong> {citizenshipPath}</li>
      </ul>
    </div>
  );
};

export default VisaResidency;
