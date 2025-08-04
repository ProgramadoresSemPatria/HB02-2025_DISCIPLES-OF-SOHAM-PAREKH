import { useNavigate } from "react-router-dom";
import React from "react";

interface StartPlanButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
}

export default function StartPlanButton({ children, type = "button" }: StartPlanButtonProps) {
  const navigate = useNavigate();

  const goToPlanPage = () => {
    navigate("/plan-form");
  };

  return (
    <button
      type={type}
      onClick={goToPlanPage}
      className="px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-yellow-400 hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}
