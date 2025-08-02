interface ItineraryItem {
  day: number;
  estimatedCost: number;
  activities: string[];
  dining: string[];
  highlights: string[];
}

interface ItineraryBoxProps {
  itinerary: ItineraryItem[];
}

const ItineraryBox = ({ itinerary }: ItineraryBoxProps) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-10 w-full">
      <h3 className="text-xl font-bold text-gray-800 text-center mb-6">Your Trip Itinerary</h3>

      {itinerary.map((item) => (
        <div key={item.day} className="bg-blue-50 p-4 rounded-xl mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-purple-600">Day {item.day}</span>
            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
              ~€{item.estimatedCost}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-gray-700 font-medium mb-1">Activities</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {item.activities.map((act, i) => <li key={i}>{act}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-700 font-medium mb-1">Dining</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {item.dining.map((meal, i) => <li key={i}>{meal}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-700 font-medium mb-1">Highlights</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {item.highlights.map((hl, i) => <li key={i}>{hl}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryBox;
