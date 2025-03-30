"use client";

import { useGame } from "@/contexts/GameContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Phone from "@/components/game/Phone";
import CurrentSummary from "@/components/game/CurrentSummary";
import OptionBox from "@/components/game/OptionBox";
import Bank from "@/components/game/Bank";
import { ILocation, IStock, LOCATION } from "@/Model/game";
import Stock from "@/components/game/Stock";

export default function GamePage() {
  const { player, date, global, news, setPlayer, setDate, setGlobal, setNews } =
    useGame();
  const [location, setLocation] = useState<ILocation>({
    id: "home",
    label: "บ้าน",
  });
  const [showInsufficient, setShowInsufficient] = useState(false);

  const [energy, setEnergy] = useState<number>(1);
  const [showNews, setShowNews] = useState<boolean>(false);
  useEffect(() => {}, [date]);
  const router = useRouter();

  const handleBankDeposit = (deposit: number) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      balance: prevPlayer.balance - deposit,
      assets: {
        ...prevPlayer.assets, // Ensure assets exist
        bank: (prevPlayer.assets?.bank || 0) + deposit,
      },
    }));
  };
  const handleBonds = (amount: number, bondName: string) => {
    const bond = global.bonds?.find((b) => b.name === bondName);
    if (!bond) return "Bond not found";

    const totalCost = amount * bond.price;
    if (player.balance < totalCost) {
      setShowInsufficient(true);
      return "Insufficient funds";
    }

    const updateAssets = (updatedBonds: IStock[]) => {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        balance: prevPlayer.balance - totalCost,
        assets: {
          ...prevPlayer.assets,
          bonds: updatedBonds,
        },
      }));
    };

    const updatedBonds = player.assets.bonds?.map((existingBond) =>
      existingBond.name === bondName
        ? { ...existingBond, amount: existingBond.amount + amount }
        : existingBond
    );

    if (updatedBonds?.some((b) => b.name === bondName)) {
      updateAssets(updatedBonds);
    } else {
      updateAssets([
        ...(player.assets.bonds || []),
        { name: bondName, type: bond.type, price: bond.price, amount },
      ]);
    }

    // Update global state
    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      bonds: prevGlobal.bonds?.map((b) =>
        b.name === bondName ? { ...b, amount: b.amount - amount } : b
      ),
    }));
  };

  const handleDebtInstruments = (amount: number, debtName: string) => {
    const debt = global.debtInstruments?.find((d) => d.name === debtName);
    if (!debt) return "Debt not found";
    const totalCost = amount * debt.price;
    if (player.balance < totalCost) {
      setShowInsufficient(true);
      return "Insufficient funds";
    }

    const updateAssets = (updatedDebts: IStock[]) => {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        balance: prevPlayer.balance - totalCost,
        assets: {
          ...prevPlayer.assets,
          bank: prevPlayer.assets.bank - totalCost,
          debtInstruments: updatedDebts,
        },
      }));
    };

    const updatedDebts = player.assets.debtInstruments?.map((existingDebt) =>
      existingDebt.name === debtName
        ? { ...existingDebt, amount: existingDebt.amount + amount }
        : existingDebt
    );

    if (updatedDebts?.some((d) => d.name === debtName)) {
      updateAssets(updatedDebts);
    } else {
      updateAssets([
        ...(player.assets.debtInstruments || []),
        { name: debtName, type: debt.type, price: debt.price, amount },
      ]);
    }
    // Update global state
    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      debtInstruments: prevGlobal.debtInstruments?.map((d) =>
        d.name === debtName ? { ...d, amount: d.amount - amount } : d
      ),
    }));
  };

  const handleBuyStock = (amount: number, stockName: string) => {
    const stock = global.stocks?.find((s) => s.name === stockName);
    if (!stock) return;

    const totalCost = amount * stock.price;
    if (player.balance < totalCost) {
      setShowInsufficient(true);
      return;
    }

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      balance: prevPlayer.balance - totalCost,
      assets: {
        ...prevPlayer.assets,
        stocks: [
          ...(prevPlayer.assets.stocks || []),
          { name: stockName, type: stock.type, price: stock.price, amount },
        ],
      },
    }));

    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      stocks: prevGlobal.stocks?.map((s) =>
        s.name === stockName ? { ...s, amount: s.amount - amount } : s
      ),
    }));
  };

  const handleSellStock = (amount: number, stockName: string) => {
    const stockIndex = player.assets.stocks?.findIndex(
      (s) => s.name === stockName
    );
    if (stockIndex === -1 || !player.assets.stocks) return;

    const stock = player.assets.stocks[stockIndex];
    if (stock.amount < amount) return;

    const updatedStocks = [...player.assets.stocks];
    updatedStocks[stockIndex] = {
      ...stock,
      amount: stock.amount - amount,
    };
    if (updatedStocks[stockIndex].amount === 0)
      updatedStocks.splice(stockIndex, 1);

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      balance: prevPlayer.balance + amount * stock.price,
      assets: {
        ...prevPlayer.assets,
        stocks: updatedStocks,
      },
    }));

    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      stocks: prevGlobal.stocks?.map((s) =>
        s.name === stockName ? { ...s, amount: s.amount + amount } : s
      ),
    }));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden -z-10">
      <div
        className={`absolute top-0 ${
          location.id === "home" ? "text-black" : "text-white"
        } text-3xl z-40`}
      >
        <p>Day {date}</p>
      </div>
      {location.id === "home" && (
        <>
          <Image
            src={"/bg.png"}
            alt="Desk"
            width={1920}
            height={1080}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="group z-10 mt-20 flex flex-col items-center gap-8">
            <Phone setShowNews={setShowNews} news={news} />
            <Image
              src={"/wallet.png"}
              alt="Wallet"
              width={75}
              height={100}
              className="transition-all duration-300 ease-in-out transform group-hover:shadow-2xl group-hover:scale-110 cursor-pointer"
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
            assets={player.assets}
          />
          {LOCATION.slice(2).map((l, index) => (
            <OptionBox
              key={l.id}
              onClick={() => {
                setLocation(LOCATION[index + 2]);
              }}
            >
              {l.label}
            </OptionBox>
          ))}
        </div>
      )}
      {location.id === "bank" && (
        <Bank
          showInsufficient={showInsufficient}
          setShowInsufficient={setShowInsufficient}
          setLocation={setLocation}
          handleBankDeposit={handleBankDeposit}
          handleBonds={handleBonds}
          handleDebtInstruments={handleDebtInstruments}
        />
      )}
      {location.id === "stock_market" && (
        <Stock
          showInsufficient={showInsufficient}
          setShowInsufficient={setShowInsufficient}
          setLocation={setLocation}
          handleBuyStock={handleBuyStock}
          handleSellStock={handleSellStock}
        />
      )}
    </div>
  );
}
