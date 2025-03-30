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
      { name: "TTP", type: "energy", price: 300, amount: 3000 },
      { name: "GOOGIE", type: "healthcare", price: 500, amount: 3000 },
      { name: "FLY", type: "travel", price: 1000, amount: 2000 },
      { name: "SE", type: "energy", price: 20, amount: 300000 },
    ],
    buyGoldPrice: 20000,
    sellGoldPrice: 19000,
    interestRate: 0.5,
    bonds: [
      { name: "GovBond", type: "bond", price: 1000, amount: 1500 }, // Bond example
    ],
    debtInstruments: [
      { name: "ThDebt", type: "debt", price: 500, amount: 2000 }, // Debt instrument example
      { name: "EDebt", type: "debt", price: 1000, amount: 2000 }, // Debt instrument example
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
          { type: "energy", rate: 0.7 },
        ],
        gold: 10,
      },
    },
    {
      topic: "WW_II",
      description:
        "The Second World War led to significant economic instability, causing widespread volatility in global markets. During this period, stock markets fluctuated drastically, particularly affecting the tech and oil industries, while the demand for gold surged as investors sought a safe haven during the chaos.",
      date: 5,
      effect: {
        stocks: [
          { type: "tech", rate: 0.45 },
          { type: "energy", rate: 0.3 },
          { type: "health", rate: 1.1 },
        ],
        gold: 10,
      },
    },
    {
      topic: "COVID-19 Pandemic",
      description:
        "The COVID-19 pandemic caused a global economic downturn as governments imposed lockdowns and travel restrictions, leading to disruptions in global supply chains, mass unemployment, and a decline in consumer spending. Stock markets initially plunged, but certain sectors like tech and healthcare rebounded quickly. Gold saw a spike as investors sought safe havens in uncertain times.",
      date: 5, // Adjust as needed
      effect: {
        stocks: [
          { type: "tech", rate: 1.5 },
          { type: "travel", rate: 0.3 }, // Travel and leisure stocks plummeted by 70% due to travel restrictions and lockdowns
          { type: "healthcare", rate: 1.2 }, // Healthcare stocks surged by 20% due to the high demand for medical supplies and services
        ],
        gold: 40,
      },
    },
    {
      topic: "Economic Recovery Post-Crisis",
      description:
        "After the global financial crisis, economies began recovering as governments implemented stimulus packages, industries re-opened, and consumer confidence grew. The stock market showed strong recovery, and economic growth resumed. However, gold prices dropped as investors moved back to riskier assets, capitalizing on the recovery and avoiding safe-haven investments like gold.",
      date: 8, // Adjust as needed
      effect: {
        stocks: [
          { type: "tech", rate: 1.2 }, // Tech stocks grew by 20% as demand for innovation in industries and tech services surged
          { type: "energy", rate: 1.1 }, // Energy stocks rose by 10% as oil prices rebounded and industries resumed operations
        ],
        gold: -20, // Gold prices dropped by 20% as investors shifted their investments to riskier assets and away from safe-haven assets
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
