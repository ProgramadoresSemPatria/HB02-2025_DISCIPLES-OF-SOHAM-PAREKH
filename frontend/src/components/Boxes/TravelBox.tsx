import { useState } from "react";
import { CalendarDays, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import FormField from "../Inputs/FormField";

const TravelBox = () => {
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto flex gap-10 mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >

      <div className="flex flex-col items-center flex-1 text-center md:text-left md:items-start">
        <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent">
          TravelWise
        </span>
        <p className="text-gray-700 text-2xl leading-relaxed mt-2 max-w-md">
          Plan your trip easily by specifying how long you want to travel and
          your budget preference. We'll generate the perfect itinerary for you!
        </p>
      </div>

    
      <div className="flex flex-col gap-6 w-[350px]">
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

        <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-10 py-2 rounded-md flex items-center justify-center gap-2 shadow-md transition w-full sm:w-auto">
          Generate My Plan
        </button>
      </div>
    </motion.div>
  );
};

export default TravelBox;
