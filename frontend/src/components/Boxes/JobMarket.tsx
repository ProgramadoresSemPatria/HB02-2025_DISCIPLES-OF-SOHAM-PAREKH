interface JobMarketProps {
  description: string;
}

const JobMarket = ({ description }: JobMarketProps) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h2 className="text-lg font-bold mb-4">Job Market & Economy</h2>
    <p className="text-sm">{description}</p>
  </div>
);

export default JobMarket;
