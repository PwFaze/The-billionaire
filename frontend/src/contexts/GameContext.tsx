"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { INews, IPlayer, IStock } from "@/Model/game";

interface IGameContext {
  player: IPlayer;
  date: number;
  global: {
    stocks: IStock[];
    goldPrice: number;
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
      goldPrice: number;
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
      stocks: [{ name: "AAPL", type: "tech", price: 150, amount: 10 }],
      bank: 5000,
      gold: 20,
      bonds: [],
      debtInstruments: [],
    },
  });
  const [date, setDate] = useState<number>(1);
  const [global, setGlobal] = useState<{
    stocks: IStock[];
    goldPrice: number;
    interestRate: number;
    bonds: IStock[]; // Bonds structure, same as stocks
    debtInstruments: IStock[]; // Debt instruments structure, same as stocks
  }>({
    stocks: [
      { name: "AAPL", type: "tech", price: 150, amount: 20 },
      { name: "GOOGL", type: "tech", price: 2800, amount: 20 },
    ],
    goldPrice: 20000,
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
