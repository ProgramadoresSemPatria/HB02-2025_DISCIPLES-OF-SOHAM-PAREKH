import { motion } from "framer-motion";

interface Overview {
  climate: string;
  bestTime: string;
  characteristics: string;
}

interface OverviewBoxProps {
  overview: Overview;
}

const OverviewBox = ({ overview }: OverviewBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-2xl p-6 mt-10 w-full"
    >
      <h3 className="text-xl font-bold text-gray-800 text-center mb-6">Destination Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl mb-2">🌤️</div>
          <h4 className="font-semibold text-gray-800 mb-2">Climate</h4>
          <p className="text-sm text-gray-600">{overview.climate}</p>
        </div>

        <div className="text-center">
          <div className="text-3xl mb-2">📅</div>
          <h4 className="font-semibold text-gray-800 mb-2">Best Time to Visit</h4>
          <p className="text-sm text-gray-600">{overview.bestTime}</p>
        </div>

        <div className="text-center">
          <div className="text-3xl mb-2">🏛️</div>
          <h4 className="font-semibold text-gray-800 mb-2">Characteristics</h4>
          <p className="text-sm text-gray-600">{overview.characteristics}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewBox; 