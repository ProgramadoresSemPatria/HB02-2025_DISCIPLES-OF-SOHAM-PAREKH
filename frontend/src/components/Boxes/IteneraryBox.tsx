import { motion } from "framer-motion";

interface ItineraryItem {
  day: number;
  morning: {
    name: string;
    location: string;
    cost: number;
    duration: string;
    description: string;
  };
  afternoon: {
    name: string;
    location: string;
    cost: number;
    duration: string;
    description: string;
  };
  evening: {
    name: string;
    location: string;
    cost: number;
    duration: string;
    description: string;
  };
  dailyCost: number;
  notes: string[];
}

interface ItineraryBoxProps {
  itinerary: ItineraryItem[];
}

const ItineraryBox = ({ itinerary }: ItineraryBoxProps) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-10 w-full">
      <h3 className="text-xl font-bold text-gray-800 text-center mb-6">Your Trip Itinerary</h3>

      {itinerary.map((item, index) => (
        <motion.div
          key={item.day}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-blue-50 p-4 rounded-xl mb-4"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-purple-600">Day {item.day}</span>
            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
              ~€{item.dailyCost}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Morning */}
            <div className="bg-white p-3 rounded-lg">
              <h4 className="text-gray-700 font-medium mb-2 text-sm">🌅 Morning</h4>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-800">{item.morning.name}</p>
                <p className="text-xs text-gray-500 mt-1">{item.morning.location}</p>
                <p className="text-xs text-gray-500 mt-1">€{item.morning.cost} • {item.morning.duration}</p>
                <p className="text-xs text-gray-600 mt-2">{item.morning.description}</p>
              </div>
            </div>

            {/* Afternoon */}
            <div className="bg-white p-3 rounded-lg">
              <h4 className="text-gray-700 font-medium mb-2 text-sm">☀️ Afternoon</h4>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-800">{item.afternoon.name}</p>
                <p className="text-xs text-gray-500 mt-1">{item.afternoon.location}</p>
                <p className="text-xs text-gray-500 mt-1">€{item.afternoon.cost} • {item.afternoon.duration}</p>
                <p className="text-xs text-gray-600 mt-2">{item.afternoon.description}</p>
              </div>
            </div>

            {/* Evening */}
            <div className="bg-white p-3 rounded-lg">
              <h4 className="text-gray-700 font-medium mb-2 text-sm">🌙 Evening</h4>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-800">{item.evening.name}</p>
                <p className="text-xs text-gray-500 mt-1">{item.evening.location}</p>
                <p className="text-xs text-gray-500 mt-1">€{item.evening.cost} • {item.evening.duration}</p>
                <p className="text-xs text-gray-600 mt-2">{item.evening.description}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {item.notes.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <h5 className="text-xs font-medium text-gray-700 mb-1">💡 Tips</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                {item.notes.map((note, noteIndex) => (
                  <li key={noteIndex} className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ItineraryBox;
