"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { INews, IPlayer, IStock } from "@/Model/game";

interface IGameContext {
  player: IPlayer;
  date: number;
  global: {
    stocks: IStock[];
    buyGoldPrice: number;
    sellGoldPrice: number;
    interestRate: number;
    bonds: IStock[];
    debtInstruments: IStock[];
  };
  news: INews[];
  setPlayer: React.Dispatch<React.SetStateAction<IPlayer>>;
  setDate: React.Dispatch<React.SetStateAction<number>>;
  setGlobal: React.Dispatch<
    React.SetStateAction<{
      stocks: IStock[];
      buyGoldPrice: number;
      sellGoldPrice: number;
      interestRate: number;
      bonds: IStock[];
      debtInstruments: IStock[];
    }>
  >;
  setNews: React.Dispatch<React.SetStateAction<INews[]>>;
}

// Create the context with a default value (empty or null state)
const GameContext = createContext<IGameContext>({} as IGameContext);

// Custom hook to use the context
export const useGame = () => useContext(GameContext);

// Define the GameProvider component
interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [player, setPlayer] = useState<IPlayer>({
    id: "player-001",
    name: "Default Player",
    balance: 10000,
    assets: {
      stocks: [],
      bank: 5000,
      gold: 20,
      bonds: [],
      debtInstruments: [],
    },
  });
  const [date, setDate] = useState<number>(1);
  const [global, setGlobal] = useState<{
    stocks: IStock[];
    buyGoldPrice: number;
    sellGoldPrice: number;
    interestRate: number;
    bonds: IStock[]; // Bonds structure, same as stocks
    debtInstruments: IStock[]; // Debt instruments structure, same as stocks
  }>({
    stocks: [
      { name: "PPEACH", type: "tech", price: 150, amount: 2000 },
      { name: "YAGLE", type: "tech", price: 2800, amount: 2000 },
      { name: "TTP", type: "oil", price: 300, amount: 3000 },
    ],
    buyGoldPrice: 20000,
    sellGoldPrice: 19000,
    interestRate: 0.5,
    bonds: [
      { name: "GovBond", type: "bond", price: 1000, amount: 15 }, // Bond example
    ],
    debtInstruments: [
      { name: "ShortTermDebt1", type: "debt", price: 500, amount: 10 }, // Debt instrument example
      { name: "ShortTermDebt2", type: "debt", price: 500, amount: 10 }, // Debt instrument example
    ],
  });
  const [news, setNews] = useState<INews[]>([
    {
      topic: "Stock Surge",
      description: "Tech stocks are booming!",
      date: 2,
      effect: {
        stocks: [{ type: "tech", rate: 1.1 }], // +10% for tech stocks
        gold: -2, // Gold price drops by 2%
      },
    },
    {
      topic: "Tom Yum Goong Economy",
      description:
        "an economic situation characterized by high instability, volatility, and unpredictable fluctuations",
      date: 3,
      effect: {
        stocks: [
          { type: "tech", rate: 0.85 },
          { type: "oil", rate: 0.7 },
        ],
        gold: 10,
      },
    },
  ]);

  const value = {
    player,
    date,
    global,
    news,
    setPlayer,
    setDate,
    setGlobal,
    setNews,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
