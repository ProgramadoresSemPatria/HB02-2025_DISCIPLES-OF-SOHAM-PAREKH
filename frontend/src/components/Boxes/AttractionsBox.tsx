import { motion } from "framer-motion";

interface Attraction {
  name: string;
  cost: number;
  category: 'free' | 'paid' | 'optional';
  description: string;
  tips: string[];
}

interface AttractionsBoxProps {
  attractions: Attraction[];
}

const AttractionsBox = ({ attractions }: AttractionsBoxProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'free':
        return 'bg-green-100 text-green-600';
      case 'paid':
        return 'bg-blue-100 text-blue-600';
      case 'optional':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'free':
        return '🆓';
      case 'paid':
        return '💰';
      case 'optional':
        return '⚡';
      default:
        return '📍';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-10 w-full">
      <h3 className="text-xl font-bold text-gray-800 text-center mb-6">Must-See Attractions</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attractions.map((attraction, index) => (
          <motion.div
            key={attraction.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-50 p-4 rounded-xl"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-gray-800 text-lg">{attraction.name}</h4>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(attraction.category)}`}>
                  {getCategoryIcon(attraction.category)} {attraction.category}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {attraction.cost === 0 ? 'Free' : `€${attraction.cost}`}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{attraction.description}</p>

            {attraction.tips.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-gray-700 mb-2">💡 Tips</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  {attraction.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="text-blue-500 mr-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AttractionsBox; 