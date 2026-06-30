"use client";

import { motion } from "framer-motion";

export default function SectionDivider({ color = "gold" }) {
  const colors = {
    gold: {
      from: "rgba(201,169,110,0.15)",
      mid: "rgba(212,175,106,0.25)",
      to: "rgba(201,169,110,0.15)",
    },
    rose: {
      from: "rgba(212,160,160,0.1)",
      mid: "rgba(232,196,196,0.18)",
      to: "rgba(212,160,160,0.1)",
    },
  };

  const c = colors[color] || colors.gold;

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        width: "100%",
        height: 1,
        background: `linear-gradient(to right, ${c.from}, ${c.mid}, ${c.to})`,
      }}
    />
  );
}
