import { IAssets} from "@/Model/game";

interface DailySummaryProps {
  balance: number;
  assests: IAssets;
}

export default function DaySummary({balance, assests}: DailySummaryProps) {
    return (
        <div className="bg-white rounded-4xl text-center flex flex-col items-center justify-center text-black w-auto max-w-96 px-8 py-4 gap-4">
        <h1 className="text-4xl font-extrabold">สรุปประจำวัน</h1>
        <div className="font-extralight text-2xl flex justify-between w-full">
            <h2>หุ้นน้ำมัน</h2>
            <h2 className="font-bold text-red">-12%</h2>
        </div>
        <div className="bg-white ring-4 text-black p-8 ring-purple-300">
            <div className="font-extralight text-2xl flex justify-between w-full">
                <h2>เงินคงเหลือ</h2>
                <h2>{balance} บาท</h2>
            </div>
            <div className="font-extralight text-2xl flex justify-between w-full">
                <h2>มูลค่าพอร์ต</h2>
                <h2>1934 บาท</h2>
            </div>
            <div className="font-extralight text-2xl flex justify-between w-full">
                <h2>เงินฝาก</h2>
                <h2>{assests.bank} บาท</h2>
            </div>
            <div className="font-extralight text-2xl flex justify-between w-full">
                <h2>ตราสารหนี้</h2>
                <h2>1 หน่วย</h2>
            </div>
            <div className="font-extralight text-2xl flex justify-between w-full">
                <h2>ทอง</h2>
                <h2>{assests.gold} บาท</h2>
            </div>
        </div>
        <div className="font-extralight text-2xl flex justify-between w-full">
            <h2>ขาดทุน</h2>
            <h2 className="font-bold">66 บาท</h2>
        </div>
       
        </div>
    );
}