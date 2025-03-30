"use client";
import { useGame } from "@/contexts/GameContext";
import { IAssets, IStock } from "@/Model/game";

interface DailySummaryProps {
  date: number;
  balance: number;
  assests: IAssets;
}

export default function DaySummary({
  date,
  balance,
  assests,
}: DailySummaryProps) {
  const game = useGame();
  const calculateStocks = () => {
    let p = 0;
    let grow = 0;
    assests.stocks.forEach((s) => {
      const gs = game.global.stocks.find(
        (globalStock) => globalStock.name === s.name
      );
      if (gs) {
        p += s.amount * s.price;
        grow += s.amount * (gs.price - s.price);
      }
    });
    return [p, grow];
  };
  const totalProfit =
    balance + calculateStocks()[0] + game.player.assets.bank - 15000;
  return (
    <div className="bg-white rounded-4xl text-center flex flex-col items-center justify-center text-black w-auto max-w-96 px-8 py-4 gap-4">
      <h1 className="text-4xl font-extrabold">สรุปประจำวัน</h1>
      <div className="bg-white ring-4 text-black p-8 ring-purple-300">
        <div className="font-extralight text-2xl flex justify-between w-full">
          <h2>เงินคงเหลือ</h2>
          <h2>{balance} บาท</h2>
        </div>
        <div className="font-extralight text-2xl flex justify-between w-full">
          <h2>มูลค่าพอร์ต</h2>
          <h2>{calculateStocks()[0]} บาท</h2>
        </div>
        <div className="font-extralight text-2xl flex justify-between w-full">
          <h2>โตขึ้น</h2>
          <h2>{calculateStocks()[1]} บาท</h2>
        </div>
        <div className="font-extralight text-2xl flex justify-between w-full">
          <h2>เงินฝาก</h2>
          <h2>{assests.bank} บาท</h2>
        </div>
        <div className="font-extralight text-2xl flex justify-between w-full">
          <h2>ตราสารหนี้</h2>
          <h2>{assests.bonds.length + assests.debtInstruments.length} หน่วย</h2>
        </div>
        <div className="font-extralight text-2xl flex justify-between w-full">
          <h2>ทอง</h2>
          <h2>{assests.gold} บาท</h2>
        </div>
      </div>
      <div className="font-extralight text-2xl flex justify-between w-full">
        <h2>{totalProfit >= 0 ? "กำไร" : "ขาดทุน"}</h2>
        <h2 className="font-bold">
          {balance + calculateStocks()[0] + game.player.assets.bank - 15000}
        </h2>
      </div>
    </div>
  );
}
