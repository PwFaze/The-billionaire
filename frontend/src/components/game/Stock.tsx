import { useState } from "react";
import OptionBox from "./OptionBox";
import { useGame } from "@/contexts/GameContext";
import CurrentSummary from "./CurrentSummary";
import ReturnButton from "./ReturnButton";
import { ILocation, LOCATION } from "@/Model/game";
import Toast from "../Toast";

interface StockProps {
  showToast: boolean;
  showInsufficient: boolean;
  setShowInsufficient: (status: boolean) => void;
  setLocation: (location: ILocation) => void;
  handleBuyStock: (amount: number, stockName: string) => void;
  handleSellStock: (amount: number, stockName: string) => void;
}

export default function Stock({
  showToast,
  showInsufficient,
  setShowInsufficient,
  setLocation,
  handleBuyStock,
  handleSellStock,
}: StockProps) {
  const game = useGame();
  const [showBuy, setShowBuy] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [stockAmounts, setStockAmounts] = useState<{ [key: string]: number }>(
    {}
  );

  const handleStockAmountChange = (stockName: string, amount: number) => {
    setStockAmounts((prev) => ({
      ...prev,
      [stockName]: amount,
    }));
  };
  console.log(game.player);
  return (
    <div className="flex flex-col items-center text-black relative gap-8">
      <CurrentSummary
        balance={game.player.balance}
        assets={game.player.assets}
      />
      <OptionBox onClick={() => setShowBuy(true)}>ซื้อหุ้น</OptionBox>
      <OptionBox onClick={() => setShowSell(true)}>ขายหุ้น</OptionBox>

      {/* Buy Stock Modal */}
      {showBuy && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {showToast && <Toast message={"ทำรายการสำเร็จ"} duration={2000} />}

            <h2 className="text-2xl mb-4">ซื้อหุ้น</h2>
            <div className="space-y-4 mb-4">
              {game.global.stocks?.map((stock) => (
                <div key={stock.name + "owned"} className="border-b py-2">
                  <p className="font-medium">{stock.name}</p>
                  <p>Price: {stock.price}</p>
                  <input
                    type="number"
                    min={0}
                    value={stockAmounts[stock.name] || 0}
                    onChange={(e) =>
                      handleStockAmountChange(
                        stock.name,
                        Number(e.target.value)
                      )
                    }
                    className="p-2 mb-4 w-full border rounded"
                    placeholder="Amount to buy"
                  />
                  <button
                    onClick={() =>
                      handleBuyStock(stockAmounts[stock.name] || 0, stock.name)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Buy {stock.name}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              {showInsufficient && (
                <span className="text-red-500">เงินสดของคุณไม่พอ!!</span>
              )}
              <button
                onClick={() => {
                  setShowInsufficient(false);
                  setShowBuy(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sell Stock Modal */}
      {showSell && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">ขายหุ้น</h2>
            <div className="space-y-4 mb-4">
              {game.player.assets.stocks?.map((stock) => (
                <div key={stock.name} className="border-b py-2">
                  <p className="font-medium">{stock.name}</p>
                  <p>Owned: {stock.name}</p>
                  <p>Current Price: {stock.price}</p>
                  <p>You have : {stock.amount} stocks</p>
                  <input
                    type="number"
                    min={0}
                    max={stock.amount}
                    value={stockAmounts[stock.name] || 0}
                    onChange={(e) =>
                      handleStockAmountChange(
                        stock.name,
                        Number(e.target.value)
                      )
                    }
                    className="p-2 mb-4 w-full border rounded"
                    placeholder="Amount to sell"
                  />
                  <button
                    onClick={() =>
                      handleSellStock(stockAmounts[stock.name] || 0, stock.name)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Sell {stock.name}
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowSell(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ReturnButton returnLocation={LOCATION[5]} setLocation={setLocation} />
    </div>
  );
}
