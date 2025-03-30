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
import DaySummary from "@/components/game/DaySummary";
import PortSummary from "@/components/game/PortSummary";
import ProfitSummary from "@/components/game/ProfitSummary";
import ReturnButton from "@/components/game/ReturnButton";
import Toast from "@/components/Toast";

export default function GamePage() {
  const { player, date, global, news, setPlayer, setDate, setGlobal, setNews } =
    useGame();
  const [location, setLocation] = useState<ILocation>({
    id: "home",
    label: "บ้าน",
  });
  const [showInsufficient, setShowInsufficient] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [buyGold, setBuyGold] = useState<number>(0);
  const [sellGold, setSellGold] = useState<number>(0);
  const [showBuyGold, setShowBuyGold] = useState(false);
  const [showSellGold, setShowSellGold] = useState(false);
  const router = useRouter();

  const calculatePlayerAssetValue = (
    assets: IStock[]
  ): Array<{ name: string; result: number }> => {
    return assets.map((stock) => {
      const globalStock = global.stocks.find(
        (globalStock) => globalStock.name === stock.name
      );

      if (globalStock) {
        const playerStockValue = stock.price * stock.amount;
        const globalStockValue = globalStock.price * stock.amount;
        return {
          name: stock.name,
          result: playerStockValue - globalStockValue,
        };
      }

      return { name: stock.name, result: 0 };
    });
  };
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

  useEffect(() => {
    if (date === 10) router.push("/end");
  }, [date]);
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
    setShowToast(true);
  };
  const handleBuyGold = () => {
    console.log(player);

    const buyGoldPrice = global.buyGoldPrice;
    const totalCost = buyGold * buyGoldPrice;

    if (player.assets.bank < totalCost) {
      setShowInsufficient(true);
      return;
    }

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      assets: {
        ...prevPlayer.assets,
        bank: prevPlayer.assets.bank - totalCost, //deduct from bank
        gold: prevPlayer.assets?.gold || 0,
      },
    }));

    console.log(player);
    setShowToast(true);
  };

  const handleSellGold = () => {
    //sell gold
    console.log(player);
    const sellGoldPrice = global.sellGoldPrice;
    const totalCost = sellGold * sellGoldPrice;
    const goldToSell = player.assets.gold;

    if (goldToSell < sellGold) {
      setShowInsufficient(true);
      return;
    }
    if (goldToSell) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        balance: prevPlayer.balance + totalCost,
        assets: {
          ...prevPlayer.assets,
          gold: prevPlayer.assets.gold - sellGold,
        },
      }));
    }
    setShowToast(true);
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
    setShowToast(true);
  };

  const handleBuyStock = (amount: number, stockName: string) => {
    const stock = global.stocks?.find((s) => s.name === stockName);
    if (!stock) return;

    const totalCost = amount * stock.price;
    if (player.balance < totalCost) {
      setShowInsufficient(true);
      return;
    }

    const existingStockIndex = player.assets.stocks?.findIndex(
      (s) => s.name === stockName
    );

    let updatedStocks = [...(player.assets.stocks || [])];

    if (existingStockIndex !== -1 && player.assets.stocks) {
      // Stock exists, update amount and calculate new average price
      const existingStock = updatedStocks[existingStockIndex];
      const newAmount = existingStock.amount + amount;
      const newAveragePrice =
        (existingStock.price * existingStock.amount + stock.price * amount) /
        newAmount;

      updatedStocks[existingStockIndex] = {
        ...existingStock,
        amount: newAmount,
        price: newAveragePrice,
      };
    } else {
      // New stock, add it to the list
      updatedStocks.push({
        name: stockName,
        type: stock.type,
        price: stock.price,
        amount,
      });
    }

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      balance: prevPlayer.balance - totalCost,
      assets: {
        ...prevPlayer.assets,
        stocks: updatedStocks,
      },
    }));

    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      stocks: prevGlobal.stocks?.map((s) =>
        s.name === stockName ? { ...s, amount: s.amount - amount } : s
      ),
    }));
    setShowToast(true);
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
    setShowToast(true);
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
            <Phone news={news} />
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
          <ReturnButton
            returnLocation={LOCATION[5]}
            setLocation={setLocation}
          />

          {showBuyGold && (
            <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {showToast && (
                  <Toast message={"ทำรายการสำเร็จ"} duration={2000} />
                )}
                <h2 className="text-2xl mb-4">ซื้อทอง</h2>
                <input
                  type="number"
                  value={buyGold}
                  onChange={(e) => setBuyGold(Number(e.target.value))}
                  className="p-2 mb-4 w-full border rounded"
                  placeholder="Amount to buy"
                />
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        handleBuyGold();
                        setBuyGold(0);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => {
                        setShowInsufficient(false);
                        setShowBuyGold(false);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                  {showInsufficient && (
                    <span className="text-red-500 text-center">
                      เงินไม่เพียงพอในการซื้อทอง
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {showSellGold && (
            <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {showToast && (
                  <Toast message={"ทำรายการสำเร็จ"} duration={2000} />
                )}
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
                    onClick={() => {
                      handleSellGold();
                      setSellGold(0);
                    }}
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
                  {showInsufficient && (
                    <span className="text-red-500 text-center">ทองไม่พอ!!</span>
                  )}
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
            date={date}
            balance={player.balance}
            assests={player.assets}
          />
          <button
            className="btn text-xl rounded-md"
            onClick={() => setLocation(LOCATION[6])}
          >
            Next
          </button>
        </div>
      )}

      {location.id === "port" && (
        <div className="flex flex-col gap-8">
          <PortSummary
            date={date}
            balance={player.balance}
            assests={player.assets}
          />
          <button
            className="btn text-xl rounded-md"
            onClick={() => setLocation(LOCATION[7])}
          >
            Next
          </button>
        </div>
      )}

      {location.id === "profit_summary" && (
        <div className="flex flex-col gap-8">
          <ProfitSummary principal={player.balance} balance={player.balance} />
          <button
            className="btn text-xl rounded-md"
            onClick={() => setLocation(LOCATION[0])}
          >
            Next
          </button>
        </div>
      )}

      {location.id === "bank" && (
        <Bank
          showToast={showToast}
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
          showToast={showToast}
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
