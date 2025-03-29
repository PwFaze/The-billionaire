interface ProfitSummaryProps {
  principal: number;
  balance: number;
}
export default function ProfitSummary({
  principal,
  balance,
}: ProfitSummaryProps) {
  const profit = balance - principal;
  return (
    <div className="bg-white rounded-4xl text-center flex flex-col items-center justify-center text-black w-auto max-w-96 px-8 py-4">
      <h1 className="text-4xl font-extrabold">สรุปกำไร</h1>
      <div className="font-extralight text-3xl flex justify-between w-full">
        <h2>เงินต้น</h2>
        <h2>{principal}</h2>
      </div>
      <div className="font-extralight text-3xl flex justify-between w-full">
        <h2>เงินคงเหลือ</h2>
        <h2>{balance}</h2>
      </div>
      <div className="py-8 text-5xl font-extrabold text-green-800 flex justify-between w-full">
        <h1>กำไร</h1>
        <h1>{profit}</h1>
      </div>

      <p className="">
        ท่านสามารถทำกำไรได้มากในสถานการณ์นี้
        ซึ่งแสดงให้เห็นถึงความเข้าใจแนวโน้มการลงทุนและการตัดสินใจที่ถูกต้องในเวลาที่เหมาะสม
        ท่านสามารถใช้ประโยชน์จากโอกาสที่เกิดขึ้นในตลาดได้อย่างเต็มที่
        ความสามารถในการรับความเสี่ยงและการคิดวิเคราะห์ที่ดีทำให้ท่านเก็บเกี่ยวผลตอบแทนที่สูงได้
      </p>
    </div>
  );
}
