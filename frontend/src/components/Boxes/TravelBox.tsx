import { useState } from "react";
import { CalendarDays, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import FormField from "../Inputs/FormField";
import GeneratePlanButton from "../Buttons/GeneratePlanButton";

const TravelBox = () => {
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <motion.div
      className="bg-white p-6 md:p-8 rounded-2xl shadow-md w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-10 mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >

      <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent">
          TravelWise
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-4 max-w-md">
          Plan your trip easily by specifying how long you want to travel and your budget preference. We'll generate the perfect itinerary for you!
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full md:w-[350px]">
        <FormField
          label="Trip Duration"
          type="input"
          inputType="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="1"
          icon={<CalendarDays className="w-4 h-4" />}
        />

        <FormField
          label="Budget Preference"
          type="select"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          icon={<DollarSign className="w-4 h-4" />}
          options={[
            { value: "low", label: "$ Low" },
            { value: "medium", label: "$$ Medium" },
            { value: "high", label: "$$$ High" },
          ]}
        />

        <GeneratePlanButton />
      </div>
    </motion.div>
  );
};

export default TravelBox;
