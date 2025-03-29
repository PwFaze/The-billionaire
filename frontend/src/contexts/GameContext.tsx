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
  };
  news: INews[];
  setPlayer: React.Dispatch<React.SetStateAction<IPlayer>>;
  setDate: React.Dispatch<React.SetStateAction<number>>;
  setGlobal: React.Dispatch<
    React.SetStateAction<{
      stocks: IStock[];
      goldPrice: number;
      interestRate: number;
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
  const [player, setPlayer] = useState<IPlayer>({} as IPlayer);
  const [date, setDate] = useState<number>(0);
  const [global, setGlobal] = useState<{
    stocks: IStock[];
    goldPrice: number;
    interestRate: number;
  }>({
    stocks: [],
    goldPrice: 0,
    interestRate: 0,
  });
  const [news, setNews] = useState<INews[]>([]);

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
