import BackButton from "../Buttons/BackButton";
import StartButton from "../Buttons/StartButton";

interface HeaderButtonsProps {
  country: string;
  city: string;
}

export default function HeaderButtons({ country, city }: HeaderButtonsProps) {
  return (
    <div className="flex justify-between items-center px-6 py-4 w-full max-w-5xl mx-auto">
      <BackButton/>

      <div className="text-center">
        <p className="text-gray-600">Selected Destination:</p>
        <p className="font-bold text-2xl">{city}, {country}</p>
      </div>

      <StartButton/>
    </div>
  );
}
