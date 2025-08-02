import TravelBox from "@/components/Boxes/TravelBox";
import HeaderButtons from "@/components/Header/HeaderButtons";

const ChosenCountryToTravelPage = () => {
  const country = "Spain";
  const city = "Barcelona";

  return (
    <>
      <div className="display flex justify-center flex-col w-full min-h-screen bg-blue-50">

      
        <HeaderButtons country={country} city={city} />


      

      <div className="bg-blue-50 flex flex-col justify-center items-center px-4 py-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mt-6 bg-gradient-to-r from-pink-500 via-orange-300 to-green-900 bg-clip-text text-transparent text-center">
          Plan Your Perfect Vacation
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto text-center">
          Create your personalized itinerary for {city}, {country} with
          AI-powered recommendations
        </p>

        <TravelBox />
        </div>
      </div>
    </>
  );
};

export default ChosenCountryToTravelPage;
