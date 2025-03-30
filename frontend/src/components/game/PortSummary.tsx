import { IAssets } from "@/Model/game";

interface PortSummaryProps {
  date: number;
  balance: number;
  assests: IAssets;
}

export default function PortSummary({date, balance, assests}: PortSummaryProps) {
    return (
        <div className="bg-white rounded-4xl text-center flex flex-col items-center justify-center text-black w-auto max-w-96 px-8 py-6 gap-4">
        <h1 className="text-4xl font-extrabold">พอร์ต</h1>
        <div className="bg-white ring-4 text-black p-8 ring-purple-300 gap-6">
            <div className="font-extralight text-2xl flex justify-between w-full">
                <h2>ตราสารหนี้</h2>
                <h2>+5%</h2>
            </div>
            <div className="font-extralight text-2xl flex justify-between w-full">
                <h2>พันธบัตรและหุ้นกู้</h2>
                <h2>+4%</h2>
            </div>
            <div className="font-extralight text-2xl flex justify-between w-full">
                <h2>ราคาทอง</h2>
                <h2>-5%</h2>
            </div>
            <div className="font-extralight text-2xl flex justify-between w-full">
                <h4>อัตราดอกเบี้ยเงินฝาก</h4>
                <h2>+4%</h2>
            </div>
        </div>
        </div>
    );
}