"use client";

import { motion } from "framer-motion";

export default function CSSOrb() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="css-orb-container"
    >
      <div className="css-orb-glow" />
      <div className="css-orb-ring" />
      <div className="css-orb-ring-2" />
      <div className="css-orb-core" />
    </motion.div>
  );
}
