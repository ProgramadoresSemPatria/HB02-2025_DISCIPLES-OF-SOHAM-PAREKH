import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode; // icone a ser renderizado
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}
