"use client";

import OptionBox from "@/components/game/OptionBox";
import ProfitSummary from "@/components/game/ProfitSummary";
import { useGame } from "@/contexts/GameContext";
import { useState } from "react";

export default function GamePage() {
  const { player, date, global, news } = useGame();
  const [location, setLocation] = useState<string>("");
  const [energy, setEnergy] = useState<number>(2);
  return (
    <div className="min-h-screen flex flex-col gap-20 items-center justify-center">
      <OptionBox>ซื้อขาย</OptionBox>
      <ProfitSummary principal={2000} balance={2500} />
    </div>
  );
}
