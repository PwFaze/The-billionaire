import { IAssets } from "@/Model/game";

interface CurrentSummaryProps {
  balance: number;
  assets: IAssets;
}

export default function CurrentSummary({
  balance,
  assets,
}: CurrentSummaryProps) {
  return (
    <div className="bg-white ring-4 text-black p-8 ring-purple-300">
      <div className="font-extralight text-3xl flex justify-between w-full">
        <h2>เงินคงเหลือ</h2>
        <h2>{balance}</h2>
      </div>
      <div className="font-extralight text-3xl flex justify-between w-full">
        <h2>เงินฝาก</h2>
        <h2>{assets.bank}</h2>
      </div>
      <div className="font-extralight text-3xl flex justify-between w-full">
        <h2>ทอง</h2>
        <h2>{assets.gold}</h2>
      </div>
    </div>
  );
}
