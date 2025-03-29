"use client";

import { useGame } from "@/contexts/GameContext";
import { useState } from "react";

export default function GamePage() {
  const { player, date, global, news } = useGame();
  const [location, setLocation] = useState<string>("");
  const [energy, setEnergy] = useState<number>(2);
  return <div></div>;
}
