import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { FC } from "react";

interface TutorialStepCardProps {
  number: number;
  title: string;
  description: string;
}

const TutorialStepCard: FC<TutorialStepCardProps> = ({ number, title, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0}}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center px-4 py-6 rounded-xl shadow-sm hover:shadow-md transition"
    >
      <div className="text-white bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mb-4">
        {number}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

export default TutorialStepCard;
