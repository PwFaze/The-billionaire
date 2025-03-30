"use client";
import { useGame } from "@/contexts/GameContext";
import { IAssets } from "@/Model/game";

interface PortSummaryProps {
  date: number;
  balance: number;
  assests: IAssets;
}

export default function PortSummary({
  date,
  balance,
  assests,
}: PortSummaryProps) {
  const game = useGame();

  return (
    <div className="bg-white rounded-4xl text-center flex flex-col items-center justify-center text-black w-auto max-w-96 px-8 py-6 gap-4">
      <h1 className="text-4xl font-extrabold">พอร์ต</h1>
      <div className="bg-white ring-4 text-black p-8 ring-purple-300 gap-6">
        {/* Stocks */}
        <div className="flex flex-col gap-4">
          {assests.stocks.map((s) => {
            const globalStock = game.global.stocks.find(
              (globalStock) => globalStock.name === s.name
            );
            const priceDifference = globalStock
              ? ((s.price - globalStock.price) / globalStock.price) * 100
              : 0;

            return (
              <div
                key={s.name}
                className="font-extralight text-xl flex justify-between items-center w-full"
              >
                <h2 className="flex-1 text-left">
                  ชื่อ: {s.name} | ราคาปัจจุบัน: {globalStock?.price ?? s.price}
                </h2>
                <h2
                  className={`flex-shrink-0 ${
                    priceDifference > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  การเติบโต: {priceDifference.toFixed(2)}%
                </h2>
              </div>
            );
          })}
        </div>

        {/* Bonds */}
        <div className="flex flex-col gap-4">
          {assests.bonds.map((s) => {
            const globalBond = game.global.stocks.find(
              (globalStock) => globalStock.name === s.name
            );
            const priceDifference = globalBond
              ? ((s.price - globalBond.price) / globalBond.price) * 100
              : 0;

            return (
              <div
                key={s.name}
                className="font-extralight text-xl flex justify-between items-center w-full"
              >
                <h2 className="flex-1 text-left">
                  ชื่อ: {s.name} | ราคาปัจจุบัน: {globalBond?.price ?? s.price}
                </h2>
                <h2
                  className={`flex-shrink-0 ${
                    priceDifference > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  การเติบโต: {priceDifference.toFixed(2)}%
                </h2>
              </div>
            );
          })}
        </div>

        {/* Debt Instruments */}
        <div className="flex flex-col gap-4">
          {assests.debtInstruments.map((s) => {
            const globalDebtInstrument = game.global.stocks.find(
              (globalStock) => globalStock.name === s.name
            );
            const priceDifference = globalDebtInstrument
              ? ((s.price - globalDebtInstrument.price) /
                  globalDebtInstrument.price) *
                100
              : 0;

            return (
              <div
                key={s.name}
                className="font-extralight text-xl flex justify-between items-center w-full"
              >
                <h2 className="flex-1 text-left">
                  ชื่อ: {s.name} | ราคาปัจจุบัน:{" "}
                  {globalDebtInstrument?.price ?? s.price}
                </h2>
                <h2
                  className={`flex-shrink-0 ${
                    priceDifference > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  การเติบโต: {priceDifference.toFixed(2)}%
                </h2>
              </div>
            );
          })}
        </div>

        <div className="font-extralight text-xl flex justify-between items-center w-full gap-4">
          <h2 className="flex-1 text-left">ราคาทอง</h2>
          <h2 className="text-green-500">{game.global.buyGoldPrice}</h2>
        </div>
        <div className="font-extralight text-xl flex justify-between items-center w-full gap-4">
          <h4 className="flex-1 text-left">อัตราดอกเบี้ยเงินฝาก</h4>
          <h2 className="text-green-500">{game.global.interestRate}%</h2>
        </div>
      </div>
    </div>
  );
}
