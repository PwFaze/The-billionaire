export interface IPlayer {
  id: string;
  name: string;
  balance: number;
  assets: {
    stocks: IStock[];
    bank: number;
    gold: number;
  };
}
export interface IStock {
  ticker: string;
  type: string;
  price: number;
  amount: number;
}

export interface INews {
  topic: string;
  description: string;
  date: number;
  effect: {
    stocks: {
      type: string;
      rate: number;
    }[];
    gold: number;
  };
}
