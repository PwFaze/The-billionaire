export const LOCATION: Array<ILocation> = [
  { id: "home", label: "บ้าน" },
  { id: "deciding", label: "รอตัดสินใจ" },
  { id: "bank", label: "ธนาคาร" },
  { id: "stock_market", label: "ตลาดหลักทรัพย์" },
  { id: "gold_shop", label: "ร้านทอง" },
];
export interface IPlayer {
  id: string;
  name: string;
  balance: number;
  assets: IAssets;
}
export interface IAssets {
  stocks: IStock[];
  bank: number;
  gold: number;
  bonds: IStock[];
  debtInstruments: IStock[];
}
export interface IStock {
  name: string;
  type: string;
  price: number;
  amount: number;
}
export interface ILocation {
  id: string;
  label: string;
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
