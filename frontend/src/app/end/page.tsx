"use client";
import DaySummary from "@/components/game/DaySummary";
import ProfitSummary from "@/components/game/ProfitSummary";
import { useGame } from "@/contexts/GameContext";
import { motion } from "motion/react";
import Image from "next/image";

export default function EndPage() {
  const game = useGame();
  return (
    <div className="h-screen">
      <motion.div
        className="relative w-full h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} // Smooth fade-in effect
      >
        <Image
          src="/money.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />

        <motion.div
          className="absolute inset-x-0 bottom-10 flex justify-center text-white text-3xl font-light cursor-pointer"
          whileHover={{ scale: 1.1 }} // Slight bounce effect on hover
          whileTap={{ scale: 0.9 }} // Small shrink effect when tapped
        >
          <div className="z-40">
            <ProfitSummary principal={2000} balance={1000} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
