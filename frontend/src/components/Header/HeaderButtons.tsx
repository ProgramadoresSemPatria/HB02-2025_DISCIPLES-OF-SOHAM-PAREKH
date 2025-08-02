import { ArrowLeft } from "lucide-react";

interface HeaderButtonsProps {
  country: string;
  city: string;
}

export default function HeaderButtons({ country, city }: HeaderButtonsProps) {
  return (
    <div className="flex justify-between items-center px-6 py-4 w-full max-w-5xl mx-auto">
      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="text-center">
        <p className="text-gray-600">Selected Destination:</p>
        <p className="font-bold text-2xl">{city}, {country}</p>
      </div>

      <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition">
        Start Over
      </button>
    </div>
  );
}
