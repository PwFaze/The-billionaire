"use client";

import { useGame } from "@/contexts/GameContext";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Phone from "@/components/game/Phone";
import CurrentSummary from "@/components/game/CurrentSummary";
import OptionBox from "@/components/game/OptionBox";
import { set } from "react-hook-form";

export default function GamePage() {
  const { player, date, global, news, setPlayer, setDate, setGlobal, setNews } = useGame();
  const [location, setLocation] = useState<"bank" | "stock" | "gold" | "">("");


export default function GamePage() {
  const LOCATION = [
    { id: "bank", label: "ธนาคาร" },
    { id: "stock_market", label: "ตลาดหลักทรัพย์" },
    { id: "gold_shop", label: "ร้านทอง" },
  ];
  const { player, date, global, news } = useGame();
  const [location, setLocation] = useState<string>("home");
  const [energy, setEnergy] = useState<number>(2);
  const [showNews, setShowNews] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<number>(0);
  const [bonds, setBonds] = useState<number>(0);
  const [debtInstruments, setDebtInstruments] = useState<number>(0);
  const [action, setAction] = useState<string>("");
  const [stockType, setStockType] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [gold, setGold] = useState<number>(0);

  const router = useRouter();

  const handleGame = () => {
    if(location === "bank"){
      if(action === "deposit"){ //deposit money into bank
        if(deposit <= 0) return "Please enter a valid amount to deposit";
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          assets: {
            ...prevPlayer.assets, // Ensure assets exist
            bank: (prevPlayer.assets?.bank || 0) + deposit,
          },
        }));
      } else if(action === "bonds"){ //invested in bonds (long-term investment)
        if(bonds <= 0) return "Please enter a valid amount to invest in bonds";
        const bondPrice = 200;
        const totalCost = bonds * bondPrice;

        if (player.assets.bank < totalCost) {
          return "Insufficient funds in the bank";
        }

        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          assets: {
            ...prevPlayer.assets,
            bank: prevPlayer.assets.bank - totalCost, //deduct from bank
            bonds: [
              ...(prevPlayer.assets.bonds || []), // Ensure bonds exist
              {
                name: "BOND",
                type: "Government Bond",
                price: bondPrice,
                amount: bonds,
              },
            ]
          },
        }));
        
      } else if(action === "debt_instruments"){ //invested in debt instruments (short-term investment)
        if(debtInstruments <= 0) return "Please enter a valid amount to invest in debt instruments";
        const debtPrice = 200;
        const totalCost = debtInstruments * debtPrice;

        if (player.assets.bank < totalCost) {
          return "Insufficient funds in the bank";
        }
        
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          assets: {
            ...prevPlayer.assets,
            bank: prevPlayer.assets.bank - totalCost, //deduct from bank
            dept_instruments: [
              ...(prevPlayer.assets.dept_instruments || []), // Ensure dept_instruments exist
              {
                name: "DEBT",
                type: "Debt Instrument",
                price: debtPrice,
                amount: debtInstruments,
              },
            ]
          },
        }));

      } else {
        return "Please select an action";
      }

    } else if (location === "stock"){

      if(stockType.length !== 0){
        if(action === "buy"){
          //buy stock
          const buyStockPrice = 55;
          const totalCost = stock * buyStockPrice;

          if (player.assets.bank < totalCost) {
            return "Insufficient funds in the bank";
          }

          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            assets: {
              ...prevPlayer.assets,
              bank: prevPlayer.assets.bank - totalCost, //deduct from bank
              stocks: [
                ...(prevPlayer.assets.stocks || []), // Ensure stocks exist
                {
                  name: "INT",
                  type: stockType,
                  price: buyStockPrice,
                  amount: stock,
                },
              ]
            },
          }));

        } else if(action === "sell"){
          //sell stock
          const sellStockPrice = 50;
          const totalCost = stock * sellStockPrice;
          const stockToSell = player.assets.stocks.find((s) => s.name === stockType);

          if (!stockToSell || stockToSell.amount < stock) {
            return "Insufficient stocks to sell";
          }
          if (stockToSell) {
            const updatedStocks = player.assets.stocks.map((s) => {
              if (s.name === stockType) {
                return { ...s, amount: s.amount - stock };
              }
              return s;
            }).filter((s) => s.amount > 0); // Remove stocks with zero amount

            setPlayer((prevPlayer) => ({
              ...prevPlayer,
              assets: {
                ...prevPlayer.assets,
                bank: prevPlayer.assets.bank + totalCost, //add to bank
                stocks: updatedStocks,
              },
            }));
        } else {
          return "P5lease select a stock type";
        }
    } else{ //location = gold
      if(action === "buy"){
        //buy gold
        const buyGoldPrice = 2000;
        const totalCost = gold * buyGoldPrice;

        if (player.assets.bank < totalCost) {
          return "Insufficient funds in the bank";
        }

        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          assets: {
            ...prevPlayer.assets,
            bank: prevPlayer.assets.bank - totalCost, //deduct from bank
            gold: (prevPlayer.assets?.gold || 0) + stock,
          },
      }));

      } else if(action === "sell"){
        //sell gold
        const sellGoldPrice = 1500;
        const totalCost = gold * sellGoldPrice;
        const goldToSell = player.assets.gold;
        
        if (goldToSell < gold) {
          return "Insufficient gold to sell";
        }
        if (goldToSell) {
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            assets: {
              ...prevPlayer.assets,
              bank: prevPlayer.assets.bank + totalCost, //add to bank
              gold: prevPlayer.assets.gold - gold,
            },
          }));
        }
      } else {
        return "Please select an action";
      }

    }
  }
}

  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden -z-10">
      {location === "home" && (
        <>
          <Image
            src={"/bg.png"}
            alt="Desk"
            width={1920}
            height={1080}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="group z-10 mt-20 flex flex-col items-center">
            <Phone setShowNews={setShowNews} news={news} />
            <Image
              src={"/wallet.png"}
              alt="Wallet"
              width={75}
              height={100}
              className="transition duration-300 ease-in-out group-hover:shadow-2xl cursor-pointer group-hover:scale-105"
              onClick={() => setLocation("deciding")}
            />
          </div>
        </>
      )}
      {location === "deciding" && (
        <div className="flex flex-col gap-8">
          <CurrentSummary
            date={date}
            balance={player.balance}
            assests={player.assets}
          />
          {LOCATION.map((l) => (
            <OptionBox key={l.id}>{l.label}</OptionBox>
          ))}
        </div>
      )}
    </div>
  );
}}
