import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const turnBack = () => {
    navigate("/");
  };

  return (
    <button
      onClick={turnBack}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
  );
};

export default BackButton;
