import { INews, IPlayer, IStock } from "@/Model/game";
import { createContext, useContext } from "react";

interface IGameContext {
  player: IPlayer;
  date: number;
  global: {
    stocks: IStock[];
    goldPrice: number;
    interestRate: number;
  };
  news: INews[];
}

const GameContext = createContext<IGameContext>({} as IGameContext);

export const useGame = () => useContext(GameContext);
