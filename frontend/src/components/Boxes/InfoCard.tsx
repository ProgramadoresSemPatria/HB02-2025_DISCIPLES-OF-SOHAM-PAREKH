interface InfoCardProps {
  title?: string;
  children?: React.ReactNode;
  label?: string;
  value?: string;
  className?: string;
}

const InfoCard = ({ title, children, label, value, className = "" }: InfoCardProps) => {
  return (
    <div className={`bg-white shadow-md rounded-2xl p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{title}</h3>}
      {label && value && (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{label}</h3>
          <p className="text-xl font-bold text-blue-600 text-center">{value}</p>
        </>
      )}
      {children}
    </div>
  );
};

export default InfoCard;
