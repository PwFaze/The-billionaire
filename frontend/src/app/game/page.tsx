"use client";

import { useGame } from "@/contexts/GameContext";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Phone from "@/components/game/Phone";
import CurrentSummary from "@/components/game/CurrentSummary";
import OptionBox from "@/components/game/OptionBox";
import { set } from "react-hook-form";
import { g } from "motion/react-client";
import DaySummary from "@/components/game/DaySummary";
import PortSummary from "@/components/game/PortSummary";
import ProfitSummary from "@/components/game/ProfitSummary";


export default function GamePage() {
  const [location, setLocation] = useState<{ id: string; label: string }>({
    id: "home",
    label: "บ้าน",
  });

  const LOCATION = [
    { id: "home", label: "บ้าน" },
    { id: "deciding", label: "รอตัดสินใจ" },
    { id: "bank", label: "ธนาคาร" },
    { id: "stock_market", label: "ตลาดหลักทรัพย์" },
    { id: "gold_shop", label: "ร้านทอง" },
    { id: "daily_report", label: "สรุปประจำวัน"},
    { id: "port", label: "พอร์ต"},
    { id: "profit_summary", label: "สรุปกำไร"},
  ];
  const { player, date, global, news, setPlayer, setDate, setGlobal, setNews } = useGame();
  const [energy, setEnergy] = useState<number>(2);
  const [showNews, setShowNews] = useState<boolean>(false);
  const [deposit, setDeposit] = useState<number>(0);
  const [bonds, setBonds] = useState<number>(0);
  const [debtInstruments, setDebtInstruments] = useState<number>(0);
  const [action, setAction] = useState<string>("");
  const [stockType, setStockType] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [buyGold, setBuyGold] = useState<number>(0);
  const [sellGold, setSellGold] = useState<number>(0);
  const [showBuyGold, setShowBuyGold] = useState(false);
  const [showSellGold, setShowSellGold] = useState(false);

  const router = useRouter();

  // const handleGame = () => {
  //   if(location.id === "bank"){
  //     if(action === "deposit"){ //deposit money into bank
  //       if(deposit <= 0) return "Please enter a valid amount to deposit";
  //       setPlayer((prevPlayer) => ({
  //         ...prevPlayer,
  //         assets: {
  //           ...prevPlayer.assets, // Ensure assets exist
  //           bank: (prevPlayer.assets?.bank || 0) + deposit,
  //         },
  //       }));
  //     } else if(action === "bonds"){ //invested in bonds (long-term investment)
  //       if(bonds <= 0) return "Please enter a valid amount to invest in bonds";
  //       const bondPrice = 200;
  //       const totalCost = bonds * bondPrice;

  //       if (player.assets.bank < totalCost) {
  //         return "Insufficient funds in the bank";
  //       }

  //       setPlayer((prevPlayer) => ({
  //         ...prevPlayer,
  //         assets: {
  //           ...prevPlayer.assets,
  //           bank: prevPlayer.assets.bank - totalCost, //deduct from bank
  //           bonds: [
  //             ...(prevPlayer.assets.bonds || []), // Ensure bonds exist
  //             {
  //               name: "BOND",
  //               type: "Government Bond",
  //               price: bondPrice,
  //               amount: bonds,
  //             },
  //           ]
  //         },
  //       }));
        
  //     } else if(action === "debt_instruments"){ //invested in debt instruments (short-term investment)
  //       if(debtInstruments <= 0) return "Please enter a valid amount to invest in debt instruments";
  //       const debtPrice = 200;
  //       const totalCost = debtInstruments * debtPrice;

  //       if (player.assets.bank < totalCost) {
  //         return "Insufficient funds in the bank";
  //       }
        
  //       setPlayer((prevPlayer) => ({
  //         ...prevPlayer,
  //         assets: {
  //           ...prevPlayer.assets,
  //           bank: prevPlayer.assets.bank - totalCost, //deduct from bank
  //           dept_instruments: [
  //             ...(prevPlayer.assets.dept_instruments || []), // Ensure dept_instruments exist
  //             {
  //               name: "DEBT",
  //               type: "Debt Instrument",
  //               price: debtPrice,
  //               amount: debtInstruments,
  //             },
  //           ]
  //         },
  //       }));

  //     } else {
  //       return "Please select an action";
  //     }

  //   } else if (location.id === "stock"){

  //     if(stockType.length !== 0){
  //       if(action === "buy"){
  //         //buy stock
  //         const buyStockPrice = 55;
  //         const totalCost = stock * buyStockPrice;

  //         if (player.assets.bank < totalCost) {
  //           return "Insufficient funds in the bank";
  //         }

  //         setPlayer((prevPlayer) => ({
  //           ...prevPlayer,
  //           assets: {
  //             ...prevPlayer.assets,
  //             bank: prevPlayer.assets.bank - totalCost, //deduct from bank
  //             stocks: [
  //               ...(prevPlayer.assets.stocks || []), // Ensure stocks exist
  //               {
  //                 name: "INT",
  //                 type: stockType,
  //                 price: buyStockPrice,
  //                 amount: stock,
  //               },
  //             ]
  //           },
  //         }));

  //       } else if(action === "sell"){
  //         //sell stock
  //         const sellStockPrice = 50;
  //         const totalCost = stock * sellStockPrice;
  //         const stockToSell = player.assets.stocks.find((s) => s.name === stockType);

  //         if (!stockToSell || stockToSell.amount < stock) {
  //           return "Insufficient stocks to sell";
  //         }
  //         if (stockToSell) {
  //           const updatedStocks = player.assets.stocks.map((s) => {
  //             if (s.name === stockType) {
  //               return { ...s, amount: s.amount - stock };
  //             }
  //             return s;
  //           }).filter((s) => s.amount > 0); // Remove stocks with zero amount

  //           setPlayer((prevPlayer) => ({
  //             ...prevPlayer,
  //             assets: {
  //               ...prevPlayer.assets,
  //               bank: prevPlayer.assets.bank + totalCost, //add to bank
  //               stocks: updatedStocks,
  //             },
  //           }));
  //       } else {
  //         return "P5lease select a stock type";
  //       }
  //   } else{ //location = gold
  //     if(action === "buy"){
  //       //buy gold
  //       const buyGoldPrice = global.buyGoldPrice;
  //       const totalCost = gold * buyGoldPrice;

  //       if (player.assets.bank < totalCost) {
  //         return "Insufficient funds in the bank";
  //       }

  //       setPlayer((prevPlayer) => ({
  //         ...prevPlayer,
  //         assets: {
  //           ...prevPlayer.assets,
  //           bank: prevPlayer.assets.bank - totalCost, //deduct from bank
  //           gold: (prevPlayer.assets?.gold || 0) + stock,
  //         },
  //     }));

  //     } else if(action === "sell"){
  //       //sell gold
  //       const sellGoldPrice = global.sellGoldPrice;
  //       const totalCost = gold * sellGoldPrice;
  //       const goldToSell = player.assets.gold;
        
  //       if (goldToSell < gold) {
  //         return "Insufficient gold to sell";
  //       }
  //       if (goldToSell) {
  //         setPlayer((prevPlayer) => ({
  //           ...prevPlayer,
  //           assets: {
  //             ...prevPlayer.assets,
  //             bank: prevPlayer.assets.bank + totalCost, //add to bank
  //             gold: prevPlayer.assets.gold - gold,
  //           },
  //         }));
  //       }
  //     } else {
  //       return "Please select an action";
  //     }

  //   }
  //   }
  // }
  // }

  const handleBuyGold = () => {

      console.log(player)
    
      const buyGoldPrice = global.buyGoldPrice;
      const totalCost = buyGold * buyGoldPrice;

      if (player.assets.bank < totalCost) {
        return alert("Insufficient funds in the bank");
      }

      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        assets: {
          ...prevPlayer.assets,
          bank: prevPlayer.assets.bank - totalCost, //deduct from bank
          gold: (prevPlayer.assets?.gold || 0) + stock,
        },
      }));

      console.log(player);
  }

  const handleSellGold = () => {
      //sell gold
      const sellGoldPrice = global.sellGoldPrice;
      const totalCost = sellGold * sellGoldPrice;
      const goldToSell = player.assets.gold;
      
      if (goldToSell < sellGold) {
        return alert("Insufficient gold to sell");
      }
      if (goldToSell) {
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          assets: {
            ...prevPlayer.assets,
            bank: prevPlayer.assets.bank + totalCost, //add to bank
            gold: prevPlayer.assets.gold - sellGold,
          },
        }));
      }
      
  }



  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden -z-10">
      {location.id === "home" && (
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
              onClick={() => setLocation(LOCATION[1])}
            />
          </div>
        </>
      )}
      {location.id === "deciding" && (
        <div className="flex flex-col gap-8">
          <CurrentSummary
            date={date}
            balance={player.balance}
            assests={player.assets}
          />
          {LOCATION.slice(0, 5).map((l) => (
            <OptionBox key={l.id} onClick={() => setLocation(l)}>
              {l.label}
            </OptionBox>
          ))}
        </div>
      )}

      {location.id === "gold_shop" && (
        <div className="flex flex-col items-center justify-center text-black w-auto max-w-96 px-8 py-4 gap-16">
          <OptionBox
            onClick={() => {
              setShowBuyGold(true); // Show buy gold modal
            }}
          >
            {`ซื้อทอง บาทละ ${global.buyGoldPrice} บาท`}
          </OptionBox>
          <OptionBox
            onClick={() => {
              setShowSellGold(true); // Show sell gold modal
            }}
          >
            {`ขายทอง บาทละ ${global.sellGoldPrice} บาท`}
          </OptionBox>

          {showBuyGold && (
            <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl mb-4">ซื้อทอง</h2>
                <input
                  type="number"
                  value={buyGold}
                  onChange={(e) => setBuyGold(Number(e.target.value))}
                  className="p-2 mb-4 w-full border rounded"
                  placeholder="Amount to buy"
                />
                <div className="flex justify-between">
                  <button
                    onClick={() => { handleBuyGold(); setLocation(LOCATION[1]); setShowBuyGold(false); setBuyGold(0); }} 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setShowBuyGold(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showSellGold && (
              <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-2xl mb-4">ขายทอง</h2>
                  <input
                    type="number"
                    value={sellGold}
                    onChange={(e) => setSellGold(Number(e.target.value))}
                    className="p-2 mb-4 w-full border rounded"
                    placeholder="Amount to sell"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => {handleSellGold; setLocation(LOCATION[5]); setShowSellGold(false); setSellGold(0); }}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Sell
                    </button>
                    <button
                      onClick={() => setShowSellGold(false)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          <Image
            src={"/gold_shop.png"}
            alt="Gold Shop"
            width={200}
            height={100}
            className="mt-20"
          />
        </div>
      )} 

      {location.id === "daily_report" && (
        <div className="flex flex-col gap-8">
          <DaySummary 
            date = {date}
            balance = {player.balance}
            assests = {player.assets}
          />
          <button className="btn text-xl rounded-md" onClick={() => setLocation(LOCATION[6])}>Next</button>
        </div>
      )}

      {location.id === "port" && (
        <div className="flex flex-col gap-8">
          <PortSummary
            date = {date}
            balance = {player.balance}
            assests = {player.assets}
          />
          <button className="btn text-xl rounded-md" onClick={() => setLocation(LOCATION[7])}>Next</button>
        </div>
      )}

      {location.id === "profit_summary" && (
        <div className="flex flex-col gap-8">
          <ProfitSummary
            principal = {player.balance}
            balance = {player.balance}
          />
          <button className="btn text-xl rounded-md" onClick={() => setLocation(LOCATION[0])}>Next</button>
          
        </div>
      )}

    </div>
  );
}
