import { useNavigate } from "react-router";

const GeneratePlanButton = () => {
  const navigate = useNavigate();

  const generatePlan = () => {
    navigate("/generate-plan");
  };

  return (
    <button
      onClick={generatePlan}
      className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-10 py-2 rounded-md flex items-center justify-center gap-2 shadow-md transition w-full sm:w-auto"
    >
      Generate My Plan
    </button>
  );
};

export default GeneratePlanButton;
