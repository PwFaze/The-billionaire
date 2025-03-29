import { IAssets } from "@/Model/game";

interface CurrentSummaryProps {
  date: number;
  balance: number;
  assests: IAssets;
}

export default function CurrentSummary({
  date,
  balance,
  assests,
}: CurrentSummaryProps) {
  return (
    <div className="bg-white ring-4 text-black p-8 ring-purple-300">
      <div className="font-extralight text-3xl flex justify-between w-full">
        <h2>เงินคงเหลือ</h2>
        <h2>{balance}</h2>
      </div>
      <div className="font-extralight text-3xl flex justify-between w-full">
        <h2>เงินฝาก</h2>
        <h2>{assests.bank}</h2>
      </div>
      <div className="font-extralight text-3xl flex justify-between w-full">
        <h2>ทอง</h2>
        <h2>{assests.gold}</h2>
      </div>
    </div>
  );
}
