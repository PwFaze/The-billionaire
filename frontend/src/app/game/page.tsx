"use client";

import OptionBox from "@/components/game/OptionBox";
import ProfitSummary from "@/components/game/ProfitSummary";
import { useGame } from "@/contexts/GameContext";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

export default function GamePage() {
  const { player, date, global, news, setPlayer, setDate, setGlobal, setNews } = useGame();
  const [location, setLocation] = useState<"bank" | "stock" | "gold" | "">("");
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

  return(
  
      <div className="w-full h-screen overflow-hidden -z-10">
        <Image
          src={"/bg_desk.png"}
          alt="Desk"
          width={1920}
          height={1080}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {showNews && (
          <div className="absolute top-1/8 left-1/10 bg-white p-4 rounded-xl w-4/5 h-fit border-2 border-gray-300 shadow-lg z-10">
            <h2 className="text-xl text-black font-bold mb-2">News</h2>
            <p className="text-gray-700 mb-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Tenetur, delectus sed excepturi nulla laudantium non dicta omnis error reprehenderit neque 
              eligendi mollitia similique impedit quam, consequatur, sit quis perspiciatis minus.
            </p>
            <button
              onClick={() => setShowNews(false)}
              className="ml-54 bg-purple-800 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}

        <div className="absolute top-1/2 left-1/3 group">
          
            <Image
              src={"/computer.png"}
              alt="Game"
              width={175}
              height={100}
              className="transition duration-300 ease-in-out group-hover:shadow-2xl group-hover:scale-105"
            />
            <button 
              className="absolute top-1/3 left-1/3 text-black text-xl font-bold text-center cursor-pointer"
              onClick={() => setShowNews(true)}
            >
              Click
            </button>
          
        </div>

        <div className="absolute top-3/5 left-3/4 group">
          <Image
            src={"/wallet.png"}
            alt="Wallet"
            width={75}
            height={100}
            className="transition duration-300 ease-in-out group-hover:shadow-2xl group-hover:scale-105"
            // onClick={() => router.push("/")}
          />
        </div>

      </div>
    
  );
}}
