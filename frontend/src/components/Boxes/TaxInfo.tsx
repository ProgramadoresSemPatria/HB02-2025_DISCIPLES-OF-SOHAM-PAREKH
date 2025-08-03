interface TaxInfoProps {
  incomeTax: string;
  vatRate: string;
  socialSecurity: string;
}

const TaxInfo = ({ incomeTax, vatRate, socialSecurity }: TaxInfoProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-bold mb-4">Tax Information</h2>
      <ul className="text-sm space-y-2">
        <li><strong>Income Tax:</strong> {incomeTax}</li>
        <li><strong>VAT Rate:</strong> {vatRate}</li>
        <li><strong>Social Security:</strong> {socialSecurity}</li>
      </ul>
    </div>
  );
};

export default TaxInfo;
