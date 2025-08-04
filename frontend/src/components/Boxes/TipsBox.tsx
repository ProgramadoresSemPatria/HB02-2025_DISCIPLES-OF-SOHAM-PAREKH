import { motion } from "framer-motion";

interface Tip {
  category: string;
  title: string;
  content: string;
}

interface TipsBoxProps {
  tips: Tip[];
}

const TipsBox = ({ tips }: TipsBoxProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'transportation':
        return '🚗';
      case 'food':
        return '🍽️';
      case 'accommodation':
        return '🏨';
      case 'safety':
        return '🛡️';
      case 'culture':
        return '🎭';
      case 'money':
        return '💰';
      default:
        return '💡';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-10 w-full">
      <h3 className="text-xl font-bold text-gray-800 text-center mb-6">Travel Tips</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <motion.div
            key={`${tip.category}-${tip.title}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-blue-50 p-4 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{getCategoryIcon(tip.category)}</span>
              <h4 className="font-semibold text-gray-800">{tip.title}</h4>
            </div>
            <p className="text-sm text-gray-600">{tip.content}</p>
            <div className="mt-2">
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {tip.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TipsBox; 